/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 旗艦官網主控制器 (Main Application Controller)
 */

const MainApp = {
  currentProductFilter: 'all',
  showAllBrands: false,
  showAllProducts: false,
  showAllKnowledge: false,
  isSynergyExpanded: false,

  init() {
    this.initHeroBanner();
    if (window.BrandCarousel) BrandCarousel.init();
    this.renderBrands();
    this.renderProducts();
    this.renderScenarios();
    this.renderArticles();
    this.bindGlobalEvents();

    // 初始化子系統
    if (window.AudioAdvisor) AudioAdvisor.init();
    if (window.ProductComparator) ProductComparator.init();
    if (window.BookingEngine) BookingEngine.init();
    if (window.WarrantyCenter) WarrantyCenter.init();
    if (window.DealerLocator) DealerLocator.init();
    if (window.AnalyticsCRM) AnalyticsCRM.init();

    console.log('巴洛克音響 (ANSBACH ACOUSTIC) 旗艦數位門戶已成功就緒。');
  },

  bindGlobalEvents() {
    // 漢堡選單切換 (Mobile Nav)
    const navToggle = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links-menu');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });
    }

    // 支援點擊導覽列或手機底部導覽列時，平滑滾動並在目標為隱藏狀態時自動顯示
    const navigateToSection = (targetId) => {
      if (!targetId || targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const wasHidden = targetEl.style.display === 'none' || window.getComputedStyle(targetEl).display === 'none';
        if (wasHidden) {
          targetEl.style.display = 'block';
          targetEl.classList.add('fade-in');
        }
        if (targetId === 'advisor-section' && window.AudioAdvisor && !AudioAdvisor.isExpanded) {
          AudioAdvisor.toggleAccordion(true);
        }
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    // 平滑滾動與關閉手機選單 (支援 .nav-link 與 .mobile-nav-item)
    document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
      link.addEventListener('click', (e) => {
        if (navLinks) navLinks.classList.remove('mobile-open');
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          if (targetId) {
            e.preventDefault();
            document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(l => {
              if (l.getAttribute('href') === href) {
                l.classList.add('active');
              } else {
                l.classList.remove('active');
              }
            });
            navigateToSection(targetId);
          }
        }
      });
    });

    // 滾動時自動同步手機底部導覽列 active 狀態 (Scroll Spy)
    const setupScrollSpy = () => {
      const navItems = document.querySelectorAll('.mobile-nav-item');
      if (!navItems.length) return;

      const sectionMap = [
        { id: 'top', sectionId: 'hero-section' },
        { id: 'brands-section', sectionId: 'brands-section' },
        { id: 'advisor-section', sectionId: 'advisor-section' },
        { id: 'dealers-section', sectionId: 'dealers-section' },
        { id: 'warranty-section', sectionId: 'warranty-section' }
      ];

      const onScroll = () => {
        const scrollPos = window.scrollY + 140;
        let currentActive = 'top';

        for (const item of sectionMap) {
          const el = document.getElementById(item.sectionId);
          if (el && el.style.display !== 'none' && window.getComputedStyle(el).display !== 'none') {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              currentActive = item.id;
            }
          }
        }

        if (window.scrollY < 200) {
          currentActive = 'top';
        }

        navItems.forEach(item => {
          const href = item.getAttribute('href');
          const target = href ? href.substring(1) : '';
          if (target === currentActive || (currentActive === 'top' && (target === 'top' || target === 'hero-section'))) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
    };

    setupScrollSpy();

    // 產品類別篩選
    document.addEventListener('click', (e) => {
      const pill = e.target.closest('.product-filter-pill');
      if (pill) {
        pill.parentElement.querySelectorAll('.product-filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentProductFilter = pill.dataset.filter;
        this.renderProducts();

        if (window.AnalyticsCRM) {
          AnalyticsCRM.trackEvent('filter_products_category', {
            category: this.currentProductFilter
          });
        }
      }
    });


    // 模態窗背景點擊關閉
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // 電子報訂閱表單
    const newsForm = document.getElementById('newsletter-form');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newsletter-email');
        const email = input ? input.value.trim() : '';
        if (email) {
          AnalyticsCRM.addLead({
            id: 'VIP-SUB-' + Math.floor(1000 + Math.random() * 9000),
            type: '電子報 VIP 訂閱 (Newsletter)',
            name: '愛樂私享訂閱者',
            email: email,
            phone: '線上訂閱',
            createdAt: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
          });
          AnalyticsCRM.trackEvent('subscribe_newsletter', { subscriber_email: email });
          this.showToast('💌 感謝訂閱！《巴洛克聲學私享誌》創刊號已傳送至您的信箱。');
          input.value = '';
        }
      });
    }
  },

  // ==================== Hero 品牌首頁影音橫幅控制器 (M4-02 桌機 16:9 / M4-03 手機 9:16) ====================
  initHeroBanner() {
    const video = document.getElementById('hero-banner-video');
    if (!video) return;

    const desktopVideoSrc = 'assets/videos/巴洛克banner_桌機版.mp4';
    const mobileVideoSrc = 'assets/videos/巴洛克banner_手機版.mp4';
    const desktopPosterSrc = 'assets/images/hero-poster-desktop.svg';
    const mobilePosterSrc = 'assets/images/hero-poster-mobile.svg';

    // 以 JavaScript 裝置判斷選擇來源（單一 video 元素，絕不建立兩個同時下載）
    const isMobile = window.innerWidth <= 768;
    const targetSrc = isMobile ? mobileVideoSrc : desktopVideoSrc;
    const targetPoster = isMobile ? mobilePosterSrc : desktopPosterSrc;

    // 設定適配海報
    if (!video.poster || video.poster.includes('hero-poster-')) {
      video.poster = targetPoster;
    }

    // 初始載入（若目前來源與目標不符則更新，避免雙重重複下載）
    const currentSrcAttr = video.getAttribute('src') || (video.querySelector('source') ? video.querySelector('source').getAttribute('src') : '');
    if (currentSrcAttr !== targetSrc && video.dataset.loadedSrc !== targetSrc) {
      video.dataset.loadedSrc = targetSrc;
      video.src = targetSrc;
      video.load();
    } else {
      video.dataset.loadedSrc = targetSrc;
    }

    // 瀏覽器靜音自動循環播放保證
    const playVideo = (forceMuted = false) => {
      if (forceMuted) video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // 若遇瀏覽器嚴格自動播放政策攔截，監聽使用者首次互動時喚醒播放
          const resumeOnInteraction = () => {
            if (forceMuted) video.muted = true;
            video.play().catch(() => {});
            document.removeEventListener('click', resumeOnInteraction);
            document.removeEventListener('touchstart', resumeOnInteraction);
          };
          document.addEventListener('click', resumeOnInteraction, { once: true });
          document.addEventListener('touchstart', resumeOnInteraction, { once: true });
        });
      }
    };

    playVideo(true);
    this.updateHeroAudioUI(false);

    // 監聽音量與靜音狀態變更（無論手動點擊或瀏覽器政策變動，保證按鈕 UI 100% 同步）
    video.addEventListener('volumechange', () => {
      this.updateHeroAudioUI(!video.muted);
    });

    // 雙重防護：當影片 10 秒循環時維持當前靜音／原聲播放狀態
    video.addEventListener('ended', () => {
      if (!video.muted) {
        video.play().catch(() => {});
      }
    });

    // 視訊就緒時由 Canvas 動態擷取清晰影格優化 Poster（防黑屏與白屏）
    video.addEventListener('loadeddata', () => {
      try {
        if (!video.poster || video.poster.endsWith('.svg')) {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || (window.innerWidth <= 768 ? 1080 : 1920);
          canvas.height = video.videoHeight || (window.innerWidth <= 768 ? 1920 : 1080);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frameDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          if (frameDataUrl && frameDataUrl.length > 100) {
            video.poster = frameDataUrl;
          }
        }
      } catch (err) {
        // 若受環境限制則保留靜態 svg poster
      }
    }, { once: true });

    // 視窗調整大小監聽 (防抖 250ms，自動切換 16:9 桌機與 9:16 手機素材，並保持目前聲音狀態)
    let bannerResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(bannerResizeTimer);
      bannerResizeTimer = setTimeout(() => {
        const checkMobile = window.innerWidth <= 768;
        const newSrc = checkMobile ? mobileVideoSrc : desktopVideoSrc;
        const newPoster = checkMobile ? mobilePosterSrc : desktopPosterSrc;

        if (video.dataset.loadedSrc !== newSrc) {
          const currentMuted = video.muted;
          video.dataset.loadedSrc = newSrc;
          video.poster = newPoster;
          video.src = newSrc;
          video.muted = currentMuted;
          video.load();
          playVideo(currentMuted);
          MainApp.updateHeroAudioUI(!currentMuted);
        }
      }, 250);
    });
  },

  // ==================== M4-04 Hero Banner 原聲開關切換 ====================
  toggleHeroAudio() {
    const video = document.getElementById('hero-banner-video');
    if (!video) return;

    // 若目前為靜音狀態 -> 點擊切換為播放原聲
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.updateHeroAudioUI(true);
        }).catch((err) => {
          console.warn('瀏覽器自動播放音訊政策攔截，重設為靜音以備下次點擊：', err);
          video.muted = true;
          this.updateHeroAudioUI(false);
          const label = document.getElementById('hero-sound-label');
          if (label) label.textContent = '點擊重試';
        });
      } else {
        this.updateHeroAudioUI(true);
      }
    } else {
      // 若目前已開啟原聲 -> 點擊恢復靜音 (影片不中斷)
      video.muted = true;
      this.updateHeroAudioUI(false);
    }
  },

  updateHeroAudioUI(isPlayingAudio) {
    const toggleBtn = document.getElementById('hero-sound-toggle');
    if (!toggleBtn) return;

    const mutedIcon = toggleBtn.querySelector('.sound-icon-muted');
    const activeIcon = toggleBtn.querySelector('.sound-icon-active');
    const label = document.getElementById('hero-sound-label');

    if (isPlayingAudio) {
      toggleBtn.classList.add('is-playing');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.setAttribute('aria-label', '靜音影片 (目前原聲播放中)');
      toggleBtn.setAttribute('title', '點擊靜音影片');
      if (mutedIcon) mutedIcon.style.display = 'none';
      if (activeIcon) activeIcon.style.display = 'block';
      if (label) label.textContent = '原聲播放中';
    } else {
      toggleBtn.classList.remove('is-playing');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('aria-label', '開啟影片原聲 (目前為靜音)');
      toggleBtn.setAttribute('title', '點擊開啟影片原聲');
      if (mutedIcon) mutedIcon.style.display = 'block';
      if (activeIcon) activeIcon.style.display = 'none';
      if (label) label.textContent = '開啟原聲';
    }
  },

  renderBrands() {
    const container = document.getElementById('brands-grid-container');
    const toggleBtn = document.getElementById('btn-toggle-brands');
    if (!container) return;

    let items = ANSBACH_DATA.brands;
    if (!this.showAllBrands) {
      items = items.slice(0, 3);
    }

    container.innerHTML = items.map(b => `
      <div class="brand-card fade-in">
        <div class="brand-card-img-wrapper">
          <img src="${b.image}" alt="${b.name}" class="brand-card-img" loading="lazy">
          <div class="brand-card-overlay"></div>
          <span class="brand-card-badge">${b.badge}</span>
        </div>
        <div class="brand-card-body">
          <div class="brand-country">📍 ${b.country} ‧ 創立於 ${b.founded}</div>
          <h3 class="brand-name">${b.name}</h3>
          <div class="brand-tagline">${b.tagline}</div>
          <p class="brand-desc">${b.description}</p>
          
          <div class="brand-tech-chips">
            ${b.signatureTech.slice(0, 3).map(tech => `<span class="tech-chip">${tech}</span>`).join('')}
          </div>

          <div class="brand-card-footer">
            <button class="btn btn-outline btn-sm" onclick="MainApp.openBrandDetailModal('${b.id}')">
              深入品牌殿堂 ➔
            </button>
            <button class="btn btn-glass btn-sm" onclick="MainApp.filterByBrand('${b.id}')">
              檢視產品系列
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (toggleBtn) {
      toggleBtn.textContent = this.showAllBrands ? '收合品牌列表 ▴' : '查看全部品牌 (共 6 個品牌) ▾';
    }
  },

  toggleAllBrands() {
    this.showAllBrands = !this.showAllBrands;
    this.renderBrands();
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('toggle_brands_view', { show_all: this.showAllBrands });
    }
  },

  renderProducts() {
    const container = document.getElementById('products-grid-container');
    const toggleBtn = document.getElementById('btn-toggle-products');
    const toggleBar = document.getElementById('products-toggle-bar');
    if (!container) return;

    let items = ANSBACH_DATA.products;
    if (this.currentProductFilter !== 'all') {
      items = items.filter(p => p.category === this.currentProductFilter || p.brandId === this.currentProductFilter);
      if (toggleBar) toggleBar.style.display = 'none';
    } else {
      if (toggleBar) toggleBar.style.display = 'flex';
      if (!this.showAllProducts) {
        items = items.slice(0, 6);
      }
    }

    container.innerHTML = items.map(p => {
      const isCompared = ProductComparator.selectedIds.includes(p.id);
      return `
        <div class="product-card fade-in">
          <div class="product-thumb">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <span class="brand-card-badge" style="top:12px; right:12px;">${p.badge}</span>
          </div>
          <div class="product-body">
            <div class="product-brand">${p.brandName} ‧ ${p.roomSize}</div>
            <h4 class="product-name">${p.name}</h4>
            <div class="product-price-badge">建議售價級距：${p.priceRange}</div>
            <div class="product-sound-char">${p.soundChar}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:16px;">
              <strong>最佳拍檔：</strong>${p.bestPartner}
            </div>

            <div class="product-actions">
              <button class="btn btn-outline btn-sm btn-toggle-compare ${isCompared ? 'active' : ''}" data-product-id="${p.id}" style="flex:1;">
                ${isCompared ? '✓ 已加入比較' : '⚖️ 加入比較'}
              </button>
              <button class="btn btn-primary btn-sm" onclick="MainApp.openBookingModal({ preferredEquipment: '${p.brandName} ${p.name}' })">
                預約試聽
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (toggleBtn) {
      const totalCount = ANSBACH_DATA.products.length;
      toggleBtn.textContent = this.showAllProducts ? '收合產品列表 ▴' : `查看全部產品 (共 ${totalCount} 款) ▾`;
    }
  },

  toggleAllProducts() {
    this.showAllProducts = !this.showAllProducts;
    this.renderProducts();
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('toggle_products_view', { show_all: this.showAllProducts });
    }
  },

  toggleSynergy() {
    this.isSynergyExpanded = !this.isSynergyExpanded;
    const wrapper = document.getElementById('synergy-cards-wrapper');
    const btn = document.getElementById('btn-toggle-synergy');
    if (wrapper) {
      wrapper.style.display = this.isSynergyExpanded ? 'block' : 'none';
      if (this.isSynergyExpanded) wrapper.classList.add('fade-in');
    }
    if (btn) {
      btn.textContent = this.isSynergyExpanded ? '收合推薦組合 ▴' : '展開推薦組合 ▾';
    }
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('toggle_synergy_view', { expanded: this.isSynergyExpanded });
    }
  },

  filterByBrand(brandId) {
    const section = document.getElementById('products-section');
    if (section) {
      if (section.style.display === 'none' || window.getComputedStyle(section).display === 'none') {
        section.style.display = 'block';
        section.classList.add('fade-in');
      }
      section.scrollIntoView({ behavior: 'smooth' });
    }
    this.currentProductFilter = brandId;
    this.renderProducts();
    this.showToast(`已過濾顯示 ${brandId.toUpperCase()} 經典型號`);
  },

  renderScenarios() {
    const container = document.getElementById('scenario-display-container') || document.querySelector('.scenarios-grid');
    if (!container) return;

    container.innerHTML = ANSBACH_DATA.scenarios.map(s => {
      const cleanTitle = s.title.split(' (')[0];
      const cleanTagName = s.recommendedSystem.name.split(' (')[0];
      return `
        <div class="scenario-card fade-in">
          <div class="scenario-card-thumb">
            <img src="${s.image}" alt="${cleanTitle}" loading="lazy">
            <span class="scenario-card-tag">${cleanTagName}</span>
          </div>
          <div class="scenario-card-body">
            <h3 class="scenario-card-title">${cleanTitle}</h3>
            <div class="scenario-card-sub">${s.subtitle}</div>
            <p class="scenario-card-desc">${s.description}</p>
            <div class="scenario-card-system">
              <div><strong>揚聲器：</strong>${s.recommendedSystem.speakers}</div>
              <div><strong>擴大機：</strong>${s.recommendedSystem.amplifier}</div>
            </div>
            <div class="scenario-card-actions">
              <button class="btn btn-primary btn-sm" onclick="MainApp.openBookingModal({ preferredEquipment: '${s.recommendedSystem.name}' })" style="width:100%;">
                預約試聽此情境 ➔
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderArticles() {
    const container = document.getElementById('articles-grid-container');
    const toggleBtn = document.getElementById('knowledge-toggle');
    if (!container) return;

    let items = ANSBACH_DATA.articles;
    if (!this.showAllKnowledge) {
      items = items.slice(0, 3);
    }

    container.innerHTML = items.map(art => `
      <div class="brand-card" style="cursor:pointer;" onclick="MainApp.openArticleModal('${art.id}')">
        <div class="brand-card-body">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span class="tech-chip" style="color:var(--gold-light); border-color:var(--gold-border);">${art.category}</span>
            <span style="font-size:0.8rem; color:var(--text-muted);">${art.readTime} ‧ ${art.date}</span>
          </div>
          <h4 class="font-serif" style="font-size:1.35rem; color:#fff; margin-bottom:14px; line-height:1.4;">${art.title}</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.7; margin-bottom:20px;">${art.summary}</p>
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:16px; border-top:1px solid var(--border-subtle);">
            <span style="font-size:0.85rem; color:var(--text-gold);">文 / ${art.author}</span>
            <span style="color:var(--gold-light); font-weight:600; font-size:0.9rem;">閱讀全文 ➔</span>
          </div>
        </div>
      </div>
    `).join('');

    if (toggleBtn) {
      toggleBtn.textContent = this.showAllKnowledge ? '收合更多 ▴' : '查看更多 ▾';
    }
  },

  toggleAllKnowledge() {
    this.showAllKnowledge = !this.showAllKnowledge;
    this.renderArticles();
    if (window.AnalyticsCRM) {
      AnalyticsCRM.trackEvent('toggle_knowledge_view', { show_all: this.showAllKnowledge });
    }
  },

  openArticleModal(artId) {
    const art = ANSBACH_DATA.articles.find(a => a.id === artId);
    if (!art) return;

    const modal = document.getElementById('article-modal');
    const title = document.getElementById('article-modal-title');
    const meta = document.getElementById('article-modal-meta');
    const body = document.getElementById('article-modal-body');

    if (title) title.textContent = art.title;
    if (meta) meta.textContent = `${art.category} ‧ 文 / ${art.author} ‧ 發表於 ${art.date} (閱讀時間約 ${art.readTime})`;
    if (body) {
      body.innerHTML = `
        <p style="font-size:1.15rem; color:var(--gold-light); line-height:1.8; margin-bottom:24px; font-weight:500;">
          ${art.summary}
        </p>
        <div style="font-size:1rem; color:var(--text-secondary); line-height:1.9;">
          ${art.fullText}
        </div>
        <div style="margin-top:30px; padding:20px; background:var(--bg-tertiary); border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <div style="color:var(--gold-primary); font-weight:600; margin-bottom:6px;">想要在自己家中重現最佳音質嗎？</div>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:14px;">
            巴洛克資深聲學工程師提供全台專案到府丈量與台北龍江路尊榮試聽室親身體驗服務。
          </p>
          <button class="btn btn-primary btn-sm" onclick="MainApp.closeModal('article-modal'); MainApp.openBookingModal({ note: '來自文章諮詢：' + '${art.title}' })">
            立即預約試聽諮詢 ➔
          </button>
        </div>
      `;
    }

    this.openModal('article-modal');
    AnalyticsCRM.trackEvent('read_article', { article_id: art.id, article_title: art.title });
  },

  openBrandDetailModal(brandId) {
    const b = ANSBACH_DATA.brands.find(item => item.id === brandId);
    if (!b) return;

    const modal = document.getElementById('brand-detail-modal');
    const body = document.getElementById('brand-detail-modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="position:relative; height:260px; border-radius:var(--radius-md); overflow:hidden; margin-bottom:24px;">
        <img src="${b.image}" alt="${b.name}" style="width:100%; height:100%; object-fit:cover;">
        <div style="position:absolute; bottom:0; left:0; width:100%; padding:24px; background:linear-gradient(to top, rgba(0,0,0,0.9), transparent);">
          <span class="section-tag" style="margin-bottom:6px;">${b.badge}</span>
          <h2 class="font-serif" style="font-size:2.4rem; color:#fff;">${b.name}</h2>
          <div style="color:var(--gold-light); font-size:1.05rem;">${b.tagline}</div>
        </div>
      </div>

      <div style="margin-bottom:24px;">
        <h4 style="color:var(--gold-primary); margin-bottom:8px;">品牌傳奇與哲學 (Brand Heritage)</h4>
        <p style="color:var(--text-secondary); line-height:1.8;">${b.description}</p>
      </div>

      <div style="margin-bottom:24px;">
        <h4 style="color:var(--gold-primary); margin-bottom:8px;">原廠獨家聲學專利技術</h4>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${b.signatureTech.map(t => `<span class="tech-chip" style="background:rgba(197,168,128,0.1); color:var(--gold-light); border-color:var(--gold-border);">✓ ${t}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom:30px;">
        <h4 style="color:var(--gold-primary); margin-bottom:8px;">巴洛克常駐開聲系列</h4>
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
          ${b.featuredSeries.map(s => `<span class="tech-chip">${s}</span>`).join('')}
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:14px; border-top:1px solid var(--border-subtle); padding-top:20px;">
        <button class="btn btn-outline" onclick="MainApp.closeModal('brand-detail-modal'); MainApp.filterByBrand('${b.id}')">
          檢視本品牌所有在售型號
        </button>
        <button class="btn btn-primary" onclick="MainApp.closeModal('brand-detail-modal'); MainApp.openBookingModal({ preferredEquipment: '${b.name} 旗艦系列' })">
          預約門市鑑賞 ➔
        </button>
      </div>
    `;

    this.openModal('brand-detail-modal');
    AnalyticsCRM.trackEvent('view_brand_detail', { brand_name: b.name });
  },

  openBookingModal(prefillData = {}) {
    const modal = document.getElementById('audition-modal');
    if (!modal) return;

    if (prefillData.preferredEquipment) {
      const input = document.getElementById('audition-preferred-equip');
      if (input) input.value = prefillData.preferredEquipment;
    }

    if (prefillData.note) {
      const noteInput = document.getElementById('audition-note');
      if (noteInput && !noteInput.value) noteInput.value = prefillData.note;
    }

    this.openModal('audition-modal');
  },

  openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
      m.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
      m.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="color:var(--gold-light); font-size:1.1rem;">🔔</div>
      <div style="font-size:0.9rem; font-weight:500;">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  playAcousticDemoTone() {
    // 使用 Web Audio API 播放巴洛克優雅溫潤的調音參考音（純類比柔和 432Hz 諧波音）
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime); // 自然和諧之音 432Hz

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);

      this.showToast('🎵 正在播放 432Hz 自然聲學和諧參考音（巴洛克暖音哲學）');
      AnalyticsCRM.trackEvent('play_audio_demo_tone');
    } catch (e) {
      console.log('AudioContext preview not allowed before user gesture');
    }
  }
};

// 頁面載入完成後啟動
document.addEventListener('DOMContentLoaded', () => {
  MainApp.init();
});
