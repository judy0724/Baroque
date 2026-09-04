/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * GA4 數據追蹤、廣告轉換與 CRM 客戶名單管理系統 (Analytics & CRM Engine)
 */

const AnalyticsCRM = {
  eventsLog: [],
  leads: [],
  config: {
    ga4MeasurementId: 'G-ANSBACH999',
    metaPixelId: '123456789012345',
    crmWebhookUrl: '/api/leads'
  },

  init() {
    window.dataLayer = window.dataLayer || [];
    this.loadLeads();
    this.bindEvents();
    this.renderTelemetryUI();
    
    // 記錄初始頁面瀏覽事件 (PageView)
    this.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  },

  loadLeads() {
    const saved = localStorage.getItem('ansbach_crm_leads');
    if (saved) {
      try {
        this.leads = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading CRM leads', e);
      }
    }

    // 若尚無資料，預填 3 筆真實體驗示範名單
    if (this.leads.length === 0) {
      this.leads = [
        {
          id: 'VIP-2026-8821',
          type: '試聽預約 (VIP Audition)',
          name: '林宗憲 建築設計師',
          phone: '0928-123-888',
          email: 'lin.arch@studio.tw',
          date: '2026-09-08',
          timeSlot: '14:00 - 15:30 (午後私享席)',
          preferredEquipment: 'ProAc K6 Signature + EC AW 800 M 旗艦單聲道',
          mediaSource: '黑膠 (LP) + Tidal MQA',
          note: '台北大直豪宅新案規劃，欲帶客戶親自試聽整套發燒系統',
          createdAt: '2026-09-03 15:20:10'
        },
        {
          id: 'SRV-2026-4412',
          type: '到府聲學勘測 (Acoustic Survey)',
          name: '張雅婷 總經理',
          phone: '0919-456-789',
          email: 'yating.chang@techcorp.com',
          area: '18 坪',
          stage: '新成屋毛胚 (水電進場前)',
          address: '新竹市東區關新路 88 號 15F',
          budget: '150萬 - 200萬',
          note: '客廳挑高 3.6 米，希望前期預埋發燒專線與聲學擴散板結構',
          createdAt: '2026-09-02 11:45:00'
        },
        {
          id: 'WAR-2026-3390',
          type: '產品保固登錄 (Warranty Registration)',
          name: '陳志遠 醫師',
          phone: '0933-888-999',
          email: 'dr.chen@hospital.tw',
          serial: 'ANS-PA-2024-8891',
          model: 'ProAc Response D20R (黑檀木限量版)',
          dealer: '巴洛克官方旗艦店',
          purchaseDate: '2024-11-20',
          invoiceNumber: 'TK-88912345',
          createdAt: '2026-08-30 18:10:22'
        }
      ];
      this.saveLeads();
    }
  },

  saveLeads() {
    localStorage.setItem('ansbach_crm_leads', JSON.stringify(this.leads));
  },

  addLead(leadData) {
    this.leads.unshift(leadData);
    this.saveLeads();
    this.renderLeadsTable();

    // 嘗試非同步同步至後端 Python API (若在伺服器環境執行)
    if (window.fetch) {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      }).catch(err => console.log('API sync skipped (offline or static mode)'));
    }
  },

  trackEvent(eventName, eventParams = {}) {
    const timestamp = new Date().toLocaleTimeString('zh-TW', { hour12: false });
    const eventObject = {
      event: eventName,
      timestamp: timestamp,
      ...eventParams
    };

    // 1. 推入標準 Google Tag Manager DataLayer
    window.dataLayer.push(eventObject);

    // 2. 存入內部即時監聽記錄
    this.eventsLog.unshift(eventObject);
    if (this.eventsLog.length > 50) this.eventsLog.pop();

    // 3. 更新浮動觀測器 UI
    this.renderEventsLog();

    console.log(`[GA4 DataLayer] ➔ ${eventName}`, eventParams);
  },

  bindEvents() {
    // 觀測面板展開/收合
    const toggleBtn = document.getElementById('telemetry-toggle-btn');
    const closeBtn = document.getElementById('telemetry-close-btn');
    const drawer = document.getElementById('telemetry-drawer');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        drawer.classList.toggle('active');
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    }

    // 觀測面板分頁切換
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.telemetry-tab');
      if (tab) {
        tab.parentElement.querySelectorAll('.telemetry-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetPane = tab.dataset.pane;
        document.querySelectorAll('.telemetry-pane').forEach(p => p.style.display = 'none');
        const activePane = document.getElementById(targetPane);
        if (activePane) activePane.style.display = 'block';
      }
    });

    // 匯出 CSV 按鈕
    const exportBtn = document.getElementById('btn-export-crm-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportCSV();
      });
    }

    // 儲存設定按鈕
    const saveCfgBtn = document.getElementById('btn-save-telemetry-config');
    if (saveCfgBtn) {
      saveCfgBtn.addEventListener('click', () => {
        const ga4Input = document.getElementById('cfg-ga4-id');
        const pixelInput = document.getElementById('cfg-pixel-id');
        if (ga4Input) this.config.ga4MeasurementId = ga4Input.value.trim();
        if (pixelInput) this.config.metaPixelId = pixelInput.value.trim();
        MainApp.showToast('✅ 追蹤代碼設定已更新儲存！');
      });
    }
  },

  renderTelemetryUI() {
    this.renderEventsLog();
    this.renderLeadsTable();
  },

  renderEventsLog() {
    const container = document.getElementById('telemetry-events-list');
    if (!container) return;

    if (this.eventsLog.length === 0) {
      container.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:20px;">尚無觸發事件，請在網站點擊操作...</div>';
      return;
    }

    container.innerHTML = this.eventsLog.map(ev => `
      <div style="margin-bottom:12px; padding:10px; background:rgba(255,255,255,0.03); border-radius:6px; border-left:3px solid var(--gold-primary);">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="color:var(--gold-light); font-weight:700;">${ev.event}</span>
          <span style="color:var(--text-muted); font-size:0.75rem;">${ev.timestamp}</span>
        </div>
        <pre style="color:var(--text-secondary); font-size:0.75rem; white-space:pre-wrap; margin:0; font-family:monospace;">${JSON.stringify(ev, null, 2)}</pre>
      </div>
    `).join('');
  },

  renderLeadsTable() {
    const tbody = document.getElementById('telemetry-leads-tbody');
    const countBadge = document.getElementById('crm-leads-count-badge');
    if (countBadge) countBadge.textContent = this.leads.length;
    if (!tbody) return;

    tbody.innerHTML = this.leads.map(lead => `
      <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:10px 8px; color:var(--gold-light); font-weight:600;">${lead.id}</td>
        <td style="padding:10px 8px; color:#fff;">${lead.name}</td>
        <td style="padding:10px 8px; color:var(--text-secondary);">${lead.phone}</td>
        <td style="padding:10px 8px; color:var(--text-gold);">${lead.type}</td>
        <td style="padding:10px 8px; color:var(--text-muted); font-size:0.75rem;">${lead.createdAt}</td>
      </tr>
    `).join('');
  },

  exportCSV() {
    if (this.leads.length === 0) {
      MainApp.showToast('⚠️ 目前尚無顧客名單資料可供匯出');
      return;
    }

    // 建立繁體中文 Excel 相容 CSV (加入 \uFEFF BOM)
    let csvContent = '\uFEFF編號,類型,姓名,電話,電子信箱,日期/坪數,指定器材/型號/序號,備註說明,建立時間\n';

    this.leads.forEach(l => {
      const row = [
        `"${l.id || ''}"`,
        `"${l.type || ''}"`,
        `"${l.name || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.email || ''}"`,
        `"${l.date || l.area || ''}"`,
        `"${(l.preferredEquipment || l.model || l.serial || '').replace(/"/g, '""')}"`,
        `"${(l.note || l.dealer || '').replace(/"/g, '""')}"`,
        `"${l.createdAt || ''}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `巴洛克音響_CRM顧客名單_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    MainApp.showToast('📥 顧客資料 CSV 已成功匯出下載！');
    this.trackEvent('export_crm_leads_csv', { count: this.leads.length });
  }
};
