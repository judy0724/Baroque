/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 產品比較與黃金搭配建議模組 (Product Comparator & Synergy Engine)
 */

const ProductComparator = {
  selectedIds: [],
  maxItems: 3,

  init() {
    const drawer = document.getElementById('comparison-drawer');
    if (drawer) drawer.style.display = 'none';
    this.renderComparisonDrawer();
    this.bindEvents();
  },

  bindEvents() {
    // 監聽所有「加入比較」按鈕
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-toggle-compare');
      if (btn) {
        const id = btn.dataset.productId;
        this.toggleProduct(id);
      }
    });

    const clearBtn = document.getElementById('compare-clear-all');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearAll();
      });
    }

    const openModalBtn = document.getElementById('compare-open-modal');
    if (openModalBtn) {
      openModalBtn.addEventListener('click', () => {
        this.openComparisonModal();
      });
    }
  },

  toggleProduct(productId) {
    const idx = this.selectedIds.indexOf(productId);
    if (idx > -1) {
      this.selectedIds.splice(idx, 1);
      MainApp.showToast('已自比較清單移除');
    } else {
      if (this.selectedIds.length >= this.maxItems) {
        MainApp.showToast(`⚠️ 最多僅能同時比較 ${this.maxItems} 項器材，請先移除一項`);
        return;
      }
      this.selectedIds.push(productId);
      const prod = ANSBACH_DATA.products.find(p => p.id === productId);
      MainApp.showToast(`✓ 已將「${prod ? prod.name : productId}」加入比較`);
    }

    this.updateProductButtons();
    this.renderComparisonDrawer();

    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('toggle_compare_item', {
        product_id: productId,
        total_selected: this.selectedIds.length
      });
    }
  },

  clearAll() {
    this.selectedIds = [];
    this.updateProductButtons();
    this.renderComparisonDrawer();
    MainApp.showToast('已清空比較清單');
  },

  updateProductButtons() {
    document.querySelectorAll('.btn-toggle-compare').forEach(btn => {
      const id = btn.dataset.productId;
      if (this.selectedIds.includes(id)) {
        btn.classList.add('active');
        btn.innerHTML = '✓ 已加入比較';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '⚖️ 加入比較';
      }
    });
  },

  renderComparisonDrawer() {
    const drawer = document.getElementById('comparison-drawer');
    const chipsContainer = document.getElementById('comparison-chips');
    const countBadge = document.getElementById('compare-count-badge');
    if (!drawer || !chipsContainer) return;

    if (this.selectedIds.length > 0) {
      drawer.style.display = 'block';
      drawer.classList.add('active');
      if (countBadge) countBadge.textContent = this.selectedIds.length;

      chipsContainer.innerHTML = this.selectedIds.map(id => {
        const prod = ANSBACH_DATA.products.find(p => p.id === id);
        if (!prod) return '';
        return `
          <div class="compare-item-chip">
            <span style="color:var(--gold-primary); font-weight:600;">${prod.brandName}</span>
            <span style="color:#fff;">${prod.name}</span>
            <span class="chip-remove" onclick="ProductComparator.toggleProduct('${prod.id}')">&times;</span>
          </div>
        `;
      }).join('');
    } else {
      drawer.classList.remove('active');
      drawer.style.display = 'none';
    }
  },

  openComparisonModal() {
    if (this.selectedIds.length === 0) return;
    const modal = document.getElementById('compare-modal');
    const body = document.getElementById('compare-modal-content');
    if (!modal || !body) return;

    const items = this.selectedIds.map(id => ANSBACH_DATA.products.find(p => p.id === id)).filter(Boolean);

    // 檢查是否有包含「揚聲器」與「擴大機」的組合，若有則計算綜效
    const hasSpeaker = items.some(i => i.category === 'speakers');
    const hasAmp = items.some(i => i.category === 'amplifiers');
    let synergySection = '';

    if (hasSpeaker && hasAmp) {
      synergySection = `
        <div style="margin-top:30px; background:rgba(197,168,128,0.08); border:1px solid var(--gold-border); border-radius:var(--radius-md); padding:24px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
            <div style="font-family:var(--font-serif); font-size:1.3rem; color:var(--gold-light);">✨ 原廠調音工程師 ‧ 綜效搭配點評 (巴洛克推薦搭配)</div>
            <div style="background:var(--gold-gradient); color:#000; font-weight:700; padding:4px 16px; border-radius:var(--radius-pill); font-size:0.9rem;">
              巴洛克認證 ‧ 極佳相容
            </div>
          </div>
          <p style="color:var(--text-secondary); line-height:1.7; font-size:0.95rem;">
            檢測到您同時選擇了揚聲器與擴大機。巴洛克技術團隊指出：ProAc 的純鋁帶狀高音與 Electrocompaniet 的大電流全平衡架構在阻抗負載與瞬態響應上具備完美的互補性。EC 的溫潤中低頻能穩穩撐起音箱低頻下潛，同時賦予高音溫暖柔潤的天鵝絨光澤，是極致協奏的代表作。
          </p>
        </div>
      `;
    }

    body.innerHTML = `
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.95rem;">
          <thead>
            <tr style="border-bottom:2px solid var(--gold-border);">
              <th style="padding:16px 12px; color:var(--gold-primary); width:180px;">規格項目</th>
              ${items.map(i => `
                <th style="padding:16px 12px; color:#fff; font-family:var(--font-serif); font-size:1.15rem;">
                  <div style="color:var(--gold-light); font-size:0.8rem; text-transform:uppercase;">${i.brandName}</div>
                  ${i.name}
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">類別 / 定位</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--text-secondary);">${i.category === 'speakers' ? '揚聲器 (' + i.type + ')' : (i.category === 'amplifiers' ? '擴大機系統' : '數位訊源/DAC')}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">價格帶參考</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--gold-light); font-weight:600;">${i.priceRange} (NT$ ${i.priceNumber.toLocaleString()})</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">建議空間坪數</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--text-secondary);">${i.roomSize}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">核心頻率響應 / 功率</td>
              ${items.map(i => `<td style="padding:14px 12px; color:#fff;">${i.specs.freqResponse || i.specs.powerOutput || i.specs.dacArchitecture || '原廠高階定義'}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">靈敏度 / 阻尼因數</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--text-secondary);">${i.specs.sensitivity || (i.specs.dampingFactor ? '阻尼 > ' + i.specs.dampingFactor : (i.specs.snr || 'N/A'))}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">阻抗規格</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--text-secondary);">${i.specs.impedance || '全平衡低阻抗直接耦合'}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">外觀尺寸與單支重量</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--text-secondary);">${i.specs.dimensions}<br>${i.specs.weight}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">聲音走向特徵</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--text-gold);">${i.soundChar}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
              <td style="padding:14px 12px; color:var(--text-muted); font-weight:600;">原廠推薦最佳拍檔</td>
              ${items.map(i => `<td style="padding:14px 12px; color:var(--gold-light); font-weight:500;">${i.bestPartner}</td>`).join('')}
            </tr>
            <tr>
              <td style="padding:20px 12px; color:var(--text-muted); font-weight:600;">預約試聽安排</td>
              ${items.map(i => `
                <td style="padding:20px 12px;">
                  <button class="btn btn-primary btn-sm" onclick="MainApp.openBookingModal({ preferredEquipment: '${i.brandName} ${i.name}' })">
                    預約試聽此款 ➔
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
      ${synergySection}
    `;

    MainApp.openModal('compare-modal');

    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('compare_products', {
        compared_items: items.map(i => i.name),
        items_count: items.length
      });
    }
  }
};
