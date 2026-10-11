# 何晨阳的学术主页

这是一个全英文的静态学术主页，另有支持 EN / 中文切换的独立 **Hiking** 徒步记录页。学术内容集中在 `profile.js` 中，徒步内容集中在 `hiking-data.js` 中；无需安装依赖或构建工具。本维护说明保留中文，方便日常更新。

网站地址：[raoquan00.github.io](https://raoquan00.github.io/) · 维护仓库：[raoquan00/raoquan00.github.io](https://github.com/raoquan00/raoquan00.github.io)。部署是否完成可在仓库的 **Actions** 或 **Settings → Pages** 中查看。

页面以纯白为底，只在顶部用一条动漫日照金山横幅点缀；正文采用常规英文学术主页排版。当前横幅是生成插画，不是何晨阳拍摄的照片，也不代表真实拍摄经历。之后可以替换为自己的实拍照片，并按实际内容更新英文图片说明。

顶部仅保留栏目导航，不重复显示姓名；简介区以 **Chenyang He** 为主标题，其后依次为 **Recent News、Selected Publications、Experiences**。简介左侧展示简短英文介绍，下方集中放邮箱、学术链接和可选的 CV 下载，右侧显示个人照片；手机上照片位于简介上方。任职和教育经历统一放在页面最底部的 Experiences，每条经历旁显示对应校徽。论文采用上图下文排版：两篇配图居中，预览外框统一为 760px 宽，窄屏不超过可用宽度，高度随原始比例自动调整；标题、作者和发表信息在图下方，点击配图可查看大图。

页面包含淡金色标题点缀、随浏览位置更新的导航提示，以及图片上的 **View landscape** 按钮。点击可查看完整图片，按 Esc 或 Close 关闭。图片和可选说明沿用 `profile.js` 中的横幅配置；当前说明留空，横幅和大图窗口均隐藏说明行，包括图标和间距，图片仍保留无障碍替代文字。外链会提示在新标签打开。浏览器设置为减少动态效果时，页面会关闭平滑滚动和过渡效果。

各栏目配有叶片、羽毛、山峰、微风等简约自然线稿，统一为低饱和灰绿色，没有彩色底框；GitHub 链接使用单色 GitHub 标志。添加学术链接、邮箱或 PDF 后，对应图标会自动出现。图标集中存放在 `assets/icons.svg`，许可信息见 `assets/ICON-LICENSES.txt`，发布时请一起保留。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `index.html` | 页面结构 |
| `styles.css` | 页面样式与手机布局 |
| `profile.js` | 姓名、简介、联系方式、动态、论文和经历等个人内容 |
| `site.js` | 将个人内容显示在页面上 |
| `hiking.html` | 独立的 Hiking 徒步记录页，通过首页顶部导航进入 |
| `hiking.css` | 徒步页样式与手机布局 |
| `hiking-data.js` | 真实徒步记录、中英文文字及照片路径 |
| `hiking.js` | 徒步记录展示及 EN / 中文切换 |
| `.nojekyll` | 让 GitHub Pages 直接提供静态文件；上传时也要保留这个隐藏文件 |
| `assets/` | 个人照片、横幅插画、论文配图、学校标志和简历 PDF；徒步照片放在 `assets/hiking/` |

学术内容日常更新主要编辑 `profile.js` 中的 `window.SITE_PROFILE` 对象；徒步页的维护方式见下一节。

## 维护徒步记录

首页顶部的 **Hiking** 链接打开独立的 `hiking.html`。徒步记录不放进学术首页的 About、News、Selected Publications 或 Experiences，也不放进 `profile.js`。该页支持 EN / 中文切换，学术首页继续保持英文。

所有记录保存在 `hiking-data.js` 的 `window.HIKING_JOURNAL.entries` 中。目前没有提供真实路线资料，因此保持空数组：

```javascript
window.HIKING_JOURNAL = {
  entries: []
};
```

有实际走过的路线后，再向 `entries` 数组添加记录。每条记录以一张本人拍摄的风景照开头，接着显示日期、标题和自己的文字；电脑上地图与文字并排，手机上地图放在文字下方。此处仅说明结构，不提供虚构的路线、日期、坐标或经历。

| 字段 | 填写方式 |
| --- | --- |
| `id` | 唯一且稳定的记录标识，使用英文字母、数字和连字符 |
| `date` | 实际徒步日期，格式为 `YYYY-MM-DD`，不使用网站更新日期代替 |
| `title` | 可选，路线或记录标题，使用 `{ en: "", zh: "" }` 结构 |
| `location` | 可选，实际地点名称，使用 `{ en: "", zh: "" }` 结构 |
| `coordinates` | 实际地点的 WGS84 坐标，使用 `{ lat: 纬度数字, lon: 经度数字 }` 结构；未知时填 `null` |
| `notes` | 自己写的徒步记录，使用 `{ en: "", zh: "" }` 结构；每种语言都是字符串，段落之间用 `\n\n` 分隔 |
| `photo` | 一张本人拍摄的风景照，包含 `src`、`alt: { en: "", zh: "" }` 和 `caption: { en: "", zh: "" }` |

同一条记录的 `en` 和 `zh` 应表达相同事实；按实际情况填写地点、路线、日期与坐标，不把计划中的路线写成已经完成。可以先写熟悉的语言：某个字段缺少当前语言时，页面会显示该字段已有的另一种语言内容。正文按普通文字填写，无需编写 HTML。

将实际徒步照片放在 `assets/hiking/` 中，`photo.src` 填相对于网站根目录的文件路径，保留文件名大小写和扩展名。每条记录仅使用一张照片，不维护相册数组。`alt` 填准确的中英文替代文字，`caption` 填中英文照片说明；没有说明时两种语言均可保留空字符串。不要把首页的生成山景插画当作真实徒步照片。

填写有效的 `coordinates` 后，页面会自动通过 OpenStreetMap 的 `export/embed.html` 显示带标记的地图，并提供 **View larger map / 查看大地图** 链接，无需申请地图密钥。地图可显示的纬度 `lat` 范围为 -85.0511 到 85.0511，经度 `lon` 范围为 -180 到 180；填写数字，不附带度数符号。坐标未知时保留 `coordinates: null`，地图会隐藏，不要编造坐标或用零代替未知位置。嵌入方式见 [OpenStreetMap 官方导出说明](https://wiki.openstreetmap.org/wiki/Export)。

修改后无需构建，直接预览 `hiking.html` 即可。发布时将 `hiking-data.js` 与新增照片一起提交；首次发布还需包含 `hiking.html`、`hiking.css` 和 `hiking.js`。仅修改照片路径不会自动上传照片。

## 维护个人内容

目前已根据你提供的 CV 填入简介、经历、邮箱和 Google Scholar。简介用一段简短英文说明研究兴趣；经历按最近到最早排列为北京大学 Research Assistant、南京航空航天大学 Research Assistant、北京邮电大学硕士、北邮与 QMUL 联合培养本科。论文区统一使用 **Selected Publications** 列表，按顺序展示你指定的 2 篇第一作者工作：AnyECG-Echo、CAP。AnyECG-Echo 显示 `UR`（Under Review）；CAP 显示 `KDD 2026` 和 `Oral`，不显示投稿期刊，也不另设在审稿件分组。未提供的年份和论文链接保持为空。简介主标题和网页显示名使用 `englishName`（`Chenyang He`），`name` 仍可保存中文姓名。

学术首页中的简介、消息、经历、论文、链接名称和图片说明均使用英文。下面是主要数据字段的示例，用于说明填写方式；其中 `Biography to be added.` 等文字只是占位文案，不代表实际身份或经历。请以文件中的当前内容为基础修改，不要覆盖已经补充好的资料。

```javascript
window.SITE_PROFILE = {
  name: "何晨阳",
  englishName: "Chenyang He",
  bio: [
    "Biography to be added."
  ],
  portrait: "assets/portrait.jpg",
  portraitAlt: "Portrait of Chenyang He",
  email: "",
  github: "https://github.com/raoquan00",
  scholar: "",
  orcid: "",
  cv: "",
  heroImage: "assets/alpenglow-anime.png",
  heroAlt: "Anime-inspired mountain landscape in warm sunrise light.",
  heroCaption: "",
  news: [],
  publications: [],
  experiences: []
};
```

- `englishName` 是网页显示名，用于简介主标题、页面标题和页脚；`name` 可保留中文姓名。
- `bio` 中每个字符串是一段英文简介，显示在 About 区域。目前保留一段简短介绍，仅说明研究兴趣；任职信息、时间和学历放在 Experiences 中维护。
- `portrait` 填个人照片路径，当前为 `assets/portrait.jpg`；`portraitAlt` 填英文替代文字。当前照片按原始 3:4 比例完整显示，不裁切。替换照片时，可用新照片覆盖同名文件，或将新照片放入 `assets/` 并更新路径和替代文字。将 `portrait` 设为 `""` 可隐藏照片。
- `email` 填邮箱地址；`github`、`scholar` 和 `orcid` 填对应个人页面的完整网址。未提供的值保留为 `""`。
- `cv` 填简历路径，例如 `assets/cv.pdf`，填写后显示在 About 简介下方的联系方式行。该路径只是示例，对应文件需要自行添加；尚未公开简历时保留 `""`。
- `heroImage` 填首页横幅路径；`heroAlt` 填简短、准确的英文替代文字，为无障碍访问保留；`heroCaption` 为可选英文图片说明，当前设为 `""`，隐藏横幅和大图窗口中的整行说明（含图标和间距）。横幅文件的扩展名以 `assets/` 中实际文件为准，路径必须保持一致。
- `publications` 是第一作者论文列表，包含选定的已发表成果和在审稿件；每条记录通过 `venue`、`year` 和 `status` 表示当前状态。合作论文动态放在 `news` 中。没有内容时保留 `[]`。论文作者列表中的 `englishName` 会自动加粗。
- `experiences` 统一维护任职与教育经历，显示在页面最底部。每条记录包含 `institution`、`role`、`period`、`details`、`logo`、`logoAlt` 和 `url`，并支持可选的 `advisor`、`partnerInstitution` 及多校徽 `logos` 字段，填写方法见下方。
- 修改时保留英文引号、逗号和括号。若一段文字需要包含英文双引号，应写成 `\"`；中文引号 `“”` 可以直接写在字符串内。

## 添加 News

简介后的 **Recent News** 使用「日期 + 英文消息」展示动态，也可放非第一作者的合作论文。编辑 `profile.js` 中的 `news` 数组，新增一条记录：

```javascript
{
  date: "", // 填真实消息日期：YYYY-MM-DD、YYYY-MM 或 YYYY
  text: "Your academic update in English.",
  links: []
}
```

- 日期统一显示为 `[MM/YYYY]`，例如 `2026-10-07` 显示为 `[10/2026]`。完整日期仍用于排序，并保留在网页的 `time` 元素中；仅填写年份时显示为 `[YYYY]`。
- 消息按日期从新到旧自动排序。日期未知时保留 `""`，显示 `[Date to be added]`，排在有日期的消息后；不要用上传或修改网站的日期代替论文日期。
- 当前展示七条录用动态，按日期倒序排列：UniFy / Information Fusion（2026-10-11）、npj Digital Medicine（2026-10-07）、Neurocomputing（2026-06-01）、CAP / KDD（2026-05-17）、ELinear / VTC 2025（2025-06-01）、PefNet / IJCNN 2025（2025-04-01）和 PerTime / IJCNN 2025（2025-04-01）。UniFy 的完整标题为 `UniFy: A Decompose-and-Fuse Framework for Spectral Information Fusion in Time Series Forecasting`，仅添加到 News。同日的 PefNet 和 PerTime 分为两条消息，分别使用完整标题 `PefNet: Injecting Pre-learned Channel Dependence for Time Series Forecasting with Missing Data` 和 `PerTime: A Multi-scale Periodic Mixing Model for Long-term Time Series Forecasting`；ELinear 的完整标题为 `ELinear: An Efficient Linear Architecture for Edge Intelligence Time Series Forecasting`。
- 录用动态统一使用 `Our paper “Full title” has been accepted by Venue.`，包括 CAP 在内均写完整论文标题。会议或期刊等级在 Venue 后附注：KDD 标注 `CORE A*`，IJCNN 和 VTC 均标注 `CORE B`；Information Fusion、Neurocomputing 和 npj Digital Medicine 仅标注 `JCR Q1`。IJCNN 和 VTC 等级依据当前 ICORE2026 官方记录，与消息的录用年份分别维护。新增历史动态仅影响 News，Selected Publications 仍保留 AnyECG-Echo 和 CAP 两篇。
- 当前期刊分区依据 2025 年度 JCR：Neurocomputing 与 npj Digital Medicine 均为 Q1。分区年份不是论文录用日期，维护时需核对 JCR，不能用 CiteScore 或 SJR 分区替代。来源见下方。
- 采用带引号的论文标题和 `accepted by` / `published in` 的标准消息格式时，论文标题会自动加粗，会议或期刊名会显示淡绿色强调；CORE/JCR 附注保持普通文字。普通动态仍按纯文本显示，无需在 `text` 里写 HTML。
- 当前 News 仅展示日期和消息，不添加 Google Scholar 链接；`links` 保留 `[]`。如以后需要其他论文、代码或报道链接，可使用 `{ label: "Paper", url: "实际论文链接" }`。
- 新增多条消息时，每条记录之间用英文逗号分隔。网页文案保持英文，按真实状态写接收或发表消息；News 与第一作者论文列表独立维护。

指标来源（Information Fusion 于 2026-10-11 核对，其余于 2026-10-10 核对）：

- Information Fusion：[大学图书馆保存的 Clarivate JCR 数据导出](https://kniznica.umb.sk/app/cmsSiteBoxAttachment.php?ID=6175&cmsDataID=0)，2025 年版 JCR（2024 指标年度），JIF Quartile 为 Q1。
- Neurocomputing：[Elsevier / ScienceDirect 期刊指标](https://www.sciencedirect.com/browse/calls-for-papers?subject=computer-science)；[2025 JIF 与 JCR 分区记录](https://referencecitationanalysis.com/InCiteJournalInfo?id=17690)。
- npj Digital Medicine：[Nature 官方指标](https://www.nature.com/npjdigitalmed/journal-impact)；[2025 JIF 与 JCR 分区记录](https://referencecitationanalysis.com/InCiteJournalInfo?id=18167)。
- KDD：[CORE / ICORE 排名页面](https://portal.core.edu.au/conf-ranks/?by=all&page=1&sort=atitle&source=all)。
- IJCNN：[CORE / ICORE 官方记录](https://portal.core.edu.au/conf-ranks/?by=all&page=1&search=IJCNN&sort=atitle&source=all)，ICORE2026：B。
- VTC：[CORE / ICORE 官方详情](https://portal.core.edu.au/conf-ranks/757/)，ICORE2026：B，CORE2023 亦为 B；官方条目统一为 VTC，未分别列 Spring / Fall。

## 添加论文

以下是字段模板，**不是已存在的论文**。请填好真实内容后再加入列表；不要将空模板当作成果发布。

一条在审论文记录（`venue` 和 `year` 留空，不公开投稿期刊）：

```javascript
{
  id: "unique-paper-id",
  title: "Paper title to be added.",
  authors: "Authors to be added.",
  venue: "",
  year: "",
  status: "UR",
  image: "",
  imageAlt: "",
  links: []
}
```

论文的 `links` 是链接列表，每项使用 `{ label: "Link label", url: "Full URL" }`；其中 `Link label` 和 `Full URL` 只是字段提示，需要替换为实际英文名称和完整网址。例如可使用 `Paper`、`Code` 或 `Demo` 作为链接名称。填写前核对网址；没有可公开的链接时保留空列表。

将论文记录放进 `publications` 的方括号中。添加多条记录时，各条记录之间用英文逗号分隔。论文标题使用正式英文标题，作者按真实顺序填写。在审论文保持 `venue: ""`、`year: ""`、`status: "UR"`；不要把投稿目标当作发表期刊。

当前两篇论文对应的配图路径如下：

| 论文 | `image` 路径 |
| --- | --- |
| CAP | `assets/papers/cap.png` |
| AnyECG-Echo | `assets/papers/anyecg-echo.png` |

每篇论文都保留配图位置；未提供图片时显示简约山形图标和 **Figure to be added**。替换图片时：

1. 把该论文的示意图放入 `assets/papers/`，例如 `cap.png`。
2. 在对应记录中将 `image` 改为 `"assets/papers/cap.png"`，并用 `imageAlt` 简短描述实际图片内容（英文）。
3. 两篇论文配图在电脑上均居中显示，预览外框统一为 760px 宽；窄屏上最大为可用宽度的 100%。图像高度按原始比例自动调整，不设置高度上限，完整显示图片，不拉伸或裁掉图表边缘。标题、作者、会议或期刊、年份和状态均排列在图片下方。
4. 点击论文图片可查看大图，按 Esc 或 Close 关闭。新增图片后，在电脑和手机上检查完整图表及大图查看功能。
5. 文件路径错误或图片未能加载时，页面会恢复占位框。修改后请确认实际图片已出现。

`id` 需要唯一，使用英文字母、数字和连字符。可以用 `#paper-对应id` 链接到该论文，例如 `#paper-anyecg-echo`。

在审稿件正式接收后，直接在 `publications` 中原位更新该条记录的 `venue`、`year` 和 `status`，并补充可公开的链接；无需移动记录或新增分组。`venue` 填确认接收的期刊或会议，`year` 只填已确认的发表年份，`status` 按实际情况更新为 `Accepted`、`Published` 或 `Oral` 等，不再保留 `UR`。尚未确认的字段继续留空，保留原 `id` 和图片路径，以免现有链接失效。

## 维护 Experiences

页面最底部的 **Experiences** 汇总任职和教育经历。编辑 `profile.js` 中的 `experiences` 数组，并按最近到最早的顺序放置记录。当前顺序为北京大学 RA、南京航空航天大学 RA、北邮硕士、北邮与 QMUL 联合培养本科；日期、职位、学位和奖项以用户提供及确认的内容为准，不根据网站更新时间推断经历。

以下是字段模板，**不是一条真实经历**。填写真实内容后再加入数组：

```javascript
{
  institution: "Institution name in English",
  role: "Position or degree in English",
  period: "Confirmed start date – confirmed end date",
  details: ["Additional confirmed detail in English."],
  logo: "assets/institutions/logo.png",
  logoAlt: "Institution name logo",
  url: "https://example.edu/"
}
```

- `institution` 是学校或机构的英文名称；`role` 填职位或学位，例如 RA 的职位名称、硕士或本科的完整学位名称。
- 联合培养可添加 `partnerInstitution: { name: "Queen Mary University of London", url: "https://www.qmul.ac.uk/" }`。两所学校名称会在同一条经历标题中以 `&` 连接，并分别链接到各自官网；主学校仍使用 `institution` 和 `url`。
- `period` 填已确认的起止时间，持续中的经历可使用 `present`。保留当前 CV 中的日期，不推断尚未确认的毕业或离职状态。
- `details` 是英文字符串数组，可补充实验室、导师或奖项等已确认信息；没有补充内容时使用 `[]`。
- 若要让导师姓名链接到学术主页，添加 `advisor: { name: "导师英文姓名", url: "导师主页完整网址" }`，页面会显示可点击的 `Advisor: 姓名`；不需要再在 `details` 中重复填写导师。
- `logo` 填校徽图片的相对路径，`logoAlt` 填准确的英文替代文字。上面的 `assets/institutions/logo.png` 只是路径示例；实际文件名和扩展名以 `assets/institutions/` 中的文件为准，不要直接用示例覆盖现有路径。相同学校的多条经历可共用同一张校徽。
- 联合培养经历可改用 `logos` 数组，例如 `logos: [{ src: "assets/institutions/bupt.png", alt: "BUPT emblem" }, { src: "assets/institutions/qmul.png", alt: "Queen Mary University of London logo", shape: "wide" }]`。两所学校的标志在电脑和手机上均上下排列，北邮在上、QMUL 在下；手机上整组标志移到该条经历文字上方，文字占满内容宽度。横版标志加 `shape: "wide"`，避免校名缩得过小。使用 `logos` 时不需要再填单个 `logo` 和 `logoAlt`。
- `url` 填对应学校或机构的官方网站完整网址；上面的 `https://example.edu/` 只是示例。未确认的链接保留为空。
- 新增多条经历时，每条记录之间用英文逗号分隔。更新经历或校徽后，同时检查手机上的名称换行和图片显示。

## 替换首页横幅

无需修改 `styles.css`，只需准备图片并更新 `profile.js`：

1. 准备一张自己希望展示的横向高分辨率图片，例如自己的风光照片。手机和电脑上的横幅裁切范围可能不同，尽量让主要景物靠近画面中部。
2. 将图片放入 `assets/`，例如 `assets/mountain-photo.jpg`；这只是文件名示例，不表示该照片已经存在。
3. 将 `heroImage` 改为实际路径，例如 `"assets/mountain-photo.jpg"`。默认插画路径为 `assets/alpenglow-anime.png`；若实际文件使用其他扩展名，以实际文件为准。
4. 根据替换后的图片填写英文 `heroAlt`，描述实际可见内容。`heroCaption` 可保留 `""` 隐藏说明；如需显示，只填写能确认的地点、来源或拍摄信息。使用自己的实拍照片后，应同步移除不再适用的生成插画说明。
5. 在电脑和手机上预览，确认图片裁切与文字可读性，再把新图片和修改后的 `profile.js` 一起提交。

## 添加图片与简历

1. 使用网站根目录下的 `assets/` 文件夹；若文件夹尚不存在，先创建它。
2. 把需要公开的图片或 PDF 放进去，建议使用简短的英文文件名，例如 `mountain-photo.jpg`、`cv.pdf`；校徽集中放在 `assets/institutions/` 中。
3. 在 `profile.js` 中填写对应的相对路径，保留文件名的大小写和扩展名。
4. **新增或替换附件时，将附件文件与修改后的 `profile.js` 一起提交到 GitHub。** 只填写路径不会自动上传文件。

个人照片通过 `portrait` 引用，显示在 About 旁；论文配图通过对应论文记录的 `image` 引用，显示在论文文字上方；校徽通过经历记录的 `logo` 引用，显示在对应机构旁。简历 PDF 通过 `cv` 引用，下载链接与 About 下方的联系方式并列显示。若下载链接尚未出现，先确认 `cv` 已填写为实际文件路径。

## GitHub Pages 发布配置

网站使用 `raoquan00` 账号下的公开仓库 [raoquan00.github.io](https://github.com/raoquan00/raoquan00.github.io)，对应主页地址为 [https://raoquan00.github.io/](https://raoquan00.github.io/)。

发布配置如下，日常更新无需重复配置：

1. 网站文件位于仓库的 **main** 分支根目录，包括 `index.html`、`styles.css`、`profile.js`、`site.js`、`hiking.html`、`hiking.css`、`hiking-data.js`、`hiking.js`、`.nojekyll` 和 `assets/`，不要在外面再套一层文件夹。
2. 在仓库 **Settings → Pages → Build and deployment** 中，**Source** 使用 **Deploy from a branch**，分支选择 **main**，文件夹选择 **/(root)**。
3. 每次提交后，在 **Actions** 或 **Settings → Pages** 检查部署结果，再打开主页确认实际效果。

账号改名后，请将已分享的个人主页链接更新为 `https://raoquan00.github.io/`；旧网址不应再作为主页入口。

`github.io` 根站点域名与 GitHub 账号或组织名称绑定，不能通过修改页面内容更改。以后若购买个人域名，可以在 **Settings → Pages → Custom domain** 中绑定，并按 GitHub 的提示配置域名解析。

## 后续更新

学术内容编辑 `profile.js`，徒步记录编辑 `hiking-data.js`；连同新增附件提交并推送到 `main`，GitHub Pages 就会自动重新发布。也可以在 GitHub 网页上直接编辑相应文件并提交更改。

发布前后检查姓名、单位、成果状态及链接是否准确，确认学术首页内容为英文，徒步页中英文内容与真实记录一致，并用手机查看一次。若更新没有出现，先检查仓库中的最新提交与部署状态，再刷新页面；不要仅凭已提交文件就判断发布成功。

如果页面内容突然消失，先检查刚编辑的 `profile.js` 或 `hiking-data.js` 是否缺少引号、逗号或括号。修复后重新提交即可。
