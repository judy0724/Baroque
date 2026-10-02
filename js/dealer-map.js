/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 授權經銷商互動查詢系統 (Dealer Locator)
 */

const DealerLocator = {
  currentRegion: 'all',
  searchQuery: '',
  isExpanded: false,

  init() {
    this.bindEvents();
    this.renderDealers();
  },

  toggleShowAll() {
    this.isExpanded = !this.isExpanded;
    this.renderDealers();
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('toggle_dealers_view', { is_expanded: this.isExpanded });
    }
  },

  bindEvents() {
    // 區域篩選按鈕
    document.addEventListener('click', (e) => {
      const pill = e.target.closest('.dealer-region-pill');
      if (pill) {
        pill.parentElement.querySelectorAll('.dealer-region-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentRegion = pill.dataset.region;
        if (this.currentRegion !== 'all') {
          this.isExpanded = true;
        }
        this.renderDealers();

        if (window.AnalyticsCRM) {
          AnalyticsCRM.trackEvent('filter_dealers', {
            region: this.currentRegion
          });
        }
      }
    });

    // 搜尋關鍵字監聽
    const searchInput = document.getElementById('dealer-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.searchQuery) {
          this.isExpanded = true;
        }
        this.renderDealers();
      });
    }
  },

  renderDealers() {
    const container = document.getElementById('dealers-grid-container');
    if (!container) return;

    // 初始狀態且未搜尋、選全區時預設折疊，不直接列出全部卡片
    if (!this.isExpanded && !this.searchQuery && this.currentRegion === 'all') {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:36px 20px; background:var(--bg-card); border-radius:var(--radius-md); border:1px dashed var(--gold-border);">
          <div style="font-size:2rem; margin-bottom:10px;">🏛️</div>
          <h4 style="color:#fff; font-size:1.2rem; margin-bottom:6px;">全台授權經銷網絡與試聽中心 (共 7 間門市)</h4>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px; max-width:560px; margin-left:auto; margin-right:auto; line-height:1.6;">
            巴洛克在台北、桃竹苗、台中與南區均設有經銷體驗夥伴。請選擇上方區域快速篩選，或點擊下方查看全台完整門市列表。
          </p>
          <button class="btn btn-outline btn-sm" onclick="DealerLocator.toggleShowAll()">
            查看全台經銷據點 ▾
          </button>
        </div>
      `;
      return;
    }

    let filtered = ANSBACH_DATA.dealers;

    if (this.currentRegion !== 'all') {
      filtered = filtered.filter(d => d.region === this.currentRegion);
    }

    if (this.searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(this.searchQuery) ||
        d.city.toLowerCase().includes(this.searchQuery) ||
        d.district.toLowerCase().includes(this.searchQuery) ||
        d.address.toLowerCase().includes(this.searchQuery) ||
        d.brands.some(b => b.toLowerCase().includes(this.searchQuery))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:var(--bg-tertiary); border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <div style="font-size:2.5rem; margin-bottom:12px;">🔍</div>
          <h4 style="color:#fff; font-size:1.2rem; margin-bottom:8px;">未找到符合「${this.searchQuery}」條件的經銷據點</h4>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            歡迎直接致電台北官方旗艦展示中心洽詢全台特約展示專員：(02) 2516-7050
          </p>
        </div>
      `;
      return;
    }

    let htmlContent = filtered.map(dealer => `
      <div class="dealer-card ${dealer.isFlagship ? 'flagship' : ''}">
        ${dealer.isFlagship ? '<span class="dealer-flagship-badge">★ 官方總代理台北旗艦中心</span>' : ''}
        
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <div>
            <span style="font-size:0.8rem; color:var(--gold-primary); font-weight:600;">${dealer.city} ‧ ${dealer.district}</span>
            <h4 class="font-serif" style="font-size:1.4rem; color:#fff; margin-top:4px;">${dealer.name}</h4>
          </div>
          ${dealer.hasAuditionRoom ? '<span class="tech-chip" style="color:var(--accent-cyan); border-color:var(--accent-cyan);">獨立試聽室</span>' : ''}
        </div>

        <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:16px; display:flex; flex-direction:column; gap:8px;">
          <div>📍 ${dealer.address}</div>
          <div>📞 <a href="tel:${dealer.phone.replace(/[^0-9]/g, '')}" style="color:var(--gold-light); font-weight:600;" onclick="AnalyticsCRM.trackEvent('click_dealer_call', { dealer_name: '${dealer.name}' })">${dealer.phone}</a></div>
          <div>🕒 ${dealer.hours}</div>
        </div>

        <div style="margin-bottom:20px;">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:6px; text-transform:uppercase;">授權展示品牌</div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${dealer.brands.map(b => `<span class="tech-chip">${b}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top:auto; display:flex; gap:10px;">
          <a href="${dealer.mapUrl}" target="_blank" class="btn btn-outline btn-sm" style="flex:1;" onclick="AnalyticsCRM.trackEvent('click_dealer_map', { dealer_name: '${dealer.name}' })">
            🗺️ Google 地圖導航
          </a>
          <button class="btn btn-glass btn-sm" onclick="MainApp.openBookingModal({ note: '指定經銷門市諮詢：${dealer.name}' })">
            預約專人
          </button>
        </div>
      </div>
    `).join('');

    if (this.isExpanded && !this.searchQuery && this.currentRegion === 'all') {
      htmlContent += `
        <div style="grid-column: 1 / -1; text-align:center; margin-top:16px;">
          <button class="btn btn-glass btn-sm" onclick="DealerLocator.toggleShowAll()">
            收合經銷門市列表 ▴
          </button>
        </div>
      `;
    }

    container.innerHTML = htmlContent;
  }
};
