// screen-participated-demos.jsx — 참여한 데모곡

function ScreenParticipatedDemos({ goTo }) {
  const D = window.ARTIUM_DATA;
  const [search, setSearch] = React.useState("");

  const remainingCount = 3;
  const totalCount = 10;

  // 참여한 데모 목록 (가사를 제출한 데모들)
  const myDemos = D.demos.slice(2, 8).map((d, i) => ({
    ...d,
    demoNum: "데모_" + String(1112 + i),
    myStatus: ["검토중", "수정 요청", "채택됨", "검토중", "거절됨", "검토중"][i] || "검토중",
  }));

  const filtered = myDemos.filter(d =>
    !search ||
    d.demoNum.toLowerCase().includes(search.toLowerCase()) ||
    d.desc.includes(search)
  );

  const statusStyle = (status) => {
    const map = {
      "검토중":  { bg:"var(--elev-2)", color:"var(--text-2)" },
      "수정 요청": { bg:"rgba(255,194,77,.14)", color:"#c28a00" },
      "채택됨":  { bg:"rgba(93,220,164,.14)", color:"var(--success)" },
      "거절됨":  { bg:"rgba(255,84,112,.10)", color:"var(--danger)" },
    };
    return map[status] || map["검토중"];
  };

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
          <div style={{ marginBottom:20 }}>
            <button className="btn ghost sm" style={{ color:"var(--muted)", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}
              onClick={() => goTo("profile")}>
              <Icon.ChevronLeft size={14}/> 프로필
            </button>
            <h1 style={{ fontWeight:800, fontSize:28, letterSpacing:"-.02em", margin:0 }}>참여한 데모곡</h1>
          </div>

          {/* 검색바 + 남은 횟수 */}
          <div className="row middle" style={{ gap:16, marginBottom:20 }}>
            <div style={{ position:"relative", flex:1 }}>
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

            {/* 남은 횟수 카운터 */}
            <div style={{
              height:48,
              background:"var(--surface)", border:"1px solid var(--border)",
              borderRadius:12, padding:"0 20px",
              display:"flex", alignItems:"center", gap:10,
              flexShrink:0,
            }}>
              <span style={{ fontSize:13, color:"var(--muted)", fontFamily:"var(--font-mono)" }}>
                남은 횟수 / 총 보낸 개수
              </span>
              <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                <span style={{ fontWeight:800, fontSize:18, color:"var(--accent)", letterSpacing:"-.02em" }}>{remainingCount}회</span>
                <span style={{ color:"var(--muted)", fontSize:13 }}>/</span>
                <span style={{ fontWeight:700, fontSize:16, letterSpacing:"-.01em" }}>{totalCount}회</span>
              </div>
            </div>
          </div>

          {/* 카드 리스트 */}
          <div className="col" style={{ gap:12 }}>
            {filtered.length === 0 ? (
              <div style={{ padding:"64px 24px", textAlign:"center", color:"var(--muted)" }}>
                <div style={{ fontWeight:600, fontSize:18, marginBottom:8 }}>검색 결과가 없어요</div>
                <div className="body-sm">다른 키워드로 검색해보세요.</div>
              </div>
            ) : filtered.map(d => {
              const s = statusStyle(d.myStatus);
              return (
                <div key={d.id}
                  style={{
                    background:"var(--surface)", border:"1px solid var(--border)",
                    borderRadius:14, padding:"22px 26px", cursor:"pointer",
                    transition:"border-color .12s, box-shadow .12s",
                  }}
                  onClick={() => goTo("detail", d.id)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border-strong)"; e.currentTarget.style.boxShadow="var(--shadow-sm)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="none"; }}
                >
                  {/* Row 1: 제목 */}
                  <div style={{ marginBottom:10 }}>
                    <h2 style={{ fontWeight:800, fontSize:20, letterSpacing:"-.018em", margin:0,
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {d.demoNum}
                    </h2>
                  </div>

                  {/* Row 2: 설명 */}
                  <p style={{
                    fontSize:14, lineHeight:1.65, color:"var(--text-2)", margin:"0 0 14px",
                    display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
                  }}>{d.desc}</p>

                  {/* Row 3: 해시태그 + 닉네임 */}
                  <div className="row between middle" style={{ gap:8, flexWrap:"wrap" }}>
                    <div className="row middle" style={{ gap:4, flexWrap:"wrap" }}>
                      {d.genre.slice(0,2).map(g => (
                        <span key={g} style={{ fontSize:13, fontWeight:600, color:"var(--accent)", marginRight:6 }}>#{g}</span>
                      ))}
                      {d.hashtags.slice(0,2).map(h => (
                        <span key={h} style={{ fontSize:13, fontWeight:600, color:"var(--text-2)", marginRight:6 }}>{h}</span>
                      ))}
                    </div>
                    <span style={{ fontSize:13, color:"var(--text-2)", fontWeight:500, flexShrink:0 }}>
                      {d.composer.name} (닉네임)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
window.ScreenParticipatedDemos = ScreenParticipatedDemos;
