/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 售後服務、保固登錄與防偽正品序號核驗中心 (Warranty & Verification Center)
 */

const WarrantyCenter = {
  registeredWarranties: [],

  init() {
    // 載入初始範例資料庫與本地儲存之登錄紀錄
    this.registeredWarranties = [...ANSBACH_DATA.validWarrantyDatabase];
    const saved = localStorage.getItem('ansbach_local_warranties');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.registeredWarranties.push(...parsed);
      } catch (e) {
        console.error('Error parsing local warranties', e);
      }
    }

    this.bindEvents();
  },

  bindEvents() {
    // 保固查詢按鈕
    const verifyBtn = document.getElementById('btn-verify-serial');
    const serialInput = document.getElementById('verify-serial-input');

    if (verifyBtn && serialInput) {
      verifyBtn.addEventListener('click', () => {
        this.verifySerial(serialInput.value.trim());
      });

      serialInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.verifySerial(serialInput.value.trim());
        }
      });
    }

    // 保固登錄表單
    const regForm = document.getElementById('warranty-registration-form');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegistration(regForm);
      });
    }
  },

  verifySerial(serial) {
    const resultBox = document.getElementById('warranty-verify-result');
    if (!resultBox) return;

    if (!serial) {
      MainApp.showToast('⚠️ 請先輸入產品機身保固序號');
      return;
    }

    // 大小寫不拘比對
    const matched = this.registeredWarranties.find(
      w => w.serial.toUpperCase() === serial.toUpperCase()
    );

    if (matched) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="warranty-status-card" style="border-color:var(--accent-emerald);">
          <div class="warranty-status-icon">🛡️</div>
          <div style="flex:1;">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
              <span class="section-tag" style="background:rgba(46,204,113,0.15); color:var(--accent-emerald); border-color:var(--accent-emerald);">
                ✓ 台灣巴洛克原廠 ‧ 正品公司貨認證
              </span>
              <span style="color:var(--text-muted); font-size:0.85rem;">核驗時間：${new Date().toLocaleTimeString('zh-TW')}</span>
            </div>
            <h4 class="font-serif" style="font-size:1.5rem; color:#fff; margin-bottom:12px;">${matched.model}</h4>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; background:rgba(0,0,0,0.3); padding:16px; border-radius:var(--radius-sm); margin-bottom:16px; font-size:0.9rem;">
              <div><span style="color:var(--text-muted);">機身序號：</span><strong style="color:var(--gold-light);">${matched.serial}</strong></div>
              <div><span style="color:var(--text-muted);">授權經銷店：</span><strong style="color:#fff;">${matched.dealer}</strong></div>
              <div><span style="color:var(--text-muted);">購買日期：</span><strong style="color:#fff;">${matched.purchaseDate}</strong></div>
              <div><span style="color:var(--text-muted);">保固狀態：</span><strong style="color:var(--accent-emerald);">${matched.status}</strong></div>
              <div style="grid-column: 1 / -1;"><span style="color:var(--text-muted);">保固權益期限：</span><strong style="color:#fff;">${matched.warrantyEndDate}</strong></div>
            </div>

            <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
              ※ 本序號登錄有效。非本公司授權經銷商所販售之水貨或偽品無法享有巴洛克台灣總代理 1 年至 2 年原廠零組件更換與精密校音服務。若需報修或升級諮詢請致電：02-2516-7050。
            </p>
          </div>
        </div>
      `;

      MainApp.showToast('✅ 序號驗證成功！此為巴洛克正品公司貨');
    } else {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="warranty-status-card" style="border-color:var(--accent-rose);">
          <div class="warranty-status-icon" style="color:var(--accent-rose);">⚠️</div>
          <div style="flex:1;">
            <div style="color:var(--accent-rose); font-weight:700; font-size:1.1rem; margin-bottom:6px;">
              查無此序號登錄紀錄 (序號：${serial})
            </div>
            <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7; margin-bottom:12px;">
              您所輸入的產品序號尚未在巴洛克原廠保固系統中完成註冊，或可能為非授權店家銷售之水貨平行輸入商品。
            </p>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button class="btn btn-outline btn-sm" onclick="WarrantyCenter.switchTab('register')">
                立即進行新機保固登錄 ➔
              </button>
              <a href="tel:0225167050" class="btn btn-glass btn-sm">
                📞 撥打客服核實 02-2516-7050
              </a>
            </div>
          </div>
        </div>
      `;

      MainApp.showToast('⚠️ 查無此產品序號登錄資料');
    }

    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('verify_warranty_serial', {
        queried_serial: serial,
        is_verified: !!matched,
        model_name: matched ? matched.model : 'unknown'
      });
    }
  },

  handleRegistration(form) {
    const formData = new FormData(form);
    const serial = formData.get('serial').trim();
    const model = formData.get('model');
    const dealer = formData.get('dealer');
    const purchaseDate = formData.get('purchaseDate');
    const ownerName = formData.get('ownerName');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const invoiceNumber = formData.get('invoiceNumber') || '未填寫發票號碼';

    if (!serial || !model || !purchaseDate || !ownerName || !phone) {
      MainApp.showToast('⚠️ 請完整填寫機身序號、購買型號、日期與聯絡電話');
      return;
    }

    const regCode = 'WAR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    // 計算保固到期日（預設2年VIP尊榮保固）
    const pDate = new Date(purchaseDate);
    pDate.setFullYear(pDate.getFullYear() + 2);
    const warrantyEndDate = pDate.toISOString().split('T')[0] + ' (2年原廠尊榮保固)';

    const newRecord = {
      serial,
      model,
      dealer: dealer || '巴洛克授權經銷店',
      purchaseDate,
      warrantyEndDate,
      status: '有效保固中 (巴洛克原廠核發)',
      ownerName: ownerName + ` (${phone.substring(0, 4)}***)`
    };

    // 加入內部快取與本機資料庫
    this.registeredWarranties.push(newRecord);
    const localList = JSON.parse(localStorage.getItem('ansbach_local_warranties') || '[]');
    localList.push(newRecord);
    localStorage.setItem('ansbach_local_warranties', JSON.stringify(localList));

    // 存入 CRM
    AnalyticsCRM.addLead({
      type: '產品保固登錄 (Warranty Registration)',
      id: regCode,
      name: ownerName,
      phone,
      email,
      serial,
      model,
      dealer,
      purchaseDate,
      invoiceNumber,
      createdAt: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    });

    // 觸發 GA4 轉換
    AnalyticsCRM.trackEvent('register_warranty', {
      warranty_code: regCode,
      product_serial: serial,
      model_name: model,
      dealer_name: dealer
    });

    // 成功畫面提示
    const container = document.getElementById('warranty-form-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 10px;">
          <div style="font-size:3.5rem; color:var(--accent-emerald); margin-bottom:14px;">🛡️</div>
          <span class="section-tag">保固登錄完成</span>
          <h3 class="font-serif" style="font-size:2rem; color:#fff; margin:12px 0;">數位保證卡認證編號：<span style="color:var(--gold-light);">${regCode}</span></h3>
          <p style="color:var(--text-secondary); line-height:1.7; max-width:540px; margin:0 auto 20px;">
            感謝 ${ownerName} 先生/女士 購買巴洛克音響總代理正品。您的器材【${model}】(序號：${serial}) 尊榮保固已即刻生效，享有 2 年原廠零件保固與技術諮詢。
          </p>
          <div style="display:flex; justify-content:center; gap:16px;">
            <button class="btn btn-primary" onclick="WarrantyCenter.quickVerify('${serial}')">
              立即檢視防偽保固憑證 ➔
            </button>
          </div>
        </div>
      `;
    }

    MainApp.showToast(`🛡️ 恭喜！產品保固已成功登錄，編號 ${regCode}`);
  },

  quickVerify(serial) {
    const serialInput = document.getElementById('verify-serial-input');
    if (serialInput) serialInput.value = serial;
    this.verifySerial(serial);
    this.switchTab('query');
  },

  switchTab(tab) {
    const queryTabBtn = document.getElementById('tab-btn-warranty-query');
    const regTabBtn = document.getElementById('tab-btn-warranty-reg');
    const queryPane = document.getElementById('warranty-pane-query');
    const regPane = document.getElementById('warranty-pane-reg');

    if (tab === 'query') {
      if (queryTabBtn) queryTabBtn.classList.add('active');
      if (regTabBtn) regTabBtn.classList.remove('active');
      if (queryPane) queryPane.style.display = 'block';
      if (regPane) regPane.style.display = 'none';
    } else {
      if (queryTabBtn) queryTabBtn.classList.remove('active');
      if (regTabBtn) regTabBtn.classList.add('active');
      if (queryPane) queryPane.style.display = 'none';
      if (regPane) regPane.style.display = 'block';
    }
  }
};
