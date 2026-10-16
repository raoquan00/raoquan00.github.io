"use strict";
(() => {
  const copy = {
    en: {
      skip: "Skip to content", about: "About", news: "News", publications: "Selected Publications",
      experiences: "Experiences", hiking: "Hiking", back: "← Academic homepage",
      eyebrow: "Chenyang He · A personal journal", title: "Notes from the trail.",
      subtitle: "A few places, a photograph, and something to remember.",
      log: "The journal", emptyTitle: "The journal starts here.",
      emptyText: "Stories and photographs from the trail are on their way.",
      top: "Back to top ↑", coordinates: "Coordinates", map: "Location map", largerMap: "View larger map ↗",
      pageTitle: "Hiking · Chenyang He", photo: "Trail photograph", navigation: "Main navigation",
      sample: "Design sample", preview: "Local design preview", samplePhoto: "Placeholder illustration · not a photograph",
      sampleMap: "Illustrative map, not a real location", sampleCoordinates: "Coordinates to be added",
      fieldNote: "From my notebook", locationTitle: "On the map", viewPhoto: "View photograph", close: "Close",
      footerNote: "A little further, a little slower."
    },
    zh: {
      skip: "跳转到正文", about: "关于", news: "动态", publications: "精选论文",
      experiences: "经历", hiking: "徒步", back: "← 返回学术主页",
      eyebrow: "何晨阳 · 一本行走的日记", title: "山野手记",
      subtitle: "记一段路，一眼风景，\n和一些不想忘记的瞬间。",
      log: "步履所至", emptyTitle: "山野记录，从这里开始。",
      emptyText: "沿途的故事与照片，待慢慢记下。",
      top: "回到顶部 ↑", coordinates: "坐标", map: "位置地图", largerMap: "查看大地图 ↗",
      pageTitle: "徒步 · 何晨阳", photo: "徒步照片", navigation: "主导航",
      sample: "排版示例", preview: "本地设计预览", samplePhoto: "占位插画 · 非实拍照片",
      sampleMap: "地图示意，不代表实际地点", sampleCoordinates: "坐标待填写",
      fieldNote: "途中随记", locationTitle: "地点与坐标", viewPhoto: "查看大图", close: "关闭",
      footerNote: "走远一点，也走慢一点。"
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
  function icon(name, size = 16) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", size); svg.setAttribute("height", size);
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `assets/icons.svg#${name}`);
    svg.append(use);
    return svg;
  }
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
  function photoFigure(photo, className, isSample) {
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
    const button = create("button", "trail-photo-button");
    button.type = "button";
    button.setAttribute("aria-label", `${copy[language].viewPhoto}: ${image.alt}`);
    button.setAttribute("aria-haspopup", "dialog");
    const expand = create("span", "photo-expand", `${copy[language].viewPhoto} ↗`);
    expand.setAttribute("aria-hidden", "true");
    button.append(image, expand);
    button.addEventListener("click", () => {
      const fullImage = document.getElementById("figure-image");
      fullImage.src = source.href;
      fullImage.alt = image.alt;
      const fullCaption = document.getElementById("figure-caption");
      fullCaption.textContent = [localized(photo.caption), isSample ? copy[language].samplePhoto : ""].filter(Boolean).join(" · ");
      fullCaption.hidden = !fullCaption.textContent;
      document.getElementById("figure-dialog").showModal();
    });
    figure.append(button);
    const caption = localized(photo.caption);
    if (caption || isSample) {
      const captionRow = create("figcaption");
      const captionText = create("span", "photo-caption-text");
      captionText.append(create("span", "photo-caption-index", "FIELD / PHOTO"), create("span", "", caption));
      captionRow.append(captionText);
      if (isSample) captionRow.append(create("span", "photo-sample-note", copy[language].samplePhoto));
      figure.append(captionRow);
    }
    return figure;
  }
  function renderEntry({entry, date}) {
    const article = create("article", "trail-entry");
    if (/^[a-z0-9-]+$/i.test(str(entry.id))) article.id = `trail-${entry.id}`;
    const header = create("header", "trail-entry-header");
    if (date) {
      const locale = language === "zh" ? "zh-CN" : "en-GB";
      const time = create("time", "trail-date");
      time.setAttribute("aria-label", new Intl.DateTimeFormat(locale, {year: "numeric", month: "long", day: "numeric", timeZone: "UTC"}).format(date));
      time.dateTime = entry.date;
      time.append(
        create("span", "trail-date-month", new Intl.DateTimeFormat(locale, {month: "short", timeZone: "UTC"}).format(date)),
        create("span", "trail-date-day", String(date.getUTCDate()).padStart(2, "0")),
        create("span", "trail-date-year", String(date.getUTCFullYear()))
      );
      header.append(time);
    } else header.classList.add("is-undated");
    const title = create("div", "trail-entry-title");
    if (localized(entry.title)) title.append(create("h3", "", localized(entry.title)));
    if (localized(entry.location)) {
      const location = create("p", "trail-location");
      location.append(icon("compass", 13), document.createTextNode(localized(entry.location)));
      title.append(location);
    }
    header.append(title);
    if (entry.isSample) header.append(create("span", "sample-label", copy[language].sample));
    article.append(header);
    const photo = photoFigure(entry.photo, "trail-cover", entry.isSample);
    if (photo) article.append(photo);
    const body = create("div", "trail-body");
    const notes = localized(entry.notes);
    if (notes) {
      const prose = create("div", "trail-notes");
      prose.append(create("h4", "trail-note-heading", copy[language].fieldNote));
      notes.split(/\n\s*\n/).map(str).filter(Boolean).forEach(paragraph => prose.append(create("p", "", paragraph)));
      const end = create("div", "trail-note-end");
      end.append(icon("leaf", 17));
      prose.append(end);
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
    if (entry.isSample && str(entry.sampleMap)) {
      const box = mapBox();
      const frame = create("div", "trail-map-frame");
      const image = create("img", "trail-map-image");
      image.src = "assets/hiking/sample-map.svg";
      image.alt = copy[language].sampleMap;
      image.width = 640; image.height = 440;
      frame.append(image);
      box.append(frame, create("p", "trail-coordinates", "—.————° N / —.————° E"), create("p", "trail-map-note", copy[language].sampleCoordinates));
      return box;
    }
    const lat = entry.coordinates?.lat;
    const lon = entry.coordinates?.lon;
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 85.0511 || Math.abs(lon) > 180) return null;
    const box = mapBox();
    const coordinates = `${Math.abs(lat).toFixed(5)}° ${lat < 0 ? "S" : "N"}, ${Math.abs(lon).toFixed(5)}° ${lon < 0 ? "W" : "E"}`;
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
    const mapFrame = create("div", "trail-map-frame");
    mapFrame.append(frame);
    box.append(mapFrame, create("p", "trail-coordinates", coordinates));
    const link = create("a", "trail-map-link", copy[language].largerMap);
    link.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=13/${lat}/${lon}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${copy[language].largerMap} (${language === "zh" ? "在新标签页打开" : "opens in a new tab"})`);
    box.append(link);
    return box;
  }
  function mapBox() {
    const box = create("aside", "trail-map");
    const heading = create("h4", "map-heading", copy[language].locationTitle);
    heading.append(icon("compass", 17));
    box.append(heading);
    return box;
  }
  function render() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = copy[language].pageTitle;
    document.querySelector("nav").setAttribute("aria-label", copy[language].navigation);
    document.querySelector(".landscape-close").setAttribute("aria-label", `${copy[language].close} ${copy[language].photo}`);
    document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = copy[language][element.dataset.i18n]; });
    document.querySelectorAll("[data-language]").forEach(button => { button.setAttribute("aria-pressed", String(button.dataset.language === language)); });
    document.getElementById("trail-list").replaceChildren(...entries.map(renderEntry));
    document.getElementById("trail-empty").hidden = entries.length > 0;
    const count = document.getElementById("trail-count");
    count.hidden = !entries.length;
    count.textContent = entries.some(({entry}) => entry.isSample) ? copy[language].preview : language === "zh" ? `${entries.length} 条记录` : `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`;
  }
  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => {
    language = button.dataset.language;
    try { localStorage.setItem("hiking-language", language); } catch (_) { /* No persistence is required to switch languages. */ }
    render();
  }));
  document.querySelector(".language-switch").hidden = false;
  document.getElementById("year").textContent = new Date().getFullYear();
  const dialog = document.getElementById("figure-dialog");
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  const header = document.querySelector(".topbar");
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateHeader, {passive: true});
  updateHeader();
  render();
})();
