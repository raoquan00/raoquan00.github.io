"use strict";
(() => {
  const copy = {
    en: {
      skip: "Skip to content", about: "About", news: "News", publications: "Selected Publications",
      experiences: "Experiences", hiking: "Hiking", back: "← Academic homepage",
      eyebrow: "Chenyang He · Outdoors", title: "A journal of trails.",
      subtitle: "Routes walked, views remembered, and notes along the way.",
      log: "Trail log", emptyTitle: "The journal starts here.",
      emptyText: "Stories and photographs from the trail are on their way.",
      top: "Back to top ↑", coordinates: "Coordinates", map: "Location map", largerMap: "View larger map ↗",
      pageTitle: "Hiking · Chenyang He", photo: "Trail photograph", navigation: "Main navigation"
    },
    zh: {
      skip: "跳转到正文", about: "关于", news: "动态", publications: "精选论文",
      experiences: "经历", hiking: "徒步", back: "← 返回学术主页",
      eyebrow: "何晨阳 · 山野之间", title: "走过的路，沿途的风景。",
      subtitle: "在这里，记下徒步路线、山间见闻，以及想要留住的瞬间。",
      log: "徒步记录", emptyTitle: "山野记录，从这里开始。",
      emptyText: "沿途的故事与照片，待慢慢记下。",
      top: "回到顶部 ↑", coordinates: "坐标", map: "位置地图", largerMap: "查看大地图 ↗",
      pageTitle: "徒步 · 何晨阳", photo: "徒步照片", navigation: "主导航"
    }
  };
  const str = value => typeof value === "string" ? value.trim() : "";
  const list = value => Array.isArray(value) ? value : [];
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  let language = "en";
  try { if (localStorage.getItem("hiking-language") === "zh") language = "zh"; } catch (_) { /* The switch also works without storage. */ }
  const localized = value => typeof value === "string" ? str(value) : str(value?.[language]) || str(value?.en) || str(value?.zh);
  function validDate(value) {
    const raw = str(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
    const date = new Date(`${raw}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === raw ? date : null;
  }
  const entries = list(window.HIKING_JOURNAL?.entries)
    .filter(entry => entry && (localized(entry.title) || localized(entry.notes) || str(entry.photo?.src) || validDate(entry.date)))
    .map(entry => ({entry, date: validDate(entry.date)}))
    .sort((a, b) => (b.date?.getTime() ?? -Infinity) - (a.date?.getTime() ?? -Infinity));
  function photoFigure(photo, className) {
    if (!photo || !str(photo.src)) return null;
    let source;
    try {
      source = new URL(photo.src, document.baseURI);
      if (!["http:", "https:"].includes(source.protocol)) return null;
    } catch (_) { return null; }
    const figure = create("figure", `trail-photo ${className}`);
    const image = create("img");
    image.src = source.href;
    image.alt = localized(photo.alt) || localized(photo.caption) || copy[language].photo;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => { figure.hidden = true; }, {once: true});
    figure.append(image);
    const caption = localized(photo.caption);
    if (caption) figure.append(create("figcaption", "", caption));
    return figure;
  }
  function renderEntry({entry, date}) {
    const article = create("article", "trail-entry");
    if (/^[a-z0-9-]+$/i.test(str(entry.id))) article.id = `trail-${entry.id}`;
    const photo = photoFigure(entry.photo, "trail-cover");
    if (photo) article.append(photo);
    if (date) {
      const time = create("time", "trail-date", new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-GB", {year: "numeric", month: "short", day: "numeric", timeZone: "UTC"}).format(date));
      time.dateTime = entry.date;
      article.append(time);
    }
    if (localized(entry.title)) article.append(create("h3", "", localized(entry.title)));
    if (localized(entry.location)) article.append(create("p", "trail-location", localized(entry.location)));
    const body = create("div", "trail-body");
    const notes = localized(entry.notes);
    if (notes) {
      const prose = create("div", "trail-notes");
      notes.split(/\n\s*\n/).map(str).filter(Boolean).forEach(paragraph => prose.append(create("p", "", paragraph)));
      body.append(prose);
    }
    const map = locationMap(entry);
    if (map) {
      body.classList.add("has-map");
      body.append(map);
    }
    if (body.children.length) article.append(body);
    return article;
  }
  function locationMap(entry) {
    const lat = entry.coordinates?.lat;
    const lon = entry.coordinates?.lon;
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 85.0511 || Math.abs(lon) > 180) return null;
    const box = create("div", "trail-map");
    const coordinates = `${Math.abs(lat).toFixed(5)}° ${lat < 0 ? "S" : "N"}, ${Math.abs(lon).toFixed(5)}° ${lon < 0 ? "W" : "E"}`;
    box.append(create("p", "trail-coordinates", `${copy[language].coordinates} · ${coordinates}`));
    const latitudeSpan = 0.025;
    const longitudeSpan = latitudeSpan / Math.max(0.1, Math.cos(lat * Math.PI / 180));
    const bbox = [Math.max(-180, lon - longitudeSpan), Math.max(-85.0511, lat - latitudeSpan), Math.min(180, lon + longitudeSpan), Math.min(85.0511, lat + latitudeSpan)];
    const source = new URL("https://www.openstreetmap.org/export/embed.html");
    source.search = new URLSearchParams({bbox: bbox.join(","), layer: "mapnik", marker: `${lat},${lon}`}).toString();
    const frame = create("iframe");
    frame.title = `${copy[language].map}: ${localized(entry.location) || localized(entry.title) || coordinates}`;
    frame.src = source.href;
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer";
    box.append(frame);
    const link = create("a", "trail-map-link", copy[language].largerMap);
    link.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=13/${lat}/${lon}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${copy[language].largerMap} (${language === "zh" ? "在新标签页打开" : "opens in a new tab"})`);
    box.append(link);
    return box;
  }
  function render() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = copy[language].pageTitle;
    document.querySelector("nav").setAttribute("aria-label", copy[language].navigation);
    document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = copy[language][element.dataset.i18n]; });
    document.querySelectorAll("[data-language]").forEach(button => { button.setAttribute("aria-pressed", String(button.dataset.language === language)); });
    document.getElementById("trail-list").replaceChildren(...entries.map(renderEntry));
    document.getElementById("trail-empty").hidden = entries.length > 0;
    const count = document.getElementById("trail-count");
    count.hidden = !entries.length;
    count.textContent = language === "zh" ? `${entries.length} 条记录` : `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`;
  }
  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => {
    language = button.dataset.language;
    try { localStorage.setItem("hiking-language", language); } catch (_) { /* No persistence is required to switch languages. */ }
    render();
  }));
  document.querySelector(".language-switch").hidden = false;
  document.getElementById("year").textContent = new Date().getFullYear();
  const header = document.querySelector(".topbar");
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateHeader, {passive: true});
  updateHeader();
  render();
})();
