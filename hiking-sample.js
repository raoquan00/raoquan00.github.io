// 仅供本地设计预览：线上不显示，也不会覆盖已有真实记录。
(() => {
  if (!["localhost", "127.0.0.1", "::1", "[::1]"].includes(location.hostname)) return;
  if (window.HIKING_JOURNAL?.entries?.length) return;
  window.HIKING_JOURNAL = { entries: [{
    id: "design-sample",
    isSample: true,
    date: "2026-10-01",
    title: { en: "Waiting for the first light", zh: "等一场山间的日出" },
    location: { en: "An alpine trail · Sample location", zh: "山间步道 · 示例地点" },
    coordinates: null,
    sampleMap: "assets/hiking/sample-map.svg",
    notes: {
      en: "The mountains were still in shadow when a thin line of gold appeared along the ridge.\n\nWe stopped on a quiet stretch of trail. The clouds below moved slowly, opening for a moment and closing again. There was no need to hurry; watching the light change was enough.\n\nI wanted to keep this small pause: cold air, warm light, and the path waiting ahead.",
      zh: "天还没有完全亮，山脊上先出现了一线金色。\n\n走到一段开阔的山路，我们停了下来。脚下的云缓缓散开，又慢慢聚拢。原本还想着赶到下一个地点，这时却觉得，多看一会儿也很好。\n\n想记住的，是这一小段停留：冷空气、暖起来的山峰，还有前面尚未走完的路。"
    },
    photo: {
      src: "assets/alpenglow-anime.png",
      alt: { en: "Placeholder illustration of golden sunrise over snowy mountains and clouds", zh: "日照雪山与云海的占位插画" },
      caption: { en: "First light, above the clouds.", zh: "晨光越过山脊，云海仍在脚下。" }
    }
  }] };
})();
