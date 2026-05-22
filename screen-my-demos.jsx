// screen-my-demos.jsx — 업로드한 데모곡 목록

function ScreenMyDemos({ goTo }) {
  const D = window.ARTIUM_DATA;
  const [search, setSearch] = React.useState("");
  const [lyricsOpen, setLyricsOpen] = React.useState(null);

  // My uploaded demos (first 5 from data)
  const myDemos = D.demos.slice(0, 5).map((d, i) => ({
    ...d,
    demoNum: "데모_" + String(1112 + i),
    closed: i === 1, // 데모_1113 is closed
    participants: [
      { initial:"j", color:"#5c7cff" },
      { initial:"J", color:"#2a2a2a" },
      ...(i === 0 ? [{ initial:"k", color:"#e85d3a" }] : []),
    ],
    submissions: D.submissionsFor101.slice(0, i === 0 ? 4 : 2),
  }));

  const filtered = myDemos.filter(d =>
    !search || d.demoNum.toLowerCase().includes(search.toLowerCase()) ||
    d.desc.includes(search)
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column" }}>

      {/* TOP NAV */}
      <header style={{
        position:"sticky", top:0, zIndex:50,
        background:"var(--surface)", borderBottom:"1px solid var(--border)",
        height:68, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 40px",
      }}>
        <div className="row middle" style={{ gap:10, cursor:"pointer" }} onClick={() => goTo("board")}>
          <div style={{
            width:32, height:32, borderRadius:8,
            background:"var(--text)", color:"var(--bg)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontWeight:800, fontSize:18,
          }}>A</div>
          <div className="col" style={{ lineHeight:1 }}>
            <span style={{ fontWeight:700, fontSize:15 }}>ARTIUM</span>
            <span className="mono" style={{ fontSize:9.5, color:"var(--muted)", letterSpacing:".12em", marginTop:1 }}>CONNECT-E</span>
          </div>
        </div>
        <div className="row middle" style={{ gap:10 }}>
          <div style={{
            width:38, height:38, borderRadius:"50%",
            background:"var(--elev-2)", border:"1px solid var(--border)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"var(--muted)", cursor:"pointer",
          }} onClick={() => goTo("profile")}>
            <Icon.Profile size={20}/>
          </div>
          <span style={{ fontWeight:700, fontSize:15 }}>고진영님!</span>
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ flex:1, padding:"28px 40px 64px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* 페이지 타이틀 */}
          <div className="row between middle" style={{ marginBottom:20 }}>
            <div className="col" style={{ gap:4 }}>
              <button className="btn ghost sm" style={{ alignSelf:"flex-start", color:"var(--muted)", marginBottom:4, display:"flex", alignItems:"center", gap:6 }}
                onClick={() => goTo("profile")}>
                <Icon.ChevronLeft size={14}/> 프로필
              </button>
              <h1 style={{ fontWeight:800, fontSize:28, letterSpacing:"-.02em", margin:0 }}>업로드한 데모곡</h1>
              <div className="caption" style={{ marginTop:2 }}>총 {myDemos.length}곡 업로드됨</div>
            </div>
          </div>

          {/* 검색바 */}
          <div style={{ position:"relative", marginBottom:20 }}>
            <Icon.Search size={16} style={{
              position:"absolute", left:16, top:"50%", transform:"translateY(-50%)",
              color:"var(--muted)",
            }}/>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="데모곡 검색…"
              style={{
                width:"100%", height:48, paddingLeft:44, paddingRight:16,
                border:"1px solid var(--border)", borderRadius:12,
                background:"var(--surface)", color:"var(--text)",
                fontSize:15, fontFamily:"var(--font-sans)", outline:"none",
                transition:"border-color .12s",
              }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          {/* 카드 리스트 */}
          <div className="col" style={{ gap:12 }}>
            {filtered.map(d => (
              <MyDemoCard key={d.id} demo={d} goTo={goTo}
                lyricsOpen={lyricsOpen === d.id}
                onToggleLyrics={() => setLyricsOpen(lyricsOpen === d.id ? null : d.id)}
              />
            ))}
            {filtered.length === 0 && (
              <div style={{ padding:"64px 24px", textAlign:"center", color:"var(--muted)" }}>
                <div style={{ fontWeight:600, fontSize:18, marginBottom:8 }}>검색 결과가 없어요</div>
                <div className="body-sm">다른 키워드로 검색해보세요.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyDemoCard({ demo, goTo, lyricsOpen, onToggleLyrics }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div style={{
      background:"var(--surface)", border:"1px solid " + (hovered ? "var(--border-strong)" : "var(--border)"),
      borderRadius:14, overflow:"hidden",
      boxShadow: hovered ? "var(--shadow-sm)" : "none",
      transition:"border-color .12s, box-shadow .12s",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{ padding:"22px 26px" }}>
        {/* Row 1: 제목 + 아바타 + 수정 버튼 */}
        <div className="row between middle" style={{ marginBottom:10, gap:16 }}>
          <div className="row middle" style={{ gap:12, minWidth:0, flex:1 }}>
            <h2 style={{ fontWeight:800, fontSize:20, letterSpacing:"-.018em", margin:0,
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {demo.demoNum}
            </h2>
          </div>
          <div className="row middle" style={{ gap:8, flexShrink:0 }}>
            {demo.closed ? (
              <>
                <button className="btn sm outline"
                  onClick={e => { e.stopPropagation(); goTo("lyrics-view", demo.id); }}
                  style={{ height:34 }}>
                  가사 보기
                </button>
                <span style={{
                  height:34, padding:"0 14px", display:"flex", alignItems:"center",
                  fontSize:13, fontWeight:700, color:"var(--muted-2)",
                  background:"var(--elev-2)", border:"1px solid var(--border)",
                  borderRadius:8,
                }}>마감</span>
              </>
            ) : (
              <button className="btn sm outline"
                onClick={e => { e.stopPropagation(); goTo("upload"); }}
                style={{ height:34 }}>
                수정
              </button>
            )}
          </div>
        </div>

        {/* Row 2: 설명 */}
        <p style={{
          fontSize:14, lineHeight:1.65, color:"var(--text-2)", margin:"0 0 14px",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>{demo.desc}</p>

        {/* Row 3: 해시태그 + 닉네임 + 버튼 */}
        <div className="row between middle" style={{ gap:8, flexWrap:"wrap" }}>
          {/* 해시태그 */}
          <div className="row middle" style={{ gap:4, flexWrap:"wrap", flex:1, minWidth:0 }}>
            {demo.genre.slice(0,2).map(g => (
              <span key={g} style={{ fontSize:13, fontWeight:600, color:"var(--accent)", marginRight:4 }}>
                # {g}
              </span>
            ))}
            {demo.hashtags.slice(0,2).map(h => (
              <span key={h} style={{ fontSize:13, fontWeight:600, color:"var(--text-2)", marginRight:4 }}>
                {h}
              </span>
            ))}
          </div>

          {/* 닉네임 + 버튼 */}
          <div className="row middle" style={{ gap:8, flexShrink:0 }}>
            <span style={{ fontSize:13, color:"var(--text-2)", fontWeight:500 }}>
              엔믹스 (닉네임)
            </span>
          </div>
        </div>
      </div>

      {/* 가사 보기 펼침 */}
      {lyricsOpen && (
        <div style={{ borderTop:"1px solid var(--border)", background:"var(--elev)", padding:"16px 26px" }}>
          <div className="caption" style={{ marginBottom:12 }}>
            제출된 가사 {demo.submissions.length}건
          </div>
          <div className="col" style={{ gap:8 }}>
            {demo.submissions.map((s, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:14, padding:"12px 14px",
                background:"var(--surface)", border:"1px solid var(--border)",
                borderRadius:10, cursor:"pointer",
              }} onClick={() => goTo("detail", demo.id)}>
                <div style={{
                  width:32, height:32, borderRadius:"50%", background:"var(--elev-2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:700, flexShrink:0,
                }}>{s.lyricist.name[0]}</div>
                <div className="col" style={{ gap:2, flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:13 }}>{s.lyricist.name}</div>
                  <div style={{ fontSize:12, color:"var(--muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    "{s.excerpt}"
                  </div>
                </div>
                <span style={{
                  fontSize:11, fontWeight:600, padding:"3px 8px", borderRadius:6, flexShrink:0,
                  background: s.status === "채택됨" ? "rgba(93,220,164,.14)" : "var(--elev-2)",
                  color: s.status === "채택됨" ? "var(--success)" : "var(--text-2)",
                }}>{s.status}</span>
                <Icon.ChevronRight size={14} style={{ color:"var(--muted-2)", flexShrink:0 }}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

window.ScreenMyDemos = ScreenMyDemos;
window.MyDemoCard = MyDemoCard;
