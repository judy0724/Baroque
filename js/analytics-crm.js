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
  },

  saveLeads() {
    localStorage.setItem('ansbach_crm_leads', JSON.stringify(this.leads));
  },

  addLead(leadData) {
    this.leads.unshift(leadData);
    this.saveLeads();

    // 嘗試非同步同步至後端 API (若在伺服器環境執行)
    if (window.fetch) {
      fetch(this.config.crmWebhookUrl, {
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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventObject);

    // 2. 存入內部即時監聽記錄
    this.eventsLog.unshift(eventObject);
    if (this.eventsLog.length > 50) this.eventsLog.pop();

    console.log(`[GA4 DataLayer] ➔ ${eventName}`, eventParams);
  }
};
