// screen-board.jsx — 메인 게시판 (와이어프레임 기준 재설계)

function ScreenBoard({ goTo }) {
  const D = window.ARTIUM_DATA;
  const [genreOpen, setGenreOpen] = React.useState(false);
  const [hashOpen, setHashOpen] = React.useState(false);
  const [selGenres, setSelGenres] = React.useState([]);
  const [selMoods, setSelMoods] = React.useState([]);
  const [selHash, setSelHash] = React.useState([]);

  const allHashtags = [...new Set(D.demos.flatMap(d => d.hashtags.map(h => h.replace("#",""))))];

  let demos = D.demos.slice();
  if (selGenres.length) demos = demos.filter(d => selGenres.some(g => d.genre.includes(g)));
  if (selMoods.length)  demos = demos.filter(d => selMoods.some(m => d.mood.includes(m)));
  if (selHash.length)   demos = demos.filter(d => selHash.some(h => d.hashtags.includes("#"+h)));

  const toggleArr = (arr, set, v) =>
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const activeFilters = selGenres.length + selMoods.length + selHash.length;

  React.useEffect(() => {
    if (!genreOpen && !hashOpen) return;
    const close = (e) => { setGenreOpen(false); setHashOpen(false); };
    setTimeout(() => window.addEventListener("click", close), 0);
    return () => window.removeEventListener("click", close);
  }, [genreOpen, hashOpen]);

  return (
    React.createElement("div", { style:{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column" } },

      // TOP NAV
      React.createElement("header", { style:{
        position:"sticky", top:0, zIndex:50,
        background:"var(--surface)", borderBottom:"1px solid var(--border)",
        height:68, display:"flex", alignItems:"center",
        padding:"0 40px", gap:24,
      }},
        // Logo
        React.createElement("div", { className:"row middle", style:{ gap:10 }},
          React.createElement("div", { style:{
            width:32, height:32, borderRadius:8,
            background:"var(--text)", color:"var(--bg)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontWeight:800, fontSize:18,
          }}, "A"),
          React.createElement("div", { className:"col", style:{ lineHeight:1 }},
            React.createElement("span", { style:{ fontWeight:700, fontSize:15 }}, "ARTIUM"),
            React.createElement("span", { className:"mono", style:{ fontSize:9.5, color:"var(--muted)", letterSpacing:".12em", marginTop:1 }}, "CONNECT-E")
          )
        ),
        React.createElement("div", { style:{ flex:1 }}),
        // User
        React.createElement("div", { className:"row middle", style:{ gap:10 }},
          React.createElement("div", {
            onClick:() => goTo("profile"),
            style:{
              width:38, height:38, borderRadius:"50%",
              background:"var(--elev-2)", border:"1px solid var(--border)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"var(--muted)", cursor:"pointer",
            }
          }, React.createElement(Icon.Profile, { size:20 })),
          React.createElement("span", { style:{ fontWeight:700, fontSize:15 }}, "고진영님!"),
        )
      ),

      // FILTER BAR
      React.createElement("div", {
        style:{ padding:"12px 40px", background:"var(--surface)", borderBottom:"1px solid var(--border)", position:"relative" },
        onClick: e => e.stopPropagation(),
      },
        React.createElement("div", { className:"row", style:{ gap:10 }},
          // 필터링
          React.createElement("button", {
            onClick:() => { setGenreOpen(!genreOpen); setHashOpen(false); },
            style:{
              height:40, padding:"0 18px", borderRadius:8,
              border:"1.5px solid " + ((genreOpen||selGenres.length||selMoods.length) ? "var(--accent)" : "var(--border-strong)"),
              background:(genreOpen||selGenres.length||selMoods.length) ? "var(--accent-soft)" : "var(--surface)",
              color:(genreOpen||selGenres.length||selMoods.length) ? "var(--accent)" : "var(--text-2)",
              fontFamily:"var(--font-sans)", fontSize:14, fontWeight:500, cursor:"pointer",
              display:"flex", alignItems:"center", gap:8,
            }
          },
            React.createElement(Icon.Filter, { size:13 }),
            "필터링 (장르, 악기)",
            (selGenres.length+selMoods.length) > 0 && React.createElement("span", { style:{
              background:"var(--accent)", color:"var(--accent-ink)", borderRadius:"50%",
              width:18, height:18, fontSize:10, fontWeight:700,
              display:"inline-flex", alignItems:"center", justifyContent:"center",
            }}, selGenres.length+selMoods.length)
          ),
          // 해시태그
          React.createElement("button", {
            onClick:() => { setHashOpen(!hashOpen); setGenreOpen(false); },
            style:{
              height:40, padding:"0 18px", borderRadius:8,
              border:"1.5px solid " + ((hashOpen||selHash.length) ? "var(--accent)" : "var(--border-strong)"),
              background:(hashOpen||selHash.length) ? "var(--accent-soft)" : "var(--surface)",
              color:(hashOpen||selHash.length) ? "var(--accent)" : "var(--text-2)",
              fontFamily:"var(--font-sans)", fontSize:14, fontWeight:500, cursor:"pointer",
              display:"flex", alignItems:"center", gap:8,
            }
          },
            React.createElement("span", { style:{ fontWeight:700, fontSize:15 }}, "#"),
            "해시태그 (#단어)",
            selHash.length > 0 && React.createElement("span", { style:{
              background:"var(--accent)", color:"var(--accent-ink)", borderRadius:"50%",
              width:18, height:18, fontSize:10, fontWeight:700,
              display:"inline-flex", alignItems:"center", justifyContent:"center",
            }}, selHash.length)
          ),
          React.createElement("div", { style:{ flex:1 }}),
          // Upload button
          React.createElement("button", {
            className:"btn primary",
            style:{ height:40, paddingInline:22, borderRadius:8, fontWeight:600 },
            onClick:() => goTo("upload"),
          }, React.createElement(Icon.Upload, {size:14}), " 데모곡 올리기"),
          
          activeFilters > 0 && React.createElement("button", {
            className:"btn sm ghost", style:{ color:"var(--muted)" },
            onClick:() => { setSelGenres([]); setSelMoods([]); setSelHash([]); }
          }, React.createElement(Icon.X,{size:12}), " 초기화")
        ),

        // 장르 드롭다운
        genreOpen && React.createElement("div", {
          style:{
            position:"absolute", top:"calc(100% + 6px)", left:40, zIndex:200,
            background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:14, padding:22, boxShadow:"var(--shadow-lg)", minWidth:500,
          }
        },
          React.createElement("div", { className:"col", style:{ gap:14 }},
            React.createElement("div", { className:"eyebrow" }, "장르"),
            React.createElement("div", { className:"row", style:{ gap:8, flexWrap:"wrap" }},
              ...D.GENRES.map(g => React.createElement("button", {
                key:g, className:"chip " + (selGenres.includes(g)?"filter-active":""),
                onClick:() => toggleArr(selGenres, setSelGenres, g)
              }, g))
            ),
            React.createElement("div", { className:"eyebrow", style:{ marginTop:4 }}, "무드"),
            React.createElement("div", { className:"row", style:{ gap:8, flexWrap:"wrap" }},
              ...D.MOODS.map(m => React.createElement("button", {
                key:m, className:"chip " + (selMoods.includes(m)?"filter-active":""),
                onClick:() => toggleArr(selMoods, setSelMoods, m)
              }, m))
            ),
            React.createElement("div", { className:"row", style:{ gap:8, justifyContent:"flex-end", paddingTop:4 }},
              React.createElement("button", { className:"btn sm outline", onClick:()=>{ setSelGenres([]); setSelMoods([]); }}, "초기화"),
              React.createElement("button", { className:"btn sm primary", onClick:()=>setGenreOpen(false)}, "적용")
            )
          )
        ),

        // 해시태그 드롭다운
        hashOpen && React.createElement("div", {
          style:{
            position:"absolute", top:"calc(100% + 6px)", left:40, zIndex:200,
            background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:14, padding:22, boxShadow:"var(--shadow-lg)", minWidth:520,
          }
        },
          React.createElement("div", { className:"col", style:{ gap:14 }},
            React.createElement("div", { className:"eyebrow" }, "해시태그"),
            React.createElement("div", { className:"row", style:{ gap:8, flexWrap:"wrap" }},
              ...allHashtags.map(h => React.createElement("button", {
                key:h, className:"chip " + (selHash.includes(h)?"filter-active":""),
                onClick:() => toggleArr(selHash, setSelHash, h)
              }, "#"+h))
            ),
            React.createElement("div", { className:"row", style:{ gap:8, justifyContent:"flex-end", paddingTop:4 }},
              React.createElement("button", { className:"btn sm outline", onClick:()=>setSelHash([])}, "초기화"),
              React.createElement("button", { className:"btn sm primary", onClick:()=>setHashOpen(false)}, "적용")
            )
          )
        )
      ),

      // DEMO LIST
      React.createElement("div", { style:{ flex:1, padding:"24px 40px" }},
        React.createElement("div", { style:{ maxWidth:860, margin:"0 auto" }},
          React.createElement("div", { className:"caption", style:{ marginBottom:14, color:"var(--muted)" }},
            "총 " + demos.length + "곡",
            activeFilters > 0 && React.createElement("span", { style:{ color:"var(--accent)", marginLeft:6, fontWeight:600 }}, "· 필터 적용 중")
          ),
          demos.length === 0
            ? React.createElement("div", { style:{ padding:"80px 24px", textAlign:"center", color:"var(--muted)" }},
                React.createElement("div", { className:"h-2", style:{ marginBottom:8 }}, "조건에 맞는 데모가 없어요"),
                React.createElement("div", { className:"body-sm" }, "필터를 조정해보세요.")
              )
            : React.createElement("div", { className:"col", style:{ gap:12 }},
                ...demos.map((d,i) => React.createElement(DemoBoardCard, { key:d.id, demo:d, index:i, onClick:()=>goTo("detail", d.id) }))
              )
        )
      )
    )
  );
}

function DemoBoardCard({ demo, index, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return React.createElement("div", {
    style:{
      background:"var(--surface)", border:"1px solid " + (hovered ? "var(--border-strong)" : "var(--border)"),
      borderRadius:14, padding:"22px 26px", cursor:"pointer",
      boxShadow: hovered ? "var(--shadow-sm)" : "none",
      transition:"border-color .12s, box-shadow .12s",
    },
    onMouseEnter:() => setHovered(true),
    onMouseLeave:() => setHovered(false),
    onClick,
  },
    // Row 1: 제목 + 상태 + 버튼
    React.createElement("div", { className:"row between middle", style:{ marginBottom:10, gap:16 }},
      React.createElement("div", { className:"row middle", style:{ gap:12, minWidth:0, flex:1 }},
        React.createElement("h2", { style:{
          fontWeight:800, fontSize:20, letterSpacing:"-.018em", margin:0,
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        }}, "데모곡" + String((index||0)+1).padStart(4,"0")),


      ),
      React.createElement("div", { className:"row middle", style:{ gap:8, flexShrink:0 }},

        React.createElement("button", {
          className:"btn outline",
          onClick:e => { e.stopPropagation(); onClick(); },
          style:{ height:36, paddingInline:22, borderRadius:8, fontWeight:600 }
        }, "참여")
      )
    ),
    // Row 2: 설명
    React.createElement("p", {
      style:{
        fontSize:14, lineHeight:1.65, color:"var(--text-2)", margin:"0 0 14px",
        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
      }
    }, demo.desc),

    // Row 3: 해시태그 + 메타 + 닉네임
    React.createElement("div", { className:"row between middle", style:{ gap:8, flexWrap:"wrap" }},
      React.createElement("div", { className:"row middle", style:{ gap:4, flexWrap:"wrap" }},
        ...demo.hashtags.slice(0,6).map((h,i) =>
          React.createElement("span", {
            key:h,
            style:{ fontSize:13, fontWeight:600, color:i<2?"var(--accent)":"var(--text-2)", marginRight:6, cursor:"pointer" },
            onClick:e => e.stopPropagation()
          }, h)
        )
      ),
      React.createElement("div", { className:"row middle", style:{ gap:16 }},

        React.createElement("span", { style:{ fontSize:13, color:"var(--text-2)", fontWeight:500 }},
          demo.composer.name + " (닉네임)")
      )
    )
  );
}

window.ScreenBoard = ScreenBoard;
window.DemoBoardCard = DemoBoardCard;
