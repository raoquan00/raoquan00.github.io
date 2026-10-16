(() => {
  "use strict";
  const section = document.getElementById("visitors");
  const config = window.SITE_PROFILE?.visitors;
  if (!section || !config?.enabled) return;

  const hostname = location.hostname.toLowerCase();
  const local = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname) || location.protocol === "file:";
  function showSection() {
    section.hidden = false;
    if (location.hash === "#visitors") requestAnimationFrame(() => section.scrollIntoView({ block: "start" }));
  }
  // Previewing must never request the counter image: each request counts as a view.
  if (local) { showSection(); return; }

  const productionHosts = Array.isArray(config.productionHosts) ? config.productionHosts : [];
  if (!productionHosts.includes(hostname)) return;
  function counterUrl(value) {
    try {
      const url = new URL(value);
      const trusted = url.hostname === "flagcounter.com" || url.hostname.endsWith(".flagcounter.com");
      return url.protocol === "https:" && trusted && !url.username && !url.password ? url.href : "";
    } catch { return ""; }
  }
  const imageUrl = counterUrl(config.imageUrl);
  const detailsUrl = counterUrl(config.detailsUrl);
  // A public page without a real counter should not display empty statistics.
  if (!imageUrl || !detailsUrl) return;

  const get = id => document.getElementById(id);
  const placeholder = get("visitors-placeholder");
  const link = get("visitors-live-link");
  const details = get("visitors-details");
  const status = get("visitors-status");
  const note = get("visitors-note");
  get("visitors-preview-label").hidden = true;
  get("visitors-placeholder").querySelector(".visitors-counts").hidden = true;
  link.href = detailsUrl;
  details.href = detailsUrl;
  details.hidden = false;
  status.textContent = "Loading visitor map…";
  note.textContent = "Approximate locations by country / region · Powered by Flag Counter";
  showSection();

  const map = document.createElement("img");
  map.alt = "Visitor world map and page-view count, provided by Flag Counter.";
  map.decoding = "async";
  // Eager loading counts homepage visits even if visitors don't scroll to the footer.
  map.loading = "eager";
  map.addEventListener("load", () => {
    placeholder.hidden = true;
    link.hidden = false;
    status.hidden = true;
  }, { once: true });
  map.addEventListener("error", () => {
    placeholder.hidden = false;
    link.hidden = true;
    status.textContent = "Visitor map temporarily unavailable";
  }, { once: true });
  link.append(map);
  map.src = imageUrl;
})();
