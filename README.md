# 巴洛克音響 (ANSBACH ACOUSTIC) 官方旗艦門戶

> **「一路走來始終如一，莫忘聽音樂的初衷！」**  
> *“Hear the emotion, not just the music. We collect only the best!”*  
> *“Music is good for health. 音樂是心靈最溫潤的滋養”*

巴洛克音響（巴洛克國際股份有限公司）創立於 1997 年，官方旗艦中心坐落於台北市中山區龍江路。二十餘年來深耕台灣頂級歐洲 Hi-End 音響市場，持續將具備深厚人文藝術底蘊與最高工藝指標的發燒器材引進台灣，與全體愛樂朋友共享純粹感動。

---

## 🌟 核心功能與設計特色 (M15 規格)

### 1. 首頁自適應影音橫幅 (Hero Video Banner)
- **跨裝置自適應素材**：桌機載入 16:9 比例影片（`assets/videos/巴洛克banner_桌機版.mp4`，約 2.95 MB），手機（≤768px）自動適配載入 9:16 比例影片（`assets/videos/巴洛克banner_手機版.mp4`，約 2.37 MB）。
- **單一 Video 節點優化**：透過 JavaScript 動態判定載入，避免行動裝置重複下載雙份影音頻寬。
- **瀏覽器 Autoplay 政策防護**：預設靜音自動循環播放，並具備使用者互動喚醒機制。
- **原聲音訊開關 (Audio Toggle)**：右下方提供原聲開關，點擊切換音訊並同步按鈕視覺狀態（「開啟原聲」↔「原聲播放中」）。
- **品牌信任標籤**：保留「1997 創立年份」單一純淨品牌信譽宣告。

### 2. 歐洲八大代理品牌精選輪播 (Brand Showcase 9:16 Carousel)
- **單一集中資料庫**：全站品牌資料集中由 `js/data.js` 之 `ANSBACH_DATA.brands` 定義，絕無重複宣告。
- **9:16 直式精品卡片**：
  - **桌機版**：一次並排四張 9:16 直式卡片，八品牌分兩組（01-04 與 05-08），支援 8 秒自動輪播與滑鼠懸停暫停（Hover Pause）。
  - **手機版**：一次顯示單張 9:16 卡片，支援 `‹ 01 / 08 ›` 快速切換。
- **器材照片完整保護**：原廠照片容器固定為 1:1 正方形比例，採 `object-fit: contain`，確保器材外觀不被裁切或變形。
- **品牌外連安全規範**：
  - Franco Serblin、ProAc、EAM Lab、Esprit、ASI、Rockna、AudioByte 均提供「探索品牌 →」外部原廠連結，並強制設定 `target="_blank" rel="noopener noreferrer"`。
  - **ATD 依原廠規格無外部網站，嚴格隱藏探索按鈕**，以對齊留白維持版型平整。

### 3. 關於巴洛克 (About Ansbach Acoustic)
- 闡述巴洛克 1997 年創立以來之選物精神，引導愛樂者親臨台北旗艦展示空間預約試聽。

### 4. 產品保固與售後服務 (Warranty & Service)
- **逐字條款移植**：完整移植現行官方網站「產品保固註冊須知」全部六項條款與前言，一字不漏保留審核權基準日、1年保固與內部使用宣告。
- **官方表單串接**：提供醒目的保固登錄按鈕，安全外連至巴洛克官方 Google 保固登錄表單。
- **專屬客服列**：清楚標示電話直撥（`02-25167050`）、客服信箱與服務時間。

### 5. 官方旗艦中心門市與 VIP 電話預約 (VIP Audition Modal)
- 全站預約功能統一整合為「VIP 電話預約資訊卡」（`#audition-modal`），支援行動裝置一鍵撥號直通門市（`tel:0225167050`）。

### 6. 手機底部固定導覽列 (Mobile Bottom Nav)
- 於行動端（≤768px）提供置底三鍵快捷導覽（`🏠 首頁`、`✨ 品牌`、`🛡️ 保固`）。
- 具備即時 ScrollSpy 滾動感應高亮，並為 `body` 提供安全間距補償，徹底避免內容遮蔽。

### 7. SEO、社群預覽與 Favicon 基礎設定
- 語意化唯一 H1 標籤（`.visually-hidden` 兼顧無障礙與畫面純淨）。
- 完整配置 `title`、`meta description` 與 Open Graph 基礎標籤（`og:type`, `og:title`, `og:description`, `og:site_name`, `og:locale`）。
- 採用官方金色「B」Logo 作為瀏覽器 Favicon。

---

## 📂 專案檔案目錄結構

```text
ansbach-audio-portal/
├── index.html                  # 核心現代化旗艦門戶首頁 (HTML5, UTF-8)
├── README.md                   # 系統規格與部署說明文件
├── .gitignore                  # Git 忽略清單 (阻絕本地測試名單與腳本)
├── css/
│   ├── luxury-theme.css        # 曜石黑與香檳金奢華調色盤、全域排版重設
│   ├── components.css          # 導覽列、按鈕、輪播舞台、保固卡與模態窗樣式
│   └── responsive.css          # 跨裝置 RWD (1024px, 768px, 480px, 360px 極限屏防溢出)
├── js/
│   ├── data.js                 # 核心資料庫 (八大代理品牌規格與門市資訊)
│   ├── brand-carousel.js       # 9:16 直式品牌輪播與切換元件
│   ├── booking.js              # VIP 試聽電話預約核心存根
│   └── main.js                 # 主控制器 (Hero 影片動態載入、原聲控制、錨點導航)
└── assets/
    ├── images/
    │   ├── logo.png            # 巴洛克正式金色「B」企業識別 (相容 Favicon)
    │   ├── hero-poster-desktop.svg # 桌機影片預載海報
    │   ├── hero-poster-mobile.svg  # 手機影片預載海報
    │   └── brands/             # 八大代理品牌原廠器材正身照 (1:1 容器)
    │       ├── franco-serblin.jpg
    │       ├── proac.jpg
    │       ├── eam-lab.jpg
    │       ├── esprit.jpg
    │       ├── asi.jpg
    │       ├── rockna.jpg
    │       ├── audiobyte.jpg
    │       └── atd.jpg
    └── videos/
        ├── 巴洛克banner_桌機版.mp4 # 16:9 桌機 Banner 影片 (~2.95 MB)
        └── 巴洛克banner_手機版.mp4 # 9:16 手機 Banner 影片 (~2.37 MB)
```

---

## 🚀 部署與技術特性說明

1. **純靜態架構 (Zero Backend)**：
   - 全站無 PHP、Node.js、Python 或資料庫相依，直接相容 **GitHub Pages**、**Cloudflare Pages** 或任何標準靜態託管主機。
2. **靜態快取與容量合規**：
   - 影片檔案均經過 H.264 最佳化壓縮（桌機 < 3 MB、手機 < 2.5 MB），遠低於 Cloudflare Pages 單檔 25 MB 限制。
3. **路徑相容性 (Relative Paths)**：
   - 所有 CSS、JS、圖片與影片均使用相對路徑，完全相容 GitHub Pages 子目錄路徑（`https://judy0724.github.io/Baroque/`）與本機預覽（`http://localhost:8080/`）。
4. **資訊安全與隱私合規**：
   - 移除了未經授權之 CRM 追蹤代碼與偽造追蹤像素，表單資料全數交由官方 Google Forms 處理，零客戶個資外洩風險。
   - 所有外部連結均配置 `rel="noopener noreferrer"` 防範反向分頁劫持。
