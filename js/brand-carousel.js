/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 9:16 直式四品牌輪播元件 (Brand Showcase Carousel Component)
 * M3-02 規格：
 * 1. 桌機一次並排四張品牌卡片（9:16 直式比例、上圖下文）
 * 2. 桌機八品牌分兩組（每組 4 張），每組停留 8 秒，可手動切換與懸停暫停
 * 3. 手機一次顯示一張卡片（9:16 直式比例、同版型與同資料）
 * 4. ATD 不顯示原廠探索連結
 * 5. 圖片保持原廠器材比例（object-fit: contain，不裁切、不變形）
 */

const BrandCarousel = {
  currentGroup: 0,      // 桌機分組：0 代表第 1~4 品牌，1 代表第 5~8 品牌
  mobileIndex: 0,       // 手機單張索引：0~7
  totalBrandsCount: 8,
  timer: null,
  isPaused: false,
  autoPlayDelay: 8000,  // 每組停留 8 秒
  _eventsBound: false,

  // 精緻香檳金向量圖示集 (與視覺母版精確對齊)
  icons: {
    temple: `
      <svg class="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#a68352" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 21h18"></path>
        <path d="M5 21V10"></path>
        <path d="M9 21V10"></path>
        <path d="M15 21V10"></path>
        <path d="M19 21V10"></path>
        <path d="M2 10h20"></path>
        <path d="M12 3L2 10h20L12 3z"></path>
      </svg>
    `,
    lyre: `
      <svg class="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#a68352" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 3v5c0 4 2 8 6 12 4-4 6-8 6-12V3"></path>
        <path d="M5 5h14"></path>
        <line x1="10" y1="5" x2="10" y2="17"></line>
        <line x1="14" y1="5" x2="14" y2="17"></line>
        <path d="M9 21h6"></path>
      </svg>
    `,
    soundwave: `
      <svg class="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#a68352" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="4" y1="10" x2="4" y2="14"></line>
        <line x1="8" y1="7" x2="8" y2="17"></line>
        <line x1="12" y1="4" x2="12" y2="20"></line>
        <line x1="16" y1="7" x2="16" y2="17"></line>
        <line x1="20" y1="10" x2="20" y2="14"></line>
      </svg>
    `
  },

  // 取得品牌完整資料集 (單一資料來源：ANSBACH_DATA.brands)
  getAllBrands() {
    if (typeof ANSBACH_DATA !== 'undefined' && Array.isArray(ANSBACH_DATA.brands)) {
      return ANSBACH_DATA.brands;
    }
    if (typeof window !== 'undefined' && window.ANSBACH_DATA && Array.isArray(window.ANSBACH_DATA.brands)) {
      return window.ANSBACH_DATA.brands;
    }
    return [];
  },

  // 判定是否為行動版檢視
  isMobileView() {
    return window.innerWidth <= 768;
  },

  init() {
    this.render();
    this.bindEvents();
    this.startAutoPlay();
  },

  // 產生單張 9:16 直式品牌卡片 HTML
  renderCardHTML(brand, index) {
    if (!brand) return '';
    const highlights = brand.highlights || [];
    const featuresHtml = highlights.map(h => {
      const iconSvg = this.icons[h.icon] || this.icons.temple;
      return `
        <div class="brand-feature-item">
          <span class="feature-icon-box">${iconSvg}</span>
          <span class="feature-text">${h.text}</span>
        </div>
      `;
    }).join('');

    // ATD 沒有原廠網址，officialUrl 為 null 時不顯示探索按鈕
    const actionHtml = brand.officialUrl ? `
      <a href="${brand.officialUrl}" target="_blank" rel="noopener noreferrer" class="brand-explore-btn">
        ${brand.buttonText || '探索品牌 →'}
      </a>
    ` : `
      <div class="brand-explore-placeholder" aria-hidden="true"></div>
    `;

    return `
      <div class="brand-vertical-card" data-brand-id="${brand.id}" data-index="${index}">
        <!-- 上方：原廠器材圖片框 (maintain original ratio, contain) -->
        <div class="brand-card-img-wrap">
          <img src="${brand.image}" alt="${brand.name} 旗艦器材" class="brand-card-product-img" loading="lazy" onerror="BrandCarousel.handleImageFallback(this)">
        </div>

        <!-- 下方：品牌資訊區 (圖上字下) -->
        <div class="brand-card-info-wrap">
          <h3 class="brand-card-title">${brand.name}</h3>

          <div class="brand-card-features-list">
            ${featuresHtml}
          </div>

          <div class="brand-card-action-wrap">
            ${actionHtml}
          </div>
        </div>
      </div>
    `;
  },

  render() {
    const stage = document.getElementById('brand-showcase-stage');
    if (!stage) return;

    const brands = this.getAllBrands();
    if (!brands.length) {
      console.error('BrandCarousel: 查無品牌資料 (請確認 js/data.js 已正確載入)');
      return;
    }

    if (this.isMobileView()) {
      // 手機版：一次渲染 1 張 9:16 卡片
      const currentBrand = brands[this.mobileIndex] || brands[0];
      stage.innerHTML = `
        <div class="brand-mobile-single-wrapper">
          ${this.renderCardHTML(currentBrand, this.mobileIndex)}
        </div>
      `;
    } else {
      // 桌機版：一次並排四張 9:16 卡片 (兩組切換：0~3 或 4~7)
      const startIndex = this.currentGroup * 4;
      const groupBrands = brands.slice(startIndex, startIndex + 4);
      stage.innerHTML = `
        <div class="brand-desktop-four-grid">
          ${groupBrands.map((b, idx) => this.renderCardHTML(b, startIndex + idx)).join('')}
        </div>
      `;
    }

    this.updatePagination();
  },

  // 更新頁碼指示與分組圓點
  updatePagination() {
    const desktopPageEl = document.getElementById('brand-page-desktop');
    const mobilePageEl = document.getElementById('brand-page-mobile');
    const groupDots = document.querySelectorAll('.group-dot');

    if (desktopPageEl) {
      desktopPageEl.textContent = this.currentGroup === 0 ? '01 - 04 / 08' : '05 - 08 / 08';
    }

    if (mobilePageEl) {
      const currentNum = String(this.mobileIndex + 1).padStart(2, '0');
      mobilePageEl.textContent = `${currentNum} / 08`;
    }

    groupDots.forEach((dot, idx) => {
      if (idx === this.currentGroup) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  },

  prev() {
    if (this.isMobileView()) {
      this.mobileIndex = (this.mobileIndex - 1 + this.totalBrandsCount) % this.totalBrandsCount;
    } else {
      this.currentGroup = this.currentGroup === 0 ? 1 : 0;
    }
    this.render();
    this.resetAutoPlay();
  },

  next() {
    if (this.isMobileView()) {
      this.mobileIndex = (this.mobileIndex + 1) % this.totalBrandsCount;
    } else {
      this.currentGroup = this.currentGroup === 0 ? 1 : 0;
    }
    this.render();
    this.resetAutoPlay();
  },

  goToGroup(groupIndex) {
    this.currentGroup = groupIndex;
    this.render();
    this.resetAutoPlay();
  },

  startAutoPlay() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoPlayDelay);
  },

  pauseAutoPlay() {
    this.isPaused = true;
  },

  resumeAutoPlay() {
    this.isPaused = false;
  },

  resetAutoPlay() {
    this.startAutoPlay();
  },

  handleImageFallback(imgEl) {
    if (!imgEl) return;
    imgEl.onerror = null;
    imgEl.parentElement.classList.add('img-placeholder-active');
  },

  bindEvents() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    // 左右箭頭切換監聽
    document.addEventListener('click', (e) => {
      if (e.target.closest('#desktop-brand-prev') || e.target.closest('#mobile-brand-prev')) {
        this.prev();
      } else if (e.target.closest('#desktop-brand-next') || e.target.closest('#mobile-brand-next')) {
        this.next();
      } else if (e.target.closest('.group-dot')) {
        const dot = e.target.closest('.group-dot');
        const grp = parseInt(dot.dataset.group, 10);
        if (!isNaN(grp)) this.goToGroup(grp);
      }
    });

    // 桌機懸停暫停輪播 (Mouse hover pause / resume)
    const wrapper = document.getElementById('brand-carousel-wrapper') || document.getElementById('brands-section');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => this.pauseAutoPlay());
      wrapper.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }

    // 視窗大小改變自適應
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.render();
      }, 150);
    });
  }
};

if (typeof window !== 'undefined') {
  window.BrandCarousel = BrandCarousel;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BrandCarousel.init());
  } else {
    BrandCarousel.init();
  }
}
