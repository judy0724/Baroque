/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 預約試聽與到府聲學規劃核心系統 (Booking & Consultation Engine)
 */

const BookingEngine = {
  init() {
    this.setupDatePickers();
    this.bindEvents();
  },

  setupDatePickers() {
    const today = new Date();
    const surveyDate = document.getElementById('survey-date');
    if (surveyDate) {
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 3);
      surveyDate.min = nextWeek.toISOString().split('T')[0];
      surveyDate.value = nextWeek.toISOString().split('T')[0];
    }
  },

  bindEvents() {
    // 到府勘測表單提交
    const surveyForm = document.getElementById('home-survey-form');
    if (surveyForm) {
      surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSurveySubmit(surveyForm);
      });
    }
  },

  handleSurveySubmit(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const area = formData.get('area');
    const stage = formData.get('stage');
    const address = formData.get('address');
    const budget = formData.get('budget');
    const note = formData.get('note') || '';

    if (!name || !phone || !area || !address) {
      MainApp.showToast('⚠️ 請完整填寫姓名、電話、坪數與房屋地址');
      return;
    }

    const surveyId = 'SRV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    const leadData = {
      type: '到府聲學勘測 (Acoustic Survey)',
      id: surveyId,
      name,
      phone,
      area: `${area} 坪`,
      stage,
      address,
      budget,
      note,
      createdAt: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    };

    // 存入 CRM
    AnalyticsCRM.addLead(leadData);

    // 發送 GA4 轉換事件
    AnalyticsCRM.trackEvent('request_home_survey', {
      survey_id: surveyId,
      space_area: area,
      renovation_stage: stage,
      expected_budget: budget
    });

    const container = document.getElementById('survey-form-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 10px;">
          <div style="font-size:3.5rem; color:var(--gold-light); margin-bottom:16px;">📐</div>
          <span class="section-tag">到府規劃申請已立案</span>
          <h3 class="font-serif" style="font-size:2rem; color:#fff; margin:14px 0;">案件編號：<span style="color:var(--gold-light);">${surveyId}</span></h3>
          <p style="color:var(--text-secondary); line-height:1.8; max-width:540px; margin:0 auto 24px;">
            感謝 ${name} 先生/女士。巴洛克資深空間聲學工程團隊將指派專案顧問與您（或您的室內設計師團隊）聯絡，攜帶精密儀器到府實地勘查。
          </p>
          <button class="btn btn-primary" onclick="MainApp.closeModal('survey-modal')">
            好的，返回官網
          </button>
        </div>
      `;
    }

    MainApp.showToast(`📐 到府勘測申請已立案！編號：${surveyId}`);
  }
};
