// screen-lyrics-view.jsx — 받은 가사 보기 (작곡가용)

function ScreenLyricsView({ demoId, goTo }) {
  const D = window.ARTIUM_DATA;
  const demoIdx = D.demos.findIndex(d => d.id === demoId);
  const demoNum = "데모_" + String((demoIdx >= 0 ? demoIdx : 0) + 1112);

  const submissions = [
    { file:"흐릿한새벽_오재희_2026.05.16.docx", size:"32KB" },
    { file:"데모_1112_PEN.A_2026.05.14.docx",  size:"28KB" },
    { file:"데모_1112_이단아_2026.05.13.docx",  size:"41KB" },
    { file:"데모_1112_최서윤_2026.05.12.docx",  size:"36KB" },
    { file:"데모_1112_김민준_2026.05.11.docx",  size:"29KB" },
    { file:"데모_1112_박지수_2026.05.10.docx",  size:"33KB" },
    { file:"데모_1112_이수현_2026.05.09.docx",  size:"27KB" },
    { file:"데모_1112_정다은_2026.05.08.docx",  size:"44KB" },
    { file:"데모_1112_한소라_2026.05.07.docx",  size:"31KB" },
    { file:"데모_1112_유민호_2026.05.06.docx",  size:"38KB" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column" }}>

      {/* TOP NAV */}
      <header style={{
        position:"sticky", top:0, zIndex:50,
        background:"var(--surface)", borderBottom:"1px solid var(--border)",
        height:68, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 40px",
      }}>
        <div className="row middle" style={{ gap:10, cursor:"pointer" }} onClick={() => goTo("home")}>
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

          {/* 페이지 헤더 */}
          <div style={{ marginBottom:24 }}>
            <button className="btn ghost sm" style={{ color:"var(--muted)", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}
              onClick={() => goTo("my")}>
              <Icon.ChevronLeft size={14}/> 업로드한 데모곡
            </button>
            <div className="row between middle">
              <div className="col" style={{ gap:4 }}>
                <h1 style={{ fontWeight:800, fontSize:28, letterSpacing:"-.02em", margin:0 }}>받은 가사</h1>
                <div className="caption">{demoNum} · 총 {submissions.length}개</div>
              </div>
              <button className="btn outline" style={{ height:44, paddingInline:22 }}>
                <Icon.Download size={14}/> 전체 다운로드
              </button>
            </div>
          </div>

          {/* 파일 리스트 */}
          <div style={{ border:"1px solid var(--border)", borderRadius:14, overflow:"hidden" }}>
            {submissions.map((s, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:16,
                padding:"16px 24px",
                borderBottom: i < submissions.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "var(--surface)" : "var(--elev)",
                transition:"background .1s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--elev-2)"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "var(--surface)" : "var(--elev)"}
              >
                <Icon.File size={16} style={{ color:"var(--muted)", flexShrink:0 }}/>
                <span style={{ flex:1, fontFamily:"var(--font-mono)", fontSize:14, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {s.file}
                </span>
                <span style={{ fontSize:12, color:"var(--muted)", fontFamily:"var(--font-mono)", flexShrink:0 }}>
                  {s.size}
                </span>
                <button className="btn sm outline" style={{ height:36, paddingInline:18, flexShrink:0 }}>
                  <Icon.Download size={13}/> 다운로드
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
window.ScreenLyricsView = ScreenLyricsView;
