# Travel Blog Project

這是一個使用 [Hugo](https://gohugo.io/) 建立的靜態旅遊部落格網站，專門用於記錄旅行攻略與行程。網站設計以「目的地」為核心，支援深色模式與客製化的行程展示首頁。

## ✨ 功能特色 (Features)

### 1. 結構化行程管理
*   **資料夾分類**: 採用 `YYYYMMDD_Destination` (例如 `20260501_Okinawa`) 作為分類依據。
*   **層級式內容**: 每個目的地資料夾內包含每日遊記 (`Day1`, `Day2`...)。
*   **路徑保留**: 設定 `disablePathToLower = true`，網址路徑完整保留資料夾的大小寫 (如 `/20260501_Okinawa/`)。

### 2. 客製化視覺體驗
*   **精選行程首頁**: 首頁經過客製化 (`layouts/index.html`)，以卡片形式展示各個旅遊行程，包含封面圖片 (`featured_image`) 與摘要，而非傳統的流水帳文章列表。
*   **深色模式 (Dark Mode)**:
    *   **自動偵測**: 支援系統偏好設定 (`prefers-color-scheme`)。
    *   **手動切換**: 右下角提供懸浮按鈕 (☀️/🌙)，可手動切換並記憶使用者偏好。
    *   **樣式適配**: 針對 Tachyons CSS 進行了完整的深色配色覆寫。

### 3. 排序與權重
*   利用 `weight` 參數精確控制：
    *   首頁行程的顯示順序 (例如東京排在沖繩前面)。
    *   行程內每日文章的順序 (Day 1 -> Day 2 -> Day 3)。

## 🛠️ 技術棧 (Tech Stack)

*   **核心**: Hugo (Static Site Generator)
*   **主題**: Ananke (作為基底)
*   **樣式**: Tachyons CSS (CDN) + 自定義 CSS (`static/css/dark-mode.css`)
*   **腳本**: Vanilla JavaScript (處理深色模式切換邏輯)

## 📂 專案結構範例

```text
Travel/
├── content/
│   ├── 20260501_Okinawa/    # [行程] 沖繩
│   │   ├── _index.md        # 行程設定 (封面圖、標題)
│   │   ├── Day1.md          # Day 1 內容
│   │   ├── Day2.md
│   │   └── Day3.md
│   ├── 20260606_Tokyo/      # [行程] 東京
│   │   ├── _index.md
│   │   └── Day1.md
│   └── _index.md            # 網站首頁設定
├── static/
│   ├── css/
│   │   └── dark-mode.css    # 深色模式樣式表
│   └── images/              # 本地圖片存放處
├── layouts/
│   ├── index.html           # 首頁佈局覆寫
│   └── _partials/
│       └── site-style.html  # 引入 CSS 與 JS
└── hugo.toml                # 網站主要設定檔
```

## 🚀 本地端運行 (Local Setup)

1.  確保已安裝 Hugo。
2.  複製專案並進入目錄：
    ```bash
    git clone <YOUR_REPO_URL>
    cd Travel
    ```
3.  啟動伺服器：
    ```bash
    hugo server
    ```
4.  開啟瀏覽器訪問 `http://localhost:1313/`。

## 📝 內容撰寫指南

### 新增一個新行程
1. 在 `content/` 下建立資料夾，例如 `20261231_NewYork`。
2. 在該資料夾內建立 `_index.md`：
   ```yaml
   ---
   title: "2026 紐約跨年"
   date: 2026-12-31
   featured_image: "/images/newyork.jpg"  # 圖片需放在 static/images/
   weight: 1  # 數字越小越靠前
   ---
   這裡寫行程簡介...
   ```
3. 接著建立 `Day1.md`, `Day2.md` 等檔案即可。

## 📦 自動部署 (GitHub Actions)

本專案已設定 GitHub Actions workflow，推送到 GitHub 後會自動部署。

**設定步驟:**
1. 將專案推送到 GitHub Repository。
2. 進入 Repository 的 **Settings** > **Pages**。
3. 在 **Build and deployment** > **Source** 區塊，選擇 **GitHub Actions**。
4. 下次推送程式碼時，GitHub Actions 就會自動建置並部署網站。

---
Generated for Travel Blog Project