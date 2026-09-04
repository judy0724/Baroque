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
    // 預設最早預約日為明天
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDateStr = tomorrow.toISOString().split('T')[0];

    const auditionDate = document.getElementById('audition-date');
    if (auditionDate) {
      auditionDate.min = minDateStr;
      auditionDate.value = minDateStr;
    }

    const surveyDate = document.getElementById('survey-date');
    if (surveyDate) {
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 3);
      surveyDate.min = nextWeek.toISOString().split('T')[0];
      surveyDate.value = nextWeek.toISOString().split('T')[0];
    }
  },

  bindEvents() {
    // 監聽試聽時段點擊
    document.addEventListener('click', (e) => {
      const slot = e.target.closest('.time-slot-btn');
      if (slot) {
        slot.parentElement.querySelectorAll('.time-slot-btn').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        const hiddenInput = document.getElementById('audition-time-slot');
        if (hiddenInput) hiddenInput.value = slot.dataset.slot;
      }
    });

    // 試聽預約表單提交
    const auditionForm = document.getElementById('audition-booking-form');
    if (auditionForm) {
      auditionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAuditionSubmit(auditionForm);
      });
    }

    // 到府勘測表單提交
    const surveyForm = document.getElementById('home-survey-form');
    if (surveyForm) {
      surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSurveySubmit(surveyForm);
      });
    }
  },

  handleAuditionSubmit(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const date = formData.get('date');
    const timeSlot = formData.get('timeSlot') || '14:00 - 15:30 (午後私享席)';
    const preferredEquipment = formData.get('preferredEquipment') || '未特別指定，由調音師現場規劃推薦';
    const mediaSource = formData.get('mediaSource') || '串流 (Tidal / Qobuz)';
    const note = formData.get('note') || '';

    if (!name || !phone || !date) {
      MainApp.showToast('⚠️ 請完整填寫姓名、聯絡電話與預約日期');
      return;
    }

    const bookingId = 'VIP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    const leadData = {
      type: '試聽預約 (VIP Audition)',
      id: bookingId,
      name,
      phone,
      email,
      date,
      timeSlot,
      preferredEquipment,
      mediaSource,
      note,
      createdAt: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    };

    // 存入 CRM
    AnalyticsCRM.addLead(leadData);

    // 發送 GA4 轉換事件
    AnalyticsCRM.trackEvent('book_audition', {
      booking_id: bookingId,
      appointment_date: date,
      appointment_slot: timeSlot,
      equipment_preference: preferredEquipment
    });

    // 產出 Google Calendar 連結
    const calTitle = encodeURIComponent(`巴洛克音響 VIP 試聽預約 (${bookingId})`);
    const calDetails = encodeURIComponent(`預約器材：${preferredEquipment}\n試聽地點：台北市中山區龍江路76巷53號1樓\n聯絡電話：02-2516-7050`);
    const calLocation = encodeURIComponent('台北市中山區龍江路76巷53號');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLocation}`;

    // 顯示完成畫面
    const container = document.getElementById('audition-form-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 10px;">
          <div style="font-size:3.5rem; color:var(--accent-emerald); margin-bottom:16px;">✓</div>
          <span class="section-tag">預約確認成功</span>
          <h3 class="font-serif" style="font-size:2rem; color:#fff; margin:14px 0;">尊榮試聽預約代碼：<span style="color:var(--gold-light);">${bookingId}</span></h3>
          <p style="color:var(--text-secondary); line-height:1.8; max-width:540px; margin:0 auto 24px;">
            尊敬的 ${name} 貴賓您好，我們已收到您的專屬試聽申請！巴洛克專屬聲學調音師將於 24 小時內致電確認器材熱機暖機排程。
          </p>

          <div style="background:var(--bg-tertiary); border:1px solid var(--gold-border); border-radius:var(--radius-md); padding:20px; max-width:500px; margin:0 auto 28px; text-align:left;">
            <div style="color:var(--gold-primary); font-size:0.85rem; margin-bottom:6px;">預約明細確認：</div>
            <div style="color:#fff; font-size:0.95rem; margin-bottom:4px;"><strong>預約日期：</strong>${date} (${timeSlot})</div>
            <div style="color:#fff; font-size:0.95rem; margin-bottom:4px;"><strong>指定器材：</strong>${preferredEquipment}</div>
            <div style="color:#fff; font-size:0.95rem; margin-bottom:4px;"><strong>試聽地址：</strong>台北市中山區龍江路76巷53號1F</div>
            <div style="color:#fff; font-size:0.95rem;"><strong>專屬服務電話：</strong>02-2516-7050</div>
          </div>

          <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
            <a href="${googleCalUrl}" target="_blank" class="btn btn-outline">
              📅 加入 Google 行事曆
            </a>
            <button class="btn btn-primary" onclick="MainApp.closeModal('audition-modal')">
              完成返回官網
            </button>
          </div>
        </div>
      `;
    }

    MainApp.showToast(`🎉 預約成功！您的代碼為 ${bookingId}`);
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
