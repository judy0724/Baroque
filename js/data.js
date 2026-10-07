/**
 * 巴洛克音響 (ANSBACH ACOUSTIC) 旗艦官網核心資料集
 * 包含品牌、產品庫、生活情境、黃金搭配建議、知識庫文章、經銷商與保固驗證資料
 */

const ANSBACH_DATA = {
  company: {
    name: '巴洛克音響 (巴洛克國際股份有限公司)',
    englishName: 'ANSBACH ACOUSTIC INT., LTD.',
    foundedYear: 1997,
    slogan: '一路走來始終如一，莫忘聽音樂的初衷',
    subSlogan: 'Hear the emotion, not just the music. We collect only the best!',
    healthSlogan: 'Music is good for health. 音樂是心靈最溫潤的滋養',
    phone: '02-2516-7050',
    fax: '02-2516-7051',
    email: 'service@ansbach.com.tw',
    address: '台北市中山區龍江路76巷53號1樓',
    hours: '週一至週五 10:00 - 19:00 (VIP 尊榮試聽室採預約制，週末可特約排程)',
    transport: '捷運南京復興站 2 號出口步行約 5 分鐘',
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
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
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
      featuredSeries: [],
      signatureTech: [],
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
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
      featuredSeries: [],
      signatureTech: [],
      image: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=800&q=80'
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
      featuredSeries: ['SuperHub 串流數位中心'],
      signatureTech: ['FPGA 數位訊號處理架構'],
      image: 'https://images.unsplash.com/photo-1520523839898-507127054976?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
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
      featuredSeries: [],
      signatureTech: [],
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80'
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
      featuredSeries: [],
      signatureTech: [],
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    }
  ],

  products: [
    {
      id: 'proac-k10',
      brandId: 'proac',
      brandName: 'ProAc',
      name: 'K10 旗艦落地揚聲器',
      category: 'speakers',
      type: 'floorstanding',
      badge: '旗艦殿堂之作',
      priceRange: '100萬以上',
      priceNumber: 1380000,
      roomSize: '12坪以上獨立視聽室',
      specs: {
        freqResponse: '20Hz - 30kHz',
        sensitivity: '91.5 dB / 1W / 1m',
        impedance: '4 歐姆',
        powerHandling: '10 - 500 Watts 推薦驅動功率',
        drivers: '雙 8 吋克維拉 Kevlar 低音 + 雙 3 吋中音球頂 + 純鋁帶狀高音',
        dimensions: '1499 x 297 x 457 mm',
        weight: '120 kg / 單支',
        finish: '真木貼皮：黑檀木、紫檀木、胡桃木、白蠟木'
      },
      soundChar: '恢弘深遠的動態音場、極度豐富的泛音空氣感、低頻深潛且結實凝鍊',
      bestPartner: 'Electrocompaniet AW 800 M 單聲道後級',
      scenario: ['theater', 'two-channel'],
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proac-k6-sig',
      brandId: 'proac',
      brandName: 'ProAc',
      name: 'K6 Signature 簽名版落地揚聲器',
      category: 'speakers',
      type: 'floorstanding',
      badge: '發燒銘器推薦',
      priceRange: '60-120萬',
      priceNumber: 780000,
      roomSize: '8-15坪寬闊客廳 / 視聽室',
      specs: {
        freqResponse: '25Hz - 30kHz',
        sensitivity: '90 dB / 1W / 1m',
        impedance: '4 歐姆',
        powerHandling: '10 - 250 Watts',
        drivers: '雙 6.5 吋克維拉低音 + 3 吋純鈹/絲質中音 + 輕量鋁帶狀高音',
        dimensions: '1185 x 215 x 340 mm',
        weight: '44 kg / 單支',
        finish: '鳥眼楓木、尤加利木、黑檀木'
      },
      soundChar: '極為通透的帶狀高音細節、醇厚溫潤的中頻厚度，音場比例精準絕倫',
      bestPartner: 'Electrocompaniet EC 4.8 MKII + AW 250R 後級',
      scenario: ['two-channel'],
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proac-d20r',
      brandId: 'proac',
      brandName: 'ProAc',
      name: 'Response D20R 帶狀高音落地揚聲器',
      category: 'speakers',
      type: 'floorstanding',
      badge: '巴洛克熱銷榜首',
      priceRange: '25-60萬',
      priceNumber: 268000,
      roomSize: '5-10坪客廳 / 聆聽空間',
      specs: {
        freqResponse: '28Hz - 33kHz',
        sensitivity: '88.5 dB / 1W / 1m',
        impedance: '8 歐姆 (極佳親和力)',
        powerHandling: '20 - 180 Watts',
        drivers: '6.5 吋玻纖編織低音 + 60x10mm 專利後阻尼帶狀高音',
        dimensions: '960 x 190 x 227 mm',
        weight: '26 kg / 單支',
        finish: '櫻桃木、黑梣木、桃花心木、胡桃木'
      },
      soundChar: '弦樂擦弦松香味四溢、人聲甜美自然，下低音開孔擺位親和力極高',
      bestPartner: 'Electrocompaniet ECI 6DX MKII 串流綜擴',
      scenario: ['two-channel', 'streaming'],
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proac-tab10-sig',
      brandId: 'proac',
      brandName: 'ProAc',
      name: 'Tablette 10 Signature 密閉式傳奇書架箱',
      category: 'speakers',
      type: 'bookshelf',
      badge: '經典 BBC 銘器昇華',
      priceRange: '10-25萬',
      priceNumber: 118000,
      roomSize: '3-6坪書房 / 私密聆聽空間',
      specs: {
        freqResponse: '55Hz - 30kHz',
        sensitivity: '86 dB / 1W / 1m',
        impedance: '10 歐姆 (極易推動與搭配管機)',
        powerHandling: '10 - 50 Watts',
        drivers: '5 吋 Pagina Mica 塗布低音 + 1 吋絲質軟半球高音',
        dimensions: '305 x 190 x 159 mm',
        weight: '5.5 kg / 單支',
        finish: '高級真木手工外飾（玫瑰木、黑檀木限量版）'
      },
      soundChar: '密閉箱無駐波困擾，人聲形體如臨眼前，近場聆聽之絕對王者',
      bestPartner: 'Electrocompaniet ECI 80D 綜合擴大機 或 真空管機',
      scenario: ['study', 'two-channel'],
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ec-aw800m',
      brandId: 'electrocompaniet',
      brandName: 'Electrocompaniet',
      name: 'AW 800 M 旗艦單聲道/立體聲純 A 類後級',
      category: 'amplifiers',
      type: 'power-amp',
      badge: '挪威極致旗艦',
      priceRange: '100萬以上',
      priceNumber: 1250000,
      roomSize: '8-20坪專屬視聽室',
      specs: {
        powerOutput: '800W @ 8Ω (單聲道模式) / 300W x 2 @ 8Ω (立體聲模式)',
        dampingFactor: '> 1000',
        freqResponse: '0.5Hz - 220kHz',
        thd: '< 0.0006%',
        circuit: '完全平衡直接耦合，浮動變壓器技術 (FTT)',
        dimensions: '406 x 410 x 488 mm',
        weight: '55 kg',
        inputs: '平衡 XLR x 2 (支援雙後級推動 Bi-Amp)'
      },
      soundChar: '深不見底的低頻下潛控制力、天鵝絨般的純 A 類質感，毫無壓縮的動態釋放',
      bestPartner: 'ProAc K10 / Franco Serblin Ktêma',
      scenario: ['two-channel', 'theater'],
      image: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ec-eci6dx',
      brandId: 'electrocompaniet',
      brandName: 'Electrocompaniet',
      name: 'ECI 6DX MKII 旗艦全平衡高解析串流綜擴',
      category: 'amplifiers',
      type: 'integrated-amp',
      badge: '串流與推力雙冠王',
      priceRange: '25-60萬',
      priceNumber: 328000,
      roomSize: '5-12坪居家客廳 / 音樂室',
      specs: {
        powerOutput: '125W x 2 @ 8Ω / 200W x 2 @ 4Ω / 370W x 2 @ 2Ω (強悍驅動)',
        streamingSupport: 'Roon Ready, Tidal Connect, Spotify Connect, Qobuz, AirPlay 2',
        dacSpecs: '24-bit / 192kHz D/A，支援 DSD128',
        inputs: '平衡 XLR x 2, RCA x 3, 光纖 x 2, 同軸 x 2, USB DAC x 1',
        dimensions: '470 x 128 x 430 mm',
        weight: '20.5 kg',
        appControl: 'EC Play 專屬 iOS / Android 極簡 APP'
      },
      soundChar: '兼具北歐暖陽般的醇美音質與驚人瞬態推力，一部到位串連無損串流世界',
      bestPartner: 'ProAc Response D20R / Response D30RS / Tablette 10',
      scenario: ['streaming', 'two-channel'],
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fs-ktema',
      brandId: 'franco-serblin',
      brandName: 'Franco Serblin',
      name: 'Ktêma 四音路旗艦落地揚聲器',
      category: 'speakers',
      type: 'floorstanding',
      badge: '殿堂級傳世藝術品',
      priceRange: '100萬以上',
      priceNumber: 1880000,
      roomSize: '12-25坪頂級豪宅客廳 / 專屬影音殿堂',
      specs: {
        freqResponse: '26Hz - 33kHz',
        sensitivity: '92 dB / 1W / 1m',
        impedance: '4 歐姆',
        powerHandling: '最低 20W (可搭配精選管機或大功率後級)',
        drivers: '雙 9 吋金屬振膜超低音(背射壓縮號角) + 雙 4 吋定制中音 + 28mm 絲質軟半球高音',
        dimensions: '1500 x 425 x 460 mm',
        weight: '110 kg / 對',
        cabinet: '義大利天然頂級實木 + 航太鋁合金阻尼上下蓋板 + 手工皮革'
      },
      soundChar: '名琴般的松香味與空氣流動感、管弦樂龐大而毫不壓迫的層次立體度',
      bestPartner: 'Electrocompaniet AW 800 M / Rockna Wavedream',
      scenario: ['two-channel'],
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fs-accordo',
      brandId: 'franco-serblin',
      brandName: 'Franco Serblin',
      name: 'Accordo 魯特琴傳世書架型揚聲器 (含原廠腳架)',
      category: 'speakers',
      type: 'bookshelf',
      badge: '義大利美學巔峰',
      priceRange: '25-60萬',
      priceNumber: 438000,
      roomSize: '5-10坪典雅客廳 / 書齋空間',
      specs: {
        freqResponse: '40Hz - 33kHz',
        sensitivity: '87 dB / 1W / 1m',
        impedance: '4 歐姆',
        crossover: '隱藏於專用腳架內的純手工搭棚極簡分音器',
        drivers: '29mm 絲質球頂高音(Ragnar Lian設計) + 150mm 定制切片紙盆中低音',
        dimensions: '360 x 190 x 360 mm (含腳架高度 1100 mm)',
        weight: '32 kg / 對 (含原廠專利腳架)',
        cabinet: '整塊原木經多年風乾陳化精雕而成'
      },
      soundChar: '人聲如在耳畔輕語、小提琴弓弦擦拭之微動態歷歷在目、木質餘韻悠揚',
      bestPartner: 'Electrocompaniet ECI 6DX MKII / 頂級真空管機',
      scenario: ['study', 'two-channel'],
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rockna-wavedream',
      brandId: 'rockna',
      brandName: 'Rockna Audio',
      name: 'Wavedream Signature 全平衡 R2R 梯形 DAC',
      category: 'sources',
      type: 'dac',
      badge: '全球 R2R 頂尖指標',
      priceRange: '60-120萬',
      priceNumber: 680000,
      roomSize: '通用各坪數',
      specs: {
        dacType: '全離散 27-bit R2R Ladder 模組 (RD-0 Signature)',
        clocking: '獨家 Femtovox 飛秒主時鐘 (300 飛秒內部抖動極限)',
        inputs: 'I2S (HDMI) x 2, USB Audio, AES/EBU, 同軸 S/PDIF, 光纖 BNC',
        outputs: '純 A 類無負迴授 XLR 平衡與 RCA 單端',
        samplingRate: 'PCM 32-bit / 384kHz, DSD512 (Native)',
        dimensions: '440 x 360 x 90 mm',
        weight: '12 kg'
      },
      soundChar: '全無數碼生硬毛刺感，如頂級黑膠唱片般的密度與連續性，音場深邃巨大',
      bestPartner: 'Electrocompaniet 旗艦前後級 / 搭配任何頂級揚聲器',
      scenario: ['two-channel', 'streaming'],
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'cc-admonitor',
      brandId: 'capriccio-continuo',
      brandName: 'Capriccio Continuo',
      name: 'Admonitor Preference Plus 旗艦鑑聽書架',
      category: 'speakers',
      type: 'bookshelf',
      badge: '極限微動態鑑聽',
      priceRange: '25-60萬',
      priceNumber: 360000,
      roomSize: '4-8坪錄音工作室 / 精緻聆聽室',
      specs: {
        freqResponse: '39Hz - 21kHz (搭配 Submonitor 可延展至 27Hz)',
        sensitivity: '88 dB / 1W / 1m',
        impedance: '8 歐姆 (極低相位偏移)',
        drivers: '氣動褶疊鋁帶高音 + 130mm 奈米碳管混合蜂巢發泡三明治低音',
        dimensions: '350 x 185 x 280 mm',
        weight: '9.5 kg / 單支',
        finish: '鋼琴烤漆碳纖維飾面 / 實木高光'
      },
      soundChar: '極度閃電般的暫態爆發力、透明無染的超低失真、細微呼吸聲絲絲入扣',
      bestPartner: 'Electrocompaniet ECI 6DX MKII',
      scenario: ['study', 'two-channel'],
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    }
  ],

  scenarios: [
    {
      id: 'two-channel',
      title: '兩聲道純粹發燒 (Pure Stereo Hi-Fi)',
      subtitle: '直擊心靈的結像力 ‧ 宛如交響樂團與歌手親臨私人客廳',
      description: '針對追求極致音質與純粹音樂感動的愛樂鑑賞家。拋開複雜的多聲道干擾，透過巴洛克數十年精準調校的喇叭擺位與前後級搭配，重現立體三度空間的深度、寬度與歌手換氣的微小細節。',
      recommendedSystem: {
        name: '英倫經典發燒組合 (Response D20R + ECI 6DX MKII)',
        speakers: 'ProAc Response D20R 帶狀高音落地喇叭',
        amplifier: 'Electrocompaniet ECI 6DX MKII 串流綜擴',
        source: '內建高解析串流 DAC (支援 Roon / Tidal / Qobuz)',
        budget: '約 59 萬元 (含原廠專線抑振調校)',
        keyAdvantage: '兼具絲絨般的華麗弦樂光澤與北歐大電流驅動力，適合絕大多數 6-12 坪家庭客廳。'
      },
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'streaming',
      title: '現代無損數位串流 (Modern Hi-Res Streaming)',
      subtitle: '指尖輕觸 ‧ 全球百萬張 24-bit/192kHz 母帶級音樂隨選即播',
      description: '擺脫傳統繁瑣的實體 CD 收納負擔。結合 Roon Ready、Apple AirPlay 2、Tidal Connect 與 Spotify，透過手機或平板即能直覺遙控全平衡發燒解碼系統，兼具頂級音質與現代智慧生活的極致優雅。',
      recommendedSystem: {
        name: '頂級串流先鋒組合 (ECM 1 MKII + ProAc Tablette 10 Sig)',
        speakers: 'ProAc Tablette 10 Signature 密閉式傳奇書架',
        amplifier: 'Electrocompaniet ECI 6DX MKII 綜擴',
        source: 'Electrocompaniet ECM 1 MKII 平衡串流播放機',
        budget: '約 38 萬元',
        keyAdvantage: 'APP 直覺流暢操作，背景黑純無底噪，隨時享受母帶無損細膩錄音。'
      },
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'theater',
      title: '奢華居家劇院與多聲道 (Luxury Home Cinema)',
      subtitle: '震撼劇院動態與音樂會級原音重現的完美兼顧',
      description: '誰說家庭劇院不能有好音樂？巴洛克以旗艦兩聲道揚聲器作為主聲道基石，輔以精準相位校正的中置與超低音系統。看好萊塢大片時享有身歷其境的地動山搖，切換為純音樂時依然保有絲綢般的細膩情歌。',
      recommendedSystem: {
        name: '旗艦聲學劇院方案 (ProAc K6 Sig + EC 前後級系統)',
        speakers: '主聲道 ProAc K6 Signature + 專屬中置與環繞',
        amplifier: 'Electrocompaniet AW 800 M 旗艦單聲道驅動主喇叭',
        source: '高階 4K 劇院解碼處理器',
        budget: '客製化規劃 (150萬起)',
        keyAdvantage: '爆發力與人聲對白厚度兼備，真正達到「聽音樂感動流淚、看電影心跳加速」的雙重境界。'
      },
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'study',
      title: '私密書房與個人發燒 (Private Audiophile Sanctum)',
      subtitle: '一坪書齋裡的宇宙 ‧ 近場聆聽的溫潤極致',
      description: '在專屬於個人的書房或辦公室，不需要龐大的音量，而是需要即使在夜深人靜、小音量播放時依然清晰可辨的三頻平衡度與甜美人聲。密閉式書架喇叭與柔美擴大機是此空間的最佳心靈伴侶。',
      recommendedSystem: {
        name: '書房近場微動態典範 (Tablette 10 Sig + EC 串流系統)',
        speakers: 'ProAc Tablette 10 Signature 密閉書架箱',
        amplifier: 'Electrocompaniet 串流擴大機',
        source: '高解析耳擴/串流數位中心',
        budget: '約 18-25 萬元',
        keyAdvantage: '密閉式無低音反射孔，貼牆或書架擺設依然乾淨不轟鳴，人聲甜美如耳語。'
      },
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80'
    }
  ],

  synergyPairings: [
    {
      id: 'pair-1',
      name: '英倫貴族與北歐溫陽 (ProAc D20R + EC ECI 6DX MKII)',
      speakerId: 'proac-d20r',
      ampId: 'ec-eci6dx',
      matchScore: 98,
      soundSignature: '溫潤豐厚、弦樂松香四溢、低頻扎實具彈性',
      engineeringNote: 'ProAc 的帶狀高音擁有超越 30kHz 的超高頻延伸，配搭 Electrocompaniet 全平衡大電流電路，能徹底化解帶狀高音可能產生的銳利感，轉化為泛音豐富的空氣感，中頻人聲更是如沐春風。',
      recommendBudget: '約 59 萬元',
      tag: '巴洛克 25 年調音聖杯'
    },
    {
      id: 'pair-2',
      name: '天籟美聲之巔 (Franco Serblin Ktêma + EC AW 800 M)',
      speakerId: 'fs-ktema',
      ampId: 'ec-aw800m',
      matchScore: 99,
      soundSignature: '宏偉大氣、無邊無際的深邃音場、小提琴音色如泣如訴',
      engineeringNote: 'Ktêma 背射超低音在 800W 強悍推力與阻尼因數大於 1000 的緊密箝制下，釋放出極致乾淨的低頻線條，讓樂器定位猶如現場舞台般立體浮現。',
      recommendBudget: '約 310 萬元',
      tag: '頂峰殿堂旗艦示範系統'
    },
    {
      id: 'pair-3',
      name: '文人書齋純淨私享 (ProAc Tablette 10 Sig + EC 綜擴)',
      speakerId: 'proac-tab10-sig',
      ampId: 'ec-eci6dx',
      matchScore: 95,
      soundSignature: '密度極高、近場定位分明、無駐波轟鳴之虞',
      engineeringNote: 'Tablette 10 密閉箱體的 10 歐姆高阻抗特性，非常容易由全平衡擴大機激發出全頻段的緊湊彈跳感，是品味爵士樂與古典四重奏的無上聖品。',
      recommendBudget: '約 44 萬元',
      tag: '發燒近場最佳選擇'
    }
  ],

  articles: [
    {
      id: 'article-1',
      title: '【發燒調音心法】不必花大錢！掌握「三一七擺位法則」讓您的喇叭音場立體重現',
      category: '發燒入門講堂',
      readTime: '6 分鐘',
      date: '2026-08-15',
      author: '巴洛克資深聲學顧問 Alan',
      summary: '很多音響迷常抱怨系統低音轟鳴或人聲模糊，往往不是器材不好，而是空間擺位作祟。本文由巴洛克工程團隊詳解三一七法則、等邊三角形聆聽位置與第一反射點吸收之實戰秘訣。',
      tags: ['喇叭擺位', '空間調音', '新手教學'],
      fullText: '音響系統最終的表現，有超過 50% 是由空間聲學決定的。三一七法則是音響界最經典的擺位心法：將聆聽室長度劃分為七等分，喇叭擺在 2/7 與 5/7 的位置，喇叭與後牆的距離約為長度的 1/7 到 2/7。如此一來，可以避開最嚴重的低頻駐波峰谷，使音場深邃度與樂器定位立即大幅改善。巴洛克台北旗艦門市試聽室亦嚴格遵循此比例調校，歡迎親臨感受！'
    },
    {
      id: 'article-2',
      title: '【品牌傳奇故事】為什麼 Michael Jackson 錄音室指定挪威 Electrocompaniet 擴大機？',
      category: '品牌故事深度',
      readTime: '8 分鐘',
      date: '2026-07-28',
      author: '音樂歷史主筆 David',
      summary: '回溯 1970 年代，Otala 博士提出 TIM（瞬態互調失真）理論震驚音響界，Electrocompaniet 憑藉無負迴授平衡線路名震天下。連傳奇巨星流行之王的混音大師 Bruce Swedien 都稱其為不可替代的聲音奇蹟。',
      tags: ['Electrocompaniet', '錄音室秘辛', 'MichaelJackson'],
      fullText: '流行之王 Michael Jackson 傳世經典《Dangerous》與《HIStory》之所以聽起來動態磅礡、細節極度豐富且耐聽不刺耳，幕後功臣正是傳奇錄音工程師 Bruce Swedien。他在好萊塢 Westlake 錄音室中，全程使用挪威 Electrocompaniet 旗艦放大器進行鑑聽。他曾在受訪時盛讚：EC 具有全世界最溫暖自然、最貼近音樂靈魂的聲音。'
    },
    {
      id: 'article-3',
      title: '【數位音訊解密】FPGA 與 R2R 階梯解碼究竟強在哪裡？Rockna Audio 技術深度剖析',
      category: '硬體技術解析',
      readTime: '10 分鐘',
      date: '2026-06-20',
      author: '數位工程師 Ken',
      summary: '當今市售 DAC 晶片大多採用 Delta-Sigma 架構，為何最頂級的發燒玩家卻對純電阻 R2R Ladder 趨之若鶩？帶您看懂微秒時脈精準度、超低抖動與純類比流暢感的真實差異。',
      tags: ['R2R DAC', 'Rockna', '數位訊源'],
      fullText: '一般市售商用晶片透過過採樣與高頻噪聲整形來達成高解析，但往往伴隨著細微的數位生硬感。羅馬尼亞 Rockna Audio 堅持採用離散式薄膜電阻陣列（R2R Ladder），直接將二進制訊號轉換為電壓，保持最完美的波形連續性。配合自研 FPGA 演算法與飛秒主時鐘，讓數位串流具備媲美頂級黑膠唱片的綿密肉質感。'
    },
    {
      id: 'article-4',
      title: '【現代智慧家庭】從 CD 到 Roon Ready：如何無痛建構家庭 24bit/192kHz 母帶級無損串流系統？',
      category: '串流與系統整合',
      readTime: '7 分鐘',
      date: '2026-05-12',
      author: '智慧家庭整合專家 Steve',
      summary: 'Qobuz, Tidal, Apple Music 無損音樂時代來臨，發燒音響如何完美支援？完整指南教您搞懂家用 NAS 音樂庫建置、有線發燒網路交換器與 Roon Core 伺服器配置。',
      tags: ['無損串流', 'RoonReady', 'Hi-Res'],
      fullText: '進入數位串流時代，好音質不等於妥協。現代音響系統只要選用原生支援 Roon Ready 與 Tidal Connect 的前級或解碼器（如 Electrocompaniet ECI 6DX MKII），即可直接透過行動裝置播放高達 24-bit/192kHz 的母帶檔。巴洛克亦提供到府串流伺服器與發燒級網路交換器整合規劃，讓家庭成員人人都能一鍵享受極致天籟。'
    }
  ],

  dealers: [
    {
      id: 'dealer-1',
      name: '巴洛克音響 官方台北旗艦展示中心',
      region: 'taipei',
      city: '台北市',
      district: '中山區',
      address: '台北市中山區龍江路76巷53號1F',
      phone: '02-2516-7050',
      hours: '週一至週五 10:00 - 19:00 (預約制)',
      brands: ['ProAc', 'Franco Serblin', 'Rockna Audio', 'Capriccio Continuo', 'Triangle'],
      isFlagship: true,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=台北市中山區龍江路76巷53號'
    },
    {
      id: 'dealer-2',
      name: '日月音響 (Sun Moon Audio)',
      region: 'taipei',
      city: '台北市',
      district: '松山區',
      address: '台北市松山區八德路二段366巷55弄1號',
      phone: '02-2771-0918',
      hours: '週一至週六 11:00 - 20:00',
      brands: ['ProAc'],
      isFlagship: false,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=台北市松山區八德路二段366巷55弄1號'
    },
    {
      id: 'dealer-3',
      name: '品嘉音響 (Pin Chia Audio)',
      region: 'taipei',
      city: '台北市',
      district: '中正區',
      address: '台北市中正區開封街一段98號',
      phone: '02-2382-5328',
      hours: '週一至週六 11:30 - 21:00',
      brands: ['ProAc', 'Tablette 10 特約店'],
      isFlagship: false,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=台北市中正區開封街一段98號'
    },
    {
      id: 'dealer-4',
      name: '鴻運音響 (Hong Yun Audio)',
      region: 'north',
      city: '新竹市',
      district: '東區',
      address: '新竹市東區中華路二段148號',
      phone: '03-532-8255',
      hours: '週一至週六 11:00 - 20:30',
      brands: ['ProAc', 'Rockna'],
      isFlagship: false,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=新竹市東區中華路二段148號'
    },
    {
      id: 'dealer-5',
      name: '華笙音響 (Hua Sheng Audio)',
      region: 'central',
      city: '台中市',
      district: '西區',
      address: '台中市西區台灣大道二段536號',
      phone: '04-2326-8955',
      hours: '週一至週六 12:00 - 21:00',
      brands: ['ProAc', 'Franco Serblin'],
      isFlagship: false,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=台中市西區台灣大道二段536號'
    },
    {
      id: 'dealer-6',
      name: '醉音影音生活 (Zui Yin Audio)',
      region: 'south',
      city: '嘉義市',
      district: '東區',
      address: '嘉義市東區彌陀路373號',
      phone: '05-223-6522',
      hours: '週二至週日 13:00 - 21:30',
      brands: ['ProAc'],
      isFlagship: false,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=嘉義市東區彌陀路373號'
    },
    {
      id: 'dealer-7',
      name: '富豪音響 (Fu Hao High-End Audio)',
      region: 'south',
      city: '高雄市',
      district: '苓雅區',
      address: '高雄市苓雅區長明街152號',
      phone: '07-237-1234',
      hours: '週一至週六 11:00 - 20:00',
      brands: ['ProAc', 'Franco Serblin', 'Rockna'],
      isFlagship: false,
      hasAuditionRoom: true,
      mapUrl: 'https://maps.google.com/?q=高雄市苓雅區長明街152號'
    }
  ],

  validWarrantyDatabase: [
    {
      serial: 'ANS-PA-2024-8891',
      model: 'ProAc Response D20R (黑檀木限量版)',
      dealer: '巴洛克官方旗艦店',
      purchaseDate: '2024-11-20',
      warrantyEndDate: '2026-11-20 (VIP 2年原廠尊榮保固)',
      status: '有效保固中',
      ownerName: '王*明 (0912-***-456)'
    },
    {
      serial: 'ANS-EC-2024-3012',
      model: 'Electrocompaniet ECI 6DX MKII 串流綜擴',
      dealer: '日月音響',
      purchaseDate: '2024-05-10',
      warrantyEndDate: '2026-05-10 (VIP 2年原廠尊榮保固)',
      status: '有效保固中',
      ownerName: '陳*廷 (0933-***-789)'
    },
    {
      serial: 'ANS-FS-2023-1108',
      model: 'Franco Serblin Accordo (胡桃木)',
      dealer: '華笙音響',
      purchaseDate: '2023-08-15',
      warrantyEndDate: '2025-08-15',
      status: '保固期滿 (享有原廠終身付費檢修維護)',
      ownerName: '李*宏 (0921-***-112)'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANSBACH_DATA;
}
