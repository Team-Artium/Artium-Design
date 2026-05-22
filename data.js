// data.js — shared mock data for ARTIUM: Connect-E
// Korean composer/lyricist marketplace prototype

window.ARTIUM_DATA = (() => {

  const GENRES = ["발라드", "K-Pop", "R&B", "힙합", "어반", "OST", "재즈", "댄스", "록", "트로트"];
  const MOODS  = ["멜랑콜리", "센슈얼", "에너제틱", "그루비", "드리미", "위로", "다이내믹", "쓸쓸함", "설렘", "도시적"];

  const composers = [
    { id:"c1", name:"강하늘",   handle:"@hanuel.k", credits:38, rating:4.9, location:"서울",  joined:"2022.04" },
    { id:"c2", name:"문지호",   handle:"@moon.studio", credits:21, rating:4.7, location:"부산", joined:"2023.01" },
    { id:"c3", name:"Yuri Han", handle:"@yurih", credits:54, rating:4.95, location:"Seoul", joined:"2021.08" },
    { id:"c4", name:"임도윤",   handle:"@dowoon.beats", credits:12, rating:4.6, location:"인천", joined:"2024.02" },
    { id:"c5", name:"S.OAK",    handle:"@s.oak", credits:33, rating:4.8, location:"성남", joined:"2022.09" },
  ];

  const lyricists = [
    { id:"l1", name:"오재희",  handle:"@oj.write", credits:62, rating:4.9, location:"서울" },
    { id:"l2", name:"이단아",  handle:"@dana.lyric", credits:24, rating:4.8, location:"대구" },
    { id:"l3", name:"PEN.A",   handle:"@pen.a", credits:88, rating:4.95, location:"Seoul" },
    { id:"l4", name:"최서윤",  handle:"@seoyoon.c", credits:15, rating:4.7, location:"수원" },
  ];

  // gradient palettes for cover art placeholders
  const covers = [
    { g1:"#3b1a5c", g2:"#ff5c2b", g3:"#ffd56b" },
    { g1:"#0a3d62", g2:"#3461ff", g3:"#a3e9ff" },
    { g1:"#222229", g2:"#5d3a1a", g3:"#deff4d" },
    { g1:"#5a1a3c", g2:"#ff4060", g3:"#ffb3c0" },
    { g1:"#1a4d3a", g2:"#5ddca4", g3:"#deff4d" },
    { g1:"#2b2b3a", g2:"#7a5cff", g3:"#ffa8e0" },
    { g1:"#4c2a1a", g2:"#e85d3a", g3:"#f4d58d" },
    { g1:"#0e0e10", g2:"#26262c", g3:"#c4b5ff" },
    { g1:"#3a2a1a", g2:"#8b5a33", g3:"#efe8d7" },
    { g1:"#1a2a4a", g2:"#3461ff", g3:"#deff4d" },
    { g1:"#400e2e", g2:"#ff4080", g3:"#ffc24d" },
    { g1:"#1a3a2a", g2:"#2a8d6b", g3:"#deff4d" },
  ];

  // ---- demos ----
  const demos = [
    {
      id:"d-101", title:"흐릿한 새벽, 너의 잔상",
      composer: composers[0],
      bpm: 78, key:"Am", duration:"3:24",
      genre:["발라드", "어반"], mood:["멜랑콜리","설렘"],
      hashtags:["#발라드", "#감성", "#새벽감성", "#여자보컬"],
      vocal:"가이드보컬 (여)", status:"공개 모집",
      submissions: 14, views: 2380, likes: 312,
      remaining:"D-4", deadline:"2025.06.18",
      desc:"새벽 4시의 정적, 카페 창에 맺힌 김처럼 모호한 감정을 담은 트랙. 화자가 헤어진 연인을 떠올리는 시점.",
      reference:["Crush — Beautiful", "백예린 — Square"],
      budget:"₩ 80~120만원",
      cover: covers[0], language:"한국어",
    },
    {
      id:"d-102", title:"NEON RIDE",
      composer: composers[2],
      bpm: 124, key:"F#m", duration:"2:58",
      genre:["K-Pop","댄스"], mood:["에너제틱","도시적"],
      hashtags:["#kpop","#girlgroup","#nightdrive","#synth"],
      vocal:"가이드보컬 (여, 3인)", status:"공개 모집",
      submissions: 41, views: 6120, likes: 894,
      remaining:"D-2", deadline:"2025.06.16",
      desc:"네온 사인이 번지는 도심을 가로지르는 드라이브. 4세대 걸그룹 타이틀곡 컨셉.",
      reference:["NewJeans — Super Shy", "aespa — Spicy"],
      budget:"₩ 200~300만원",
      cover: covers[1], language:"한국어/영어",
    },
    {
      id:"d-103", title:"백야 (White Night)",
      composer: composers[1],
      bpm: 92, key:"Dm", duration:"4:10",
      genre:["OST","발라드"], mood:["드리미","쓸쓸함"],
      hashtags:["#OST","#드라마","#남자보컬","#피아노"],
      vocal:"가이드보컬 (남)", status:"심사 중",
      submissions: 22, views: 3401, likes: 412,
      remaining:"마감",  deadline:"2025.06.08",
      desc:"드라마 사극 OST 후보. 잠들지 못한 밤, 그리움이 길어지는 정서.",
      reference:["Gummy — You Are My Everything"],
      budget:"₩ 150만원",
      cover: covers[2], language:"한국어",
    },
    {
      id:"d-104", title:"GUM",
      composer: composers[4],
      bpm: 102, key:"Bb", duration:"3:08",
      genre:["힙합","R&B"], mood:["그루비","센슈얼"],
      hashtags:["#hiphop","#groove","#trap","#남자래퍼"],
      vocal:"인스트루멘탈", status:"공개 모집",
      submissions: 7, views: 1240, likes: 178,
      remaining:"D-9", deadline:"2025.06.23",
      desc:"끈적한 808 라인 위에 라이트한 플로우가 올라가는 트랙. 솔로 남자 래퍼 기준.",
      reference:["pH-1 — iceberg"], budget:"₩ 60~100만원",
      cover: covers[3], language:"한국어/영어",
    },
    {
      id:"d-105", title:"한 발 더",
      composer: composers[3],
      bpm: 88, key:"C", duration:"3:36",
      genre:["발라드"], mood:["위로"],
      hashtags:["#위로","#밴드사운드","#발라드"],
      vocal:"가이드보컬 (남)", status:"공개 모집",
      submissions: 19, views: 2710, likes: 245,
      remaining:"D-6", deadline:"2025.06.20",
      desc:"고단한 하루를 위로하는 미드템포 밴드 발라드. 30대 직장인 페르소나.",
      reference:["10cm — 부동의 첫사랑"], budget:"₩ 80만원",
      cover: covers[4], language:"한국어",
    },
    {
      id:"d-106", title:"SOFT FOCUS",
      composer: composers[2],
      bpm: 70, key:"Em", duration:"3:50",
      genre:["R&B","어반"], mood:["드리미","센슈얼"],
      hashtags:["#rnb","#bedroom","#chill","#여자보컬"],
      vocal:"가이드보컬 (여)", status:"공개 모집",
      submissions: 28, views: 4015, likes: 521,
      remaining:"D-3", deadline:"2025.06.17",
      desc:"베드룸 R&B. 부드러운 일렉피아노와 브리지에서 폭발하는 보컬 멜로디.",
      reference:["DEAN — instagram", "Crush — Sometimes"],
      budget:"₩ 100~150만원",
      cover: covers[5], language:"한국어",
    },
    {
      id:"d-107", title:"붉은 종이",
      composer: composers[0],
      bpm: 84, key:"Gm", duration:"3:18",
      genre:["발라드","OST"], mood:["쓸쓸함","설렘"],
      hashtags:["#사극OST","#한복","#여자보컬"],
      vocal:"가이드보컬 (여)", status:"공개 모집",
      submissions: 31, views: 5290, likes: 612,
      remaining:"D-1", deadline:"2025.06.15",
      desc:"사극 드라마 OST 후보. 첫 만남의 떨림과 운명을 직감하는 순간.",
      reference:["LOCO, 화사 — 주지마"], budget:"₩ 130만원",
      cover: covers[6], language:"한국어",
    },
    {
      id:"d-108", title:"VOID",
      composer: composers[4],
      bpm: 140, key:"F#m", duration:"3:02",
      genre:["댄스","K-Pop"], mood:["다이내믹","에너제틱"],
      hashtags:["#boygroup","#hyperpop","#title"],
      vocal:"인스트루멘탈 (4인 가이드)", status:"공개 모집",
      submissions: 53, views: 7340, likes: 1102,
      remaining:"D-5", deadline:"2025.06.19",
      desc:"4세대 보이그룹 타이틀곡. 하이퍼팝 요소가 들어간 일렉트로닉 댄스.",
      reference:["TXT — Sugar Rush Ride", "Stray Kids — S-Class"],
      budget:"₩ 300만원+",
      cover: covers[7], language:"한국어/영어",
    },
    {
      id:"d-109", title:"해질녘 1번지",
      composer: composers[1],
      bpm: 96, key:"D", duration:"3:42",
      genre:["재즈","어반"], mood:["그루비","위로"],
      hashtags:["#jazz","#citypop","#남자보컬"],
      vocal:"가이드보컬 (남)", status:"공개 모집",
      submissions: 11, views: 1820, likes: 198,
      remaining:"D-8", deadline:"2025.06.22",
      desc:"시티팝 + 재즈 어반의 교차. 80년대 도쿄와 2025년 서울이 만나는 지점.",
      reference:["김현철 — 춘천 가는 기차"], budget:"₩ 90만원",
      cover: covers[8], language:"한국어",
    },
    {
      id:"d-110", title:"ICE BREAKER",
      composer: composers[2],
      bpm: 118, key:"A", duration:"2:48",
      genre:["K-Pop","댄스"], mood:["설렘","에너제틱"],
      hashtags:["#kpop","#summer","#title","#girlgroup"],
      vocal:"가이드보컬 (여, 5인)", status:"공개 모집",
      submissions: 67, views: 9120, likes: 1382,
      remaining:"D-7", deadline:"2025.06.21",
      desc:"여름 컴백 타이틀. 시원한 신스 + 댄스 비트, 첫사랑의 떨림.",
      reference:["IVE — I AM", "ITZY — Cake"],
      budget:"₩ 250~350만원",
      cover: covers[9], language:"한국어",
    },
    {
      id:"d-111", title:"잿빛 새벽",
      composer: composers[0],
      bpm: 72, key:"Bm", duration:"4:02",
      genre:["발라드","어반"], mood:["멜랑콜리","쓸쓸함"],
      hashtags:["#ballad","#piano","#남자보컬"],
      vocal:"가이드보컬 (남)", status:"공개 모집",
      submissions: 8, views: 1140, likes: 144,
      remaining:"D-12", deadline:"2025.06.26",
      desc:"피아노와 스트링만으로 시작해, 후렴에서 풀밴드로 폭발하는 정통 발라드.",
      reference:["성시경 — 너의 모든 순간"], budget:"₩ 110만원",
      cover: covers[10], language:"한국어",
    },
    {
      id:"d-112", title:"GREENROOM",
      composer: composers[3],
      bpm: 108, key:"G", duration:"3:14",
      genre:["록","어반"], mood:["다이내믹","에너제틱"],
      hashtags:["#band","#indierock","#남자보컬"],
      vocal:"가이드보컬 (남)", status:"공개 모집",
      submissions: 16, views: 2210, likes: 287,
      remaining:"D-10", deadline:"2025.06.24",
      desc:"인디 밴드 사운드. 백스테이지의 텐션과 무대 직전의 떨림을 담음.",
      reference:["새소년 — 파도"], budget:"₩ 70만원",
      cover: covers[11], language:"한국어",
    },
  ];

  // ---- lyric submissions for a single demo (used in detail screen)
  const submissionsFor101 = [
    { id:"s1", lyricist: lyricists[0], title:"흐릿한 너", excerpt:"새벽 네 시 / 잠 못 든 카페에 / 네가 앉아있던 자리만 비었네…",
      submittedAt:"2일 전", status:"검토중", file:"흐릿한 너_오재희_v2.docx", words: 268, lines: 32, rating:0 },
    { id:"s2", lyricist: lyricists[2], title:"Mirror Memory", excerpt:"창에 맺힌 김 사이로 / 네 얼굴이 번져 / I keep tracing / what I lost…",
      submittedAt:"3일 전", status:"수정 요청", file:"MirrorMemory_PENA_final.docx", words: 312, lines: 36, rating:4 },
    { id:"s3", lyricist: lyricists[1], title:"4AM", excerpt:"라이트는 졸음에 깜빡거리고 / 시계 초침만 너를 부르고 있어…",
      submittedAt:"5일 전", status:"검토중", file:"4AM_이단아_v1.docx", words: 245, lines: 28, rating:0 },
    { id:"s4", lyricist: lyricists[3], title:"잔상", excerpt:"안개처럼 흩어지는 / 너의 미소 / 손에 잡힐 듯 잡히지 않는…",
      submittedAt:"1주 전", status:"채택됨", file:"잔상_최서윤_FINAL.docx", words: 280, lines: 30, rating:5 },
  ];

  // ---- activity feed (Home)
  const activity = [
    { who:"PEN.A", action:"가사를 제출함", target:"NEON RIDE", time:"방금 전", kind:"submit" },
    { who:"강하늘", action:"새 데모 업로드", target:"잿빛 새벽", time:"12분 전", kind:"upload" },
    { who:"오재희", action:"수정 요청을 보냄", target:"흐릿한 새벽, 너의 잔상", time:"1시간 전", kind:"revision" },
    { who:"S.OAK",  action:"가사를 채택함", target:"GUM", time:"3시간 전", kind:"accept" },
    { who:"이단아", action:"즐겨찾기에 추가", target:"SOFT FOCUS", time:"5시간 전", kind:"bookmark" },
    { who:"Yuri Han", action:"마감일을 연장함", target:"ICE BREAKER", time:"어제", kind:"system" },
  ];

  // ---- charts: weekly submissions for composer dashboard
  const weekly = [
    { d:"월", v: 4 }, { d:"화", v: 7 }, { d:"수", v: 12 },
    { d:"목", v: 9 }, { d:"금", v: 14 }, { d:"토", v: 6 }, { d:"일", v: 3 },
  ];

  // ---- recommended pairings (Home)
  const recommendedLyricists = lyricists;

  return {
    GENRES, MOODS, composers, lyricists, demos,
    submissionsFor101, activity, weekly, recommendedLyricists,
  };
})();
