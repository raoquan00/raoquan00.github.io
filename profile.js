// 主页内容集中在这里维护。资料来自你提供的 CV；论文年份、链接和图片缺失时保留为空。
window.SITE_PROFILE = {
  name: "何晨阳",
  englishName: "Chenyang He",
  portrait: "assets/portrait.jpg",
  portraitAlt: "Portrait of Chenyang He",
  heroImage: "assets/alpenglow-anime.png",
  heroAlt: "An anime-style illustration of golden sunrise on snow-covered mountain peaks.",
  heroCaption: "Alpenglow · An illustrated mountain morning",
  bio: [
    "My research interests include AI for healthcare, multimodal learning, and physiological signal modeling, particularly ECG and PPG."
  ],
  email: "raoquan00@gmail.com",
  github: "https://github.com/raoquan00",
  scholar: "https://scholar.google.com/citations?user=Td1kNK8AAAAJ&hl=en",
  orcid: "",
  cv: "", // 如需提供 CV 下载，请上传确认后的 PDF 并填写路径。
  // News 可放合作论文、接收消息或其他学术动态。这里只填真实消息日期，不以网站更新时间代替。
  // date 保存完整日期用于排序；页面按 [MM/YYYY] 展示。未知保留 ""。
  news: [
    {
      date: "2026-10-11",
      text: "Our paper “UniFy: A Decompose-and-Fuse Framework for Spectral Information Fusion in Time Series Forecasting” has been accepted by Information Fusion (JCR Q1).",
      links: []
    },
    {
      date: "2026-10-07",
      text: "Our paper “LLMs Bridge the Interpretation Gap in Home-Based AI-ECG Devices: A Real-World Study of Over 100,000 User Conversations” has been accepted by npj Digital Medicine (JCR Q1).",
      links: []
    },
    {
      date: "2026-06-01",
      text: "Our paper “Fine-grained Inter-series Dependency Enhanced Mining for Multi-Domain Multivariate Time Series Forecasts” has been accepted by Neurocomputing (JCR Q1).",
      links: []
    },
    {
      date: "2026-05-17",
      text: "Our paper “CAP: Towards PPG Universal Representation Learning with Patient-level Supervision” has been accepted by KDD 2026 (CORE A*).",
      links: []
    },
    {
      date: "2025-06-01",
      text: "Our paper “ELinear: An Efficient Linear Architecture for Edge Intelligence Time Series Forecasting” has been accepted by VTC 2025 (CORE B).",
      links: []
    },
    {
      date: "2025-04-01",
      text: "Our paper “PefNet: Injecting Pre-learned Channel Dependence for Time Series Forecasting with Missing Data” has been accepted by IJCNN 2025 (CORE B).",
      links: []
    },
    {
      date: "2025-04-01",
      text: "Our paper “PerTime: A Multi-scale Periodic Mixing Model for Long-term Time Series Forecasting” has been accepted by IJCNN 2025 (CORE B).",
      links: []
    }
  ],
  // 页面最下方 Experiences，从最近到最早排列；logo 使用本地校徽文件。
  experiences: [
    {
      institution: "Peking University",
      role: "Research Assistant",
      period: "March 2025 – present",
      advisor: {name: "Shenda Hong", url: "https://scholar.google.com/citations?user=K95az5UAAAAJ&hl=zh-CN"},
      details: ["Digital Health Lab"],
      logo: "assets/institutions/pku.png",
      logoAlt: "Peking University emblem",
      url: "https://www.pku.edu.cn/"
    },
    {
      institution: "Nanjing University of Aeronautics and Astronautics",
      role: "Research Assistant",
      period: "March 2024 – present",
      advisor: {name: "Cheng Ding", url: "https://scholar.google.com/citations?user=DzkXe-0AAAAJ&hl=zh-CN"},
      details: [],
      logo: "assets/institutions/nuaa.jpg",
      logoAlt: "Nanjing University of Aeronautics and Astronautics emblem",
      url: "https://www.nuaa.edu.cn/"
    },
    {
      institution: "Beijing University of Posts and Telecommunications",
      role: "M.Eng. in Electronic Science and Technology",
      period: "September 2023 – June 2026",
      advisor: {name: "Yong Zhang", url: "https://scholar.google.com/citations?user=HPxykGUAAAAJ&hl=zh-CN"},
      details: ["First-Class Academic Scholarship, twice (top 15% at BUPT)"],
      logo: "assets/institutions/bupt.png",
      logoAlt: "Beijing University of Posts and Telecommunications emblem",
      url: "https://www.bupt.edu.cn/"
    },
    {
      institution: "Beijing University of Posts and Telecommunications",
      partnerInstitution: {name: "Queen Mary University of London", url: "https://www.qmul.ac.uk/"},
      role: "B.Eng. in E-Commerce and Law",
      period: "September 2019 – June 2023",
      details: [
        "Joint undergraduate programme",
        "First Class Honours (QMUL) · Beijing Outstanding Graduate (top 5% in Beijing)"
      ],
      logos: [
        {src: "assets/institutions/bupt.png", alt: "Beijing University of Posts and Telecommunications emblem"},
        {src: "assets/institutions/qmul.png", alt: "Queen Mary University of London logo", shape: "wide"}
      ],
      url: "https://www.bupt.edu.cn/"
    }
  ],
  // 仅展示第一作者工作，发表和在审论文统一在 publications 中维护；在审状态填 "UR"，不填投稿期刊。
  // 每篇论文的 image 填图片路径，例如 "assets/papers/cap.png"；为空时显示配图占位。
  // imageAlt 填对实际论文配图的英文描述。作者顺序以 CV 为准。
  publications: [
    {
      id: "anyecg-echo",
      title: "Single-Lead ECG Screening for Fine-Grained Structural Heart Disease via Echocardiography-Report-Supervised Contrastive Learning",
      authors: "Chenyang He, Qinghao Zhao, Shun Huang, Jun Li, Gongzheng Tang, Hao Zhang, Tong Liu, Zhengkai Xue, Jian Liu, Kangyin Chen, Cheng Ding, Shenda Hong",
      venue: "",
      year: "",
      status: "UR",
      image: "assets/papers/anyecg-echo.png",
      imageAlt: "AnyECG-Echo clinical overview and model: single-lead ECG screening for structural heart disease, ECG-report contrastive pre-training, and supervised fine-tuning.",
      imageWidth: 1800,
      imageHeight: 1507,
      links: []
    },
    {
      id: "cap",
      title: "CAP: Towards PPG Universal Representation Learning with Patient-level Supervision",
      authors: "Chenyang He, Xinyi Shao, Shun Huang, Bosong Huang, Daoqiang Zhang, Ming Jin, Cheng Ding",
      venue: "KDD",
      year: "2026",
      status: "Oral",
      image: "assets/papers/cap.png",
      imageAlt: "CAP framework: PPG data collection and patient-level pairing, representation pre-training, and downstream fine-tuning.",
      imageWidth: 4716,
      imageHeight: 1764,
      links: []
    }
  ]
};
