/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 智能選音響顧問 (Interactive Audio Advisor)
 * 根據空間坪數、預算、音樂風格與系統偏好動態運算推薦最佳系統組合
 */

const AudioAdvisor = {
  currentStep: 1,
  totalSteps: 4,
  answers: {
    space: 'medium',   // small (<5坪), medium (5-12坪), large (12坪+)
    budget: '25-60',   // 10-25, 25-60, 60-120, 120+
    genre: 'vocal',    // vocal (人聲爵士), classical (古典交響), rock (流行動態), streaming (數位串流)
    system: 'streamer' // hifi (純兩聲道), streamer (一體串流), split (分體前後級), theater (多聲道)
  },

  init() {
    this.bindEvents();
    this.renderStep(1);
  },

  bindEvents() {
    // 選項點擊事件委託
    document.addEventListener('click', (e) => {
      const tile = e.target.closest('.option-tile');
      if (tile) {
        const step = parseInt(tile.dataset.step, 10);
        const key = tile.dataset.key;
        const val = tile.dataset.val;
        
        // 切換選中狀態
        tile.parentElement.querySelectorAll('.option-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        this.answers[key] = val;

        // 觸發微轉換追蹤
        if (window.AnalyticsCRM) {
          AnalyticsCRM.trackEvent('advisor_option_selected', {
            step: step,
            dimension: key,
            selected_value: val
          });
        }
      }
    });

    const nextBtn = document.getElementById('advisor-next-btn');
    const prevBtn = document.getElementById('advisor-prev-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.totalSteps) {
          this.goToStep(this.currentStep + 1);
        } else {
          this.calculateAndShowResult();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 1) {
          this.goToStep(this.currentStep - 1);
        }
      });
    }
  },

  goToStep(stepNumber) {
    this.currentStep = stepNumber;
    this.renderStep(stepNumber);
    
    // 更新指示圓圈
    document.querySelectorAll('.advisor-step-item').forEach((item, idx) => {
      const stepIdx = idx + 1;
      item.classList.remove('active', 'completed');
      if (stepIdx === stepNumber) {
        item.classList.add('active');
      } else if (stepIdx < stepNumber) {
        item.classList.add('completed');
      }
    });

    // 更新進度條
    const progressFill = document.querySelector('.advisor-progress-fill');
    if (progressFill) {
      progressFill.style.width = ((stepNumber - 1) / (this.totalSteps - 1) * 80 + 10) + '%';
    }

    // 更新按鈕文字
    const nextBtn = document.getElementById('advisor-next-btn');
    const prevBtn = document.getElementById('advisor-prev-btn');
    if (prevBtn) prevBtn.style.visibility = stepNumber === 1 ? 'hidden' : 'visible';
    if (nextBtn) {
      nextBtn.innerHTML = stepNumber === this.totalSteps ? '即刻智能運算最佳系統 ➔' : '下一步 ➔';
    }
  },

  renderStep(stepNumber) {
    document.querySelectorAll('.advisor-step-panel').forEach(panel => {
      panel.style.display = 'none';
    });
    const activePanel = document.getElementById(`advisor-step-${stepNumber}`);
    if (activePanel) {
      activePanel.style.display = 'block';
      // 依現有答案高亮已選
      const tiles = activePanel.querySelectorAll('.option-tile');
      tiles.forEach(tile => {
        const key = tile.dataset.key;
        const val = tile.dataset.val;
        if (this.answers[key] === val) {
          tile.classList.add('selected');
        } else {
          tile.classList.remove('selected');
        }
      });
    }
  },

  calculateAndShowResult() {
    const { space, budget, genre, system } = this.answers;
    
    // 智慧搭配演算法
    let recommendation = {};

    if (budget === '120+' || space === 'large') {
      recommendation = {
        title: '殿堂級旗艦全頻示範系統 (Ktêma + AW 800 M)',
        matchScore: 99,
        badge: '頂峰天花板之選',
        budgetEst: '約 310 - 380 萬元',
        speaker: ANSBACH_DATA.products.find(p => p.id === 'fs-ktema'),
        amplifier: ANSBACH_DATA.products.find(p => p.id === 'ec-aw800m'),
        source: ANSBACH_DATA.products.find(p => p.id === 'rockna-wavedream'),
        reason: '您的空間寬闊（或追求無妥協之旗艦動態）。Franco Serblin 頂級義大利木藝箱體加上 Electrocompaniet 800W 純淨驅動力，能無壓縮重現馬勒交響曲與歌劇現場的龐大動態與細膩微弱音。',
        features: ['義大利實心胡桃木傳世手工', '純 A 類 800W 極限控制力', '全平衡 27-bit R2R 類比階梯解碼']
      };
    } else if (space === 'small' || budget === '10-25') {
      recommendation = {
        title: '文人書房極致近場典範 (Tablette 10 Sig + EC 綜擴)',
        matchScore: 96,
        badge: '書齋與臥室首選',
        budgetEst: '約 18 - 25 萬元',
        speaker: ANSBACH_DATA.products.find(p => p.id === 'proac-tab10-sig'),
        amplifier: ANSBACH_DATA.products.find(p => p.id === 'ec-eci6dx'),
        source: '支援內建串流 AirPlay 2 / Tidal',
        reason: '針對 3-5 坪小空間或書房近場聆聽，ProAc Tablette 10 的密閉箱體完全沒有低音反射孔帶來的駐波轟鳴困擾，人聲形體如浮雕般立體，小音量依然細節豐富。',
        features: ['密閉箱體近牆擺位友善', '人聲溫潤甜美、弦樂松香濃郁', '支援全無損智慧手機遙控']
      };
    } else if (genre === 'classical' || budget === '60-120') {
      recommendation = {
        title: '高貴英倫大編制鑑賞系統 (Response D20R / K6 + EC 旗艦系統)',
        matchScore: 98,
        badge: '古典交響黃金標準',
        budgetEst: '約 60 - 98 萬元',
        speaker: ANSBACH_DATA.products.find(p => p.id === 'proac-k6-sig') || ANSBACH_DATA.products.find(p => p.id === 'proac-d20r'),
        amplifier: ANSBACH_DATA.products.find(p => p.id === 'ec-aw800m'),
        source: ANSBACH_DATA.products.find(p => p.id === 'rockna-wavedream'),
        reason: '專門為追求交響樂層次、大提琴擦弦厚度與鋼琴顆粒感打造。純鋁帶狀高音延伸平直且極為細膩，搭配挪威平衡放大架構，聲音堂皇貴氣。',
        features: ['特製帶狀高音超低失真', '大電流浮動變壓器深厚底盤', '無邊界 3D 舞台音場重現']
      };
    } else {
      // 標準家庭客廳長青首選
      recommendation = {
        title: '巴洛克 25 年長青黃金組合 (Response D20R + ECI 6DX MKII)',
        matchScore: 98,
        badge: '巴洛克熱銷榜首推薦',
        budgetEst: '約 59 萬元',
        speaker: ANSBACH_DATA.products.find(p => p.id === 'proac-d20r'),
        amplifier: ANSBACH_DATA.products.find(p => p.id === 'ec-eci6dx'),
        source: 'ECI 6DX 內建高解析串流 DAC (Roon Ready)',
        reason: '巴洛克音響二十餘年來調音心血結晶！英國 ProAc 帶狀落地喇叭與挪威 EC 串流綜擴相得益彰，人聲厚實溫暖、高音飄逸晶瑩，是 6-12 坪居家客廳的無悔首選。',
        features: ['一部到位！整合 Roon Ready 數位串流', '下反射阻尼孔，客廳好擺位', '英國純手工製造原裝進口']
      };
    }

    this.renderResultUI(recommendation);

    // 觸發 GA4 事件
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('complete_audio_advisor', {
        space_type: space,
        budget_tier: budget,
        music_preference: genre,
        system_type: system,
        recommended_system: recommendation.title,
        match_score: recommendation.matchScore
      });
    }
  },

  renderResultUI(rec) {
    const stepsWrapper = document.getElementById('advisor-steps-wrapper');
    const resultContainer = document.getElementById('advisor-result-container');
    if (stepsWrapper) stepsWrapper.style.display = 'none';
    if (!resultContainer) return;

    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
      <div class="advisor-result-box">
        <div class="result-header">
          <div>
            <span class="section-tag" style="margin-bottom:8px; display:inline-flex;">${rec.badge}</span>
            <h3 class="font-serif" style="font-size:2rem; color:#fff; margin-top:8px;">${rec.title}</h3>
            <p style="color:var(--text-gold); font-size:1.1rem; margin-top:4px;">預估整套系統預算：${rec.budgetEst}</p>
          </div>
          <div class="result-score-gauge">
            <div class="score-number">${rec.matchScore}%</div>
            <div class="score-label">空間聲學<br>契合度評分</div>
          </div>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="color:var(--gold-light); margin-bottom: 10px; font-size:1.05rem;">🎯 巴洛克調音工程師量身建議：</h4>
          <p style="color:var(--text-secondary); line-height:1.8;">${rec.reason}</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px; margin-bottom: 30px;">
          <div style="background:rgba(255,255,255,0.04); padding:18px; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-size:0.8rem; color:var(--gold-primary); text-transform:uppercase;">建議主揚聲器</div>
            <div style="font-weight:600; color:#fff; font-size:1.05rem; margin:6px 0;">${rec.speaker ? rec.speaker.name : 'ProAc 系列落地揚聲器'}</div>
            <div style="font-size:0.85rem; color:var(--text-muted);">${rec.speaker ? rec.speaker.specs.freqResponse + ' | ' + rec.speaker.specs.sensitivity : ''}</div>
          </div>
          <div style="background:rgba(255,255,255,0.04); padding:18px; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-size:0.8rem; color:var(--gold-primary); text-transform:uppercase;">建議擴大機</div>
            <div style="font-weight:600; color:#fff; font-size:1.05rem; margin:6px 0;">${rec.amplifier ? rec.amplifier.name : 'Electrocompaniet 擴大機'}</div>
            <div style="font-size:0.85rem; color:var(--text-muted);">${rec.amplifier ? rec.amplifier.specs.powerOutput : ''}</div>
          </div>
          <div style="background:rgba(255,255,255,0.04); padding:18px; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-size:0.8rem; color:var(--gold-primary); text-transform:uppercase;">訊源與串流規劃</div>
            <div style="font-weight:600; color:#fff; font-size:1.05rem; margin:6px 0;">${typeof rec.source === 'object' ? rec.source.name : rec.source}</div>
            <div style="font-size:0.85rem; color:var(--text-muted);">支援 Roon Ready / 24-bit Hi-Res 母帶串流</div>
          </div>
        </div>

        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom: 30px;">
          ${rec.features.map(f => `<span class="tech-chip" style="background:rgba(197,168,128,0.12); color:var(--gold-light); border-color:var(--gold-border);">✓ ${f}</span>`).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; border-top:1px solid var(--border-subtle); padding-top:24px;">
          <button class="btn btn-outline btn-sm" onclick="AudioAdvisor.restart()">🔄 重新測驗其他空間</button>
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="btn btn-glass" onclick="AudioAdvisor.saveRecommendation('${rec.title}')">💾 儲存此建議書</button>
            <button class="btn btn-primary" onclick="AudioAdvisor.bookWithRecommendation('${rec.title}', '${rec.speaker ? rec.speaker.name : ''}', '${rec.amplifier ? rec.amplifier.name : ''}')">🎙️ 一鍵預約門市試聽此組合 ➔</button>
          </div>
        </div>
      </div>
    `;
  },

  restart() {
    this.goToStep(1);
    const resultContainer = document.getElementById('advisor-result-container');
    if (resultContainer) resultContainer.style.display = 'none';
    const stepsContainer = document.getElementById('advisor-steps-wrapper');
    if (stepsContainer) stepsContainer.style.display = 'block';
  },

  saveRecommendation(title) {
    if (window.MainApp) {
      MainApp.showToast('✅ 已為您儲存此搭配建議！可隨時提供巴洛克聲學顧問參考。');
    }
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('advisor_save_plan', { plan_title: title });
    }
  },

  bookWithRecommendation(title, speaker, amp) {
    if (window.MainApp) {
      MainApp.openBookingModal({
        preferredEquipment: `${speaker} + ${amp} (${title})`,
        note: '由智能選音響顧問自動帶入配對'
      });
    }
  },

  isExpanded: false,

  toggleAccordion(forceState) {
    if (typeof forceState === 'boolean') {
      this.isExpanded = forceState;
    } else {
      this.isExpanded = !this.isExpanded;
    }

    const panel = document.getElementById('advisor-expandable-panel');
    const toggleBtn = document.getElementById('advisor-toggle-expand-btn');

    if (panel) {
      if (this.isExpanded) {
        panel.style.display = 'block';
        panel.classList.add('fade-in');
        if (toggleBtn) {
          toggleBtn.textContent = '收合 4 步驟選音響 ▴';
          toggleBtn.classList.remove('btn-primary');
          toggleBtn.classList.add('btn-outline');
        }
        if (window.AnalyticsCRM) {
          AnalyticsCRM.trackEvent('open_audio_advisor');
        }
      } else {
        panel.style.display = 'none';
        if (toggleBtn) {
          toggleBtn.textContent = '開始 4 步驟選音響 ➔';
          toggleBtn.classList.remove('btn-outline');
          toggleBtn.classList.add('btn-primary');
        }
      }
    }
  },

  startFromHero() {
    this.toggleAccordion(true);
    const section = document.getElementById('advisor-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
