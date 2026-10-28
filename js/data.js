/**
 * 巴洛克音響 (ANSBACH ACOUSTIC) 旗艦官網核心資料集
 * 包含品牌、產品庫、生活情境、黃金搭配建議與知識庫文章
 */

const ANSBACH_DATA = {
  company: {
    name: '巴洛克音響 (巴洛克國際股份有限公司)',
    englishName: 'ANSBACH ACOUSTIC INT., LTD.',
    foundedYear: 1997,
    slogan: '一路走來始終如一，莫忘聽音樂的初衷',
    subSlogan: 'Hear the emotion, not just the music. We collect only the best!',
    healthSlogan: 'Music is good for health. 音樂是心靈最溫潤的滋養',
    phone: '02- 2516 7050',
    email: 'service@ansbach.com.tw',
    address: '台北市中山區龍江路76巷53號1樓',
    hours: '週一至週五 10:00 - 18:00 (VIP 尊榮試聽室採預約制，週末可特約排程)',
    transport: '捷運松江南京站 2 號出口步行約 5 分鐘',
    facebookUrl: 'https://www.facebook.com/pages/Music-good-for-health/1475286452760402',
    lineOfficial: '@ansbach_audio',
    showroomFeatures: [
      '頂級獨立聲學處理雙試聽室 (Room A: 16坪旗艦殿堂 / Room B: 8坪現代生活空間)',
      '德國原廠 RT60 混響時間精準校正 (0.35s 最佳人聲與管弦動態平衡)',
      '獨立專線配電與旗艦隔離電源淨化系統',
      '全系列英國 ProAc、義大利 Franco Serblin 等歐系現役機種常駐開聲'
    ]
  },

  brands: [
    {
      id: 'franco-serblin',
      name: 'Franco Serblin',
      country: '義大利 (Italy)',
      tagline: '魯特琴木藝的極致昇華 ‧ 義大利傳奇大師的終極絕響',
      description: '由義大利音響美學教父 Franco Serblin 晚年創立的私人頂峰品牌。將文藝復興時期的魯特琴與小提琴製琴工藝融入音箱結構，每只喇叭均由義大利工匠手工精雕胡桃木與真皮包覆，不僅是聲音的極致，更是傳世的藝術品。',
      founded: 2006,
      badge: '義大利手工藝術品',
      accentColor: '#d4af37',
      featuredSeries: ['Ktêma 四音路旗艦', 'Accordo 傳世書架', 'Accordo Goldberg 旗艦書架', 'Lignea'],
      signatureTech: ['弓形魯特琴聲學箱體幾何', '實心胡桃木與鋁鎂合金障板耦合結構', '純銀鍍金手工分音器接線', '無共振阻尼拉力琴弦面網'],
      image: 'assets/images/brands/franco-serblin.jpg',
      officialUrl: 'https://www.francoserblin.it/en',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '首創將義大利製琴工藝注入音箱', icon: 'temple' },
        { text: '以原木美學與樂器共鳴', icon: 'lyre' },
        { text: '凝練極致的聲音品味', icon: 'soundwave' }
      ]
    },
    {
      id: 'proac',
      name: 'ProAc',
      country: '英國 (United Kingdom)',
      tagline: '英倫聲學傳奇 ‧ 絲絨般的極致人聲與弦樂光澤',
      description: '自 1979 年由 Stewart Tyler 創立以來，ProAc 始終堅持在英國本土手工打造每一對揚聲器。以嚴苛挑選的天然實木貼皮、搭棚分音器與獨家塗布單體聞名，兼具鑑聽級的精準定位與令人動容的音樂感染力。',
      founded: 1979,
      badge: '英國原廠手工',
      accentColor: '#c5a880',
      featuredSeries: ['K Series 旗艦帶狀高音', 'Response Series 經典長青', 'Tablette 10 密閉鑑聽傳奇'],
      signatureTech: ['克維拉（Kevlar）編織低音振膜', '特製純鋁帶狀高音 (Ribbon Tweeter)', '純手工搭棚點對點分音網絡', '阻尼下低音反射孔設計'],
      image: 'assets/images/brands/proac.jpg',
      officialUrl: 'https://www.proac-loudspeakers.com',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '英國,Mr. Stewart Tyler 於1979年創立', icon: 'temple' },
        { text: '著名的箱體抑振技術', icon: 'lyre' },
        { text: '精準定位，溫潤，開闊。', icon: 'soundwave' }
      ]
    },
    {
      id: 'eam-lab',
      name: 'EAM Lab',
      country: '義大利 (Italy)',
      tagline: '義大利頂級發燒擴大機工藝',
      description: '源自義大利的高性能音響擴大機製造商，以強悍驅動力與純淨音樂重現著稱。',
      founded: null,
      badge: '義大利手工擴大機',
      accentColor: '#4a90e2',
      featuredSeries: ['Classic 302i 綜合擴大機'],
      signatureTech: ['高階重裝大電流供電架構', '純淨對稱放大電路設計'],
      image: 'assets/images/brands/eam-lab.jpg',
      officialUrl: 'https://www.eamlab.com',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '義大利, Mr.Emanuele Pizzi 創立', icon: 'temple' },
        { text: '強大電流與低阻抗驅動能力', icon: 'lyre' },
        { text: '動態磅礴，質感高雅。', icon: 'soundwave' }
      ]
    },
    {
      id: 'esprit',
      name: 'Esprit',
      country: '法國 (France)',
      tagline: '法式極致純淨手工發燒線材',
      description: '法國頂級手工發燒音響線材品牌，致力於極致導體純度與專利屏蔽技術。',
      founded: null,
      badge: '法國頂級手工線材',
      accentColor: '#dfc196',
      featuredSeries: ['Generation X 旗艦發燒線材'],
      signatureTech: ['極致導體結晶純度技術', '專利幾何抗干擾編織屏蔽'],
      image: 'assets/images/brands/esprit.jpg',
      officialUrl: 'https://www.esprit-audio.fr',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '法國, 創辦人Mr. Richard Cesari', icon: 'temple' },
        { text: '漸進式屏蔽及極化技術', icon: 'lyre' },
        { text: '系統全面提升：自然.純粹', icon: 'soundwave' }
      ]
    },
    {
      id: 'asi',
      name: 'ASI',
      country: '法國 (France)',
      tagline: '極致共振調音與聲學處理藝術',
      description: '法國聲學共振控制與音響調音專家，以獨創的聲學共振器與擴散技術聞名。',
      founded: null,
      badge: '法國聲學調音大師',
      accentColor: '#c5a880',
      featuredSeries: ['LiveLine 旗艦調音共振系列'],
      signatureTech: ['微振動動態阻尼共振控制', '貴金屬精密聲學校正調諧'],
      image: 'assets/images/brands/asi.jpg',
      officialUrl: 'https://asi-avantages.com/about/',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '法國, Mr. Franck Tchang創立', icon: 'temple' },
        { text: '以「樂器」調校空間,不扭曲', icon: 'lyre' },
        { text: '獨家微頻共振技術', icon: 'soundwave' }
      ]
    },
    {
      id: 'rockna',
      name: 'Rockna',
      country: '羅馬尼亞 (Romania)',
      tagline: '全球 R2R 梯形階梯解碼巔峰 ‧ FPGA 數類轉換藝術家',
      description: '由數位音訊界鬼才工程師 Nicolae Jitariu 創立，Rockna 專注於全自研 FPGA 演算法與離散式 R2R 階梯 DAC。拒絕使用公版解碼晶片，以獨創的數位濾波器與高精度主時鐘，還原類比母帶般的無瑕流暢度與三維音場空間感。',
      founded: 1999,
      badge: 'FPGA / R2R 數位權威',
      accentColor: '#50e3c2',
      featuredSeries: ['Wavedream Signature DAC', 'Wavedream NET 伺服轉盤'],
      signatureTech: ['獨家 RD-0 / RD-1 27-bit 梯形電阻階梯模組', '自研 16 倍線性相位高階數位濾波', '超低相位噪聲飛秒主時鐘 (Femtovox Clock)', '全隔離電源與全平衡純 A 類類比輸出級'],
      image: 'assets/images/brands/rockna.jpg',
      officialUrl: 'https://www.rockna-audio.com',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '羅馬尼亞, Mr.  Nicolae Jitariu 創立', icon: 'temple' },
        { text: '精密 R2R 架構 ×  FPGA 數位處理技術', icon: 'lyre' },
        { text: '細膩通透、自然飽滿、層次分明', icon: 'soundwave' }
      ]
    },
    {
      id: 'audiobyte',
      name: 'AudioByte',
      country: '羅馬尼亞 (Romania)',
      tagline: '前瞻數位音訊與 FPGA 架構先鋒',
      description: '專注於高解析數位訊源、網路串流轉盤與先進數位介面的歐洲創新音響品牌。',
      founded: null,
      badge: '數位串流先鋒',
      accentColor: '#4ecdc4',
      featuredSeries: ['SuperHub 串流數位中心', 'SuperHead 耳機擴大機', 'SuperVOX DAC'],
      signatureTech: ['FPGA 數位訊號處理架構', '模組化解碼串流平台'],
      image: 'assets/images/brands/audiobyte.jpg',
      officialUrl: 'https://audiobyte.net',
      buttonText: '探索品牌 →',
      highlights: [
        { text: '羅馬尼亞, Mr.  Nicolae Jitariu 創立', icon: 'temple' },
        { text: '硬體精巧化 × 高階數位處理', icon: 'lyre' },
        { text: '透明高解析，生動富彈性。', icon: 'soundwave' }
      ]
    },
    {
      id: 'atd',
      name: 'ATD',
      country: '義大利 (Italy)',
      tagline: '義大利極致聲學工程',
      description: '義大利頂級聲學工程品牌，專注於極致音質與精密揚聲器工藝。',
      founded: null,
      badge: '義大利頂級聲學',
      accentColor: '#e67e22',
      featuredSeries: ['Capriccio Continuo 系列'],
      signatureTech: ['超高解析絲質高音', '高剛性碳纖維低音振膜'],
      image: 'assets/images/brands/atd.jpg',
      officialUrl: null,
      buttonText: null,
      highlights: [
        { text: '義大利, Mr. Joseph Szall 創立.', icon: 'temple' },
        { text: '可升級「專屬低音柱」', icon: 'lyre' },
        { text: '純淨透明，空氣感自然。', icon: 'soundwave' }
      ]
    }
  ]
};

// 確保在瀏覽器環境下直接掛載至 window 全域物件
if (typeof window !== 'undefined') {
  window.ANSBACH_DATA = ANSBACH_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANSBACH_DATA;
}
