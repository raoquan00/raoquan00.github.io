"use strict";
(() => {
  const p = window.SITE_PROFILE || {};
  const get = id => document.getElementById(id);
  const str = value => typeof value === "string" ? value.trim() : "";
  const list = value => Array.isArray(value) ? value : [];
  function text(id, value, fallback = "") { get(id).textContent = str(value) || fallback; }
  function el(tag, className, value) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (value !== undefined) item.textContent = String(value);
    return item;
  }
  function safeUrl(value, allowMail = false) {
    const raw = str(value);
    if (!raw) return "";
    try {
      const url = new URL(raw, document.baseURI);
      if (["https:", "http:"].includes(url.protocol) || (allowMail && url.protocol === "mailto:")) return url.href;
    } catch (_) { /* Empty or invalid links stay hidden. */ }
    return "";
  }
  function icon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "inline-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "16"); svg.setAttribute("height", "16");
    svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `assets/icons.svg#${name}`);
    svg.append(use);
    return svg;
  }
  function linkIcon(label, href) {
    const url = new URL(href);
    if (url.protocol === "mailto:") return "mail";
    if (url.hostname === "github.com") return "github";
    if (url.hostname === "scholar.google.com" || /google scholar/i.test(label)) return "graduation-cap";
    if (url.hostname === "orcid.org") return "id-card";
    if (/\.pdf$/i.test(url.pathname) || /^(pdf|paper|preprint)$/i.test(label)) return "file-text";
    if (/^(code|source)$/i.test(label)) return "code-xml";
    return "";
  }
  function link(label, url, allowMail = false) {
    const href = safeUrl(url, allowMail);
    if (!href) return null;
    const a = el("a", "", label);
    a.href = href;
    const iconName = linkIcon(label, href);
    if (iconName) a.prepend(icon(iconName));
    if (new URL(href).origin !== window.location.origin && !href.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      const external = el("span", "external-mark", "↗");
      external.setAttribute("aria-hidden", "true");
      a.append(external);
      a.setAttribute("aria-label", `${label} (opens in a new tab)`);
    }
    return a;
  }
  function linksInto(parent, items) {
    for (const item of list(items)) {
      if (!item || !str(item.label)) continue;
      const a = link(item.label, item.url);
      if (a) parent.append(a);
    }
  }
  const name = str(p.englishName) || "Name to be added";
  for (const id of ["about-name", "footer-name"]) text(id, name);
  document.title = `${name} · Academic Homepage`;
  document.querySelector('meta[name="description"]').content = list(p.bio).map(str).find(Boolean) || `${name}'s academic homepage. Biography, news, and publications.`;
  const heroImage = safeUrl(p.heroImage);
  if (heroImage) get("hero-image").src = heroImage;
  get("hero-image").alt = str(p.heroAlt) || "Mountain landscape at sunrise.";
  text("hero-caption", p.heroCaption);
  get("hero-caption").closest("figcaption").hidden = !str(p.heroCaption);
  get("landscape-caption").hidden = !str(p.heroCaption);
  const bio = list(p.bio).map(str).filter(Boolean);
  if (bio.length) get("bio").replaceChildren(...bio.map(t => el("p", "", t)));
  const portrait = safeUrl(p.portrait);
  if (portrait) {
    const photo = get("portrait-image");
    photo.alt = str(p.portraitAlt) || `Portrait of ${name}`;
    photo.addEventListener("error", () => { get("about-portrait").hidden = true; }, {once: true});
    photo.src = portrait;
    get("about-portrait").hidden = false;
  }
  const contacts = [
    {label: "GitHub", url: p.github},
    {label: "Google Scholar", url: p.scholar},
    {label: "ORCID", url: p.orcid}
  ];
  if (str(p.email)) {
    const email = link(p.email, `mailto:${str(p.email)}`, true);
    if (email) get("profile-links").append(email);
  }
  linksInto(get("profile-links"), contacts);
  const cv = safeUrl(p.cv);
  if (cv) { get("cv-link").href = cv; get("cv-link").hidden = false; }
  function newsDate(value) {
    const raw = str(value);
    const parts = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(raw);
    if (!parts) return null;
    const year = Number(parts[1]);
    const month = Number(parts[2] || 1);
    const day = Number(parts[3] || 1);
    const date = new Date(`${parts[1]}-${parts[2] || "01"}-${parts[3] || "01"}T00:00:00Z`);
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    return {raw, label: parts[2] ? `${parts[2]}/${parts[1]}` : parts[1], order: date.getTime()};
  }
  function newsMessage(value) {
    const message = el("p", "news-text");
    const raw = String(value);
    const match = /^([\s\S]*?)(“([^”]+)”|"([^"]+)")(\s+(?:(?:has been|is|was) accepted by|(?:has been|is|was) published in)\s+)([^()\n]+?)(\s+\((?:CORE|JCR)\b[^)]*\))?([.!?]?)$/.exec(raw);
    if (!match || !match[6].trim()) {
      message.textContent = raw;
      return message;
    }
    const [, prefix, quotedTitle, curlyTitle, plainTitle, announcement, venue, ranking = "", punctuation] = match;
    message.append(
      document.createTextNode(prefix + quotedTitle[0]),
      el("strong", "news-paper-title", curlyTitle || plainTitle),
      document.createTextNode(quotedTitle.slice(-1) + announcement),
      el("strong", "news-venue", venue),
      document.createTextNode(ranking + punctuation)
    );
    return message;
  }
  const news = list(p.news).filter(item => item && str(item.text))
    .map(item => ({item, date: newsDate(item.date)}))
    .sort((a, b) => (b.date?.order ?? -Infinity) - (a.date?.order ?? -Infinity));
  get("news-empty").hidden = news.length > 0;
  news.forEach(({item, date}) => {
    const row = el("li", "news-entry");
    const stamp = el(date ? "time" : "span", "news-date", `[${date ? date.label : "Date to be added"}]`);
    if (date) stamp.dateTime = date.raw;
    const body = el("div", "news-body");
    const message = newsMessage(item.text);
    if (str(item.status)) {
      const status = el("span", "publication-status news-status", item.status);
      if (item.status === "UR") { status.title = "Under review"; status.setAttribute("aria-label", "Under review"); }
      message.append(" ", status);
    }
    body.append(message);
    const links = el("div", "news-links");
    linksInto(links, item.links);
    if (links.childNodes.length) body.append(links);
    row.append(stamp, body);
    get("news-list").append(row);
  });
  const experiences = list(p.experiences).filter(item => item && str(item.institution));
  experiences.forEach(item => {
    const article = el("article", "experience-entry");
    const logoGroup = el("div", "experience-logos");
    const logos = (list(item.logos).length ? item.logos : [{src: item.logo, alt: item.logoAlt}])
      .filter(logo => logo && safeUrl(logo.src));
    if (logos.length > 1) {
      get("experience-list").classList.add("has-joint-institution");
      article.classList.add("experience-entry--joint");
    }
    logos.forEach(logo => {
      const logoBox = el("div", "experience-logo");
      if (logo.shape === "wide") logoBox.classList.add("experience-logo--wide");
      const img = el("img");
      img.src = safeUrl(logo.src);
      img.alt = str(logo.alt) || `${item.institution} emblem`;
      img.width = 76; img.height = 76;
      img.loading = "lazy"; img.decoding = "async";
      logoBox.append(img);
      logoGroup.append(logoBox);
    });
    const content = el("div", "experience-content");
    const header = el("div", "experience-header");
    const title = el("h3");
    title.append(link(item.institution, item.url) || document.createTextNode(item.institution));
    if (str(item.partnerInstitution?.name)) {
      title.append(" & ", link(item.partnerInstitution.name, item.partnerInstitution.url) || document.createTextNode(item.partnerInstitution.name));
    }
    header.append(title);
    if (str(item.period)) header.append(el("p", "experience-period", item.period));
    content.append(header);
    if (str(item.role)) content.append(el("p", "experience-role", item.role));
    if (str(item.advisor?.name)) {
      const advisor = el("p", "experience-detail", "Advisor: ");
      advisor.append(link(item.advisor.name, item.advisor.url) || document.createTextNode(item.advisor.name));
      content.append(advisor);
    }
    list(item.details).map(str).filter(Boolean).forEach(detail => content.append(el("p", "experience-detail", detail)));
    article.append(logoGroup, content);
    get("experience-list").append(article);
  });
  function publicationVisual(item) {
    const visual = el("div", "publication-visual");
    function placeholder() {
      visual.classList.add("is-placeholder");
      visual.replaceChildren(icon("mountain"), el("span", "", "Figure to be added"));
    }
    const source = safeUrl(item.image);
    if (source) {
      const img = el("img");
      img.alt = str(item.imageAlt) || `Figure for ${item.title}`;
      img.width = Number(item.imageWidth) || 480; img.height = Number(item.imageHeight) || 320;
      img.loading = "lazy"; img.decoding = "async";
      img.addEventListener("error", placeholder, {once: true});
      img.src = source;
      const button = el("button", "publication-figure");
      button.type = "button";
      button.setAttribute("aria-label", `View figure: ${item.title}`);
      button.setAttribute("aria-haspopup", "dialog");
      button.title = "View full-size figure";
      button.append(img);
      button.addEventListener("click", () => {
        get("figure-image").src = source;
        get("figure-image").alt = img.alt;
        text("figure-caption", item.title);
        get("figure-dialog").showModal();
      });
      visual.append(button);
    } else placeholder();
    return visual;
  }
  function publicationAuthors(value) {
    const authors = el("p", "authors");
    str(value).split(",").map(str).forEach((author, index) => {
      if (index) authors.append(", ");
      authors.append(author === name ? el("strong", "", author) : document.createTextNode(author));
    });
    return authors;
  }
  function renderPublications(parent, records) {
    const items = list(records).filter(item => item && str(item.title));
    if (!items.length) return false;
    parent.replaceChildren();
    items.forEach(item => {
      const article = el("article", "publication");
      if (/^[a-z0-9-]+$/i.test(str(item.id))) article.id = `paper-${item.id}`;
      const content = el("div", "publication-content");
      content.append(el("h3", "publication-title", item.title));
      if (str(item.authors)) content.append(publicationAuthors(item.authors));
      const meta = el("p", "publication-meta");
      if (str(item.venue)) meta.append(el("span", "", item.venue));
      if (item.year !== undefined && item.year !== null && String(item.year).trim()) meta.append(el("span", "publication-year", item.year));
      if (str(item.status)) {
        const status = el("span", "publication-status", item.status);
        if (item.status === "UR") { status.title = "Under review"; status.setAttribute("aria-label", "Under review"); }
        meta.append(status);
      }
      if (meta.childNodes.length) content.append(meta);
      const links = el("div", "item-links"); linksInto(links, item.links);
      if (links.childNodes.length) content.append(links);
      article.append(publicationVisual(item), content);
      parent.append(article);
    });
    return true;
  }
  renderPublications(get("publication-list"), p.publications);
  get("year").textContent = new Date().getFullYear();

  // Keep the complete landscape available without enlarging the page banner.
  const hero = get("hero-image");
  const openLandscape = get("landscape-open");
  const dialog = get("landscape-dialog");
  function enableLandscape() {
    openLandscape.hidden = !(hero.complete && hero.naturalWidth > 0 && typeof dialog.showModal === "function");
  }
  hero.addEventListener("load", enableLandscape);
  hero.addEventListener("error", () => { openLandscape.hidden = true; });
  enableLandscape();
  openLandscape.addEventListener("click", () => {
    get("landscape-image").src = hero.currentSrc || hero.src;
    get("landscape-image").alt = hero.alt;
    text("landscape-caption", p.heroCaption);
    dialog.showModal();
  });
  for (const viewer of [dialog, get("figure-dialog")]) {
    viewer.addEventListener("click", event => {
      const r = viewer.getBoundingClientRect();
      if (event.target === viewer && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) viewer.close();
    });
  }

  // Anchor selection stays stable during smooth scrolling and near page end.
  const header = document.querySelector(".topbar");
  const nav = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = nav.map(a => document.querySelector(a.hash));
  let anchorSelection = null;
  let framePending = false;
  function selectSection(id) {
    nav.forEach(a => {
      if (a.hash === `#${id}`) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }
  function updateNavigation() {
    framePending = false;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (anchorSelection) { selectSection(anchorSelection); return; }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
      selectSection(sections.at(-1).id); return;
    }
    const guide = header.getBoundingClientRect().bottom + 50;
    const current = sections.filter(section => section.getBoundingClientRect().top <= guide).at(-1);
    selectSection(current ? current.id : sections[0].id);
  }
  function scheduleNavigation() {
    if (!framePending) { framePending = true; requestAnimationFrame(updateNavigation); }
  }
  function followHash() {
    anchorSelection = sections.find(section => `#${section.id}` === location.hash)?.id || null;
    scheduleNavigation();
  }
  function followScroll() { anchorSelection = null; scheduleNavigation(); }
  window.addEventListener("scroll", scheduleNavigation, {passive: true});
  window.addEventListener("resize", scheduleNavigation);
  window.addEventListener("hashchange", followHash);
  window.addEventListener("wheel", followScroll, {passive: true});
  window.addEventListener("touchmove", followScroll, {passive: true});
  window.addEventListener("pointerdown", event => { if (event.target === document.documentElement) followScroll(); });
  window.addEventListener("keydown", event => {
    if (["PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", " "].includes(event.key) && !document.querySelector("dialog[open]")) followScroll();
  });
  nav.forEach(a => a.addEventListener("click", () => { anchorSelection = a.hash.slice(1); selectSection(anchorSelection); }));
  followHash();
})();
