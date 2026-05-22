// screen-profile.jsx — 프로필 페이지 (와이어프레임 기준)

function ScreenProfile({ goTo }) {
  const D = window.ARTIUM_DATA;
  const [uploadedOpen, setUploadedOpen] = React.useState(false);
  const [participatedOpen, setParticipatedOpen] = React.useState(false);

  const uploadedDemos = D.demos.slice(0, 3);
  const participatedDemos = D.demos.slice(3, 6);

  const MenuItem = ({ icon: I, label, sub, onClick, accent, danger, chevron = true }) => (
    <button onClick={onClick} style={{
      width:"100%", background:"none", border:"none", cursor:"pointer",
      display:"flex", alignItems:"center", gap:16,
      padding:"18px 24px", textAlign:"left",
      transition:"background .1s",
      fontFamily:"var(--font-sans)",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--elev)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontWeight:600, fontSize:15,
          color: danger ? "var(--danger)" : "var(--text)",
          letterSpacing:"-.01em",
        }}>{label}</div>
        {sub && <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{sub}</div>}
      </div>
      {chevron && <Icon.ChevronRight size={16} style={{ color:"var(--muted-2)", flexShrink:0 }}/>}
    </button>
  );

  const SectionCard = ({ children }) => (
    <div style={{
      background:"var(--surface)", border:"1px solid var(--border)",
      borderRadius:16, overflow:"hidden",
    }}>
      {React.Children.map(children, (child, i) => (
        <>
          {i > 0 && <div style={{ height:1, background:"var(--border)", margin:"0 24px" }}/>}
          {child}
        </>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", padding:"40px 40px 64px" }}>
      <div style={{ maxWidth:720, margin:"0 auto", display:"flex", flexDirection:"column", gap:20 }}>

        {/* 프로필 헤더 */}
        <div style={{
          background:"var(--surface)", border:"1px solid var(--border)",
          borderRadius:16, padding:"28px 28px",
          display:"flex", alignItems:"center", gap:20,
        }}>
          <div style={{
            width:80, height:80, borderRadius:18,
            background:"var(--elev)", border:"1px solid var(--border)",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
          }}>
            <Icon.Profile size={40} style={{ color:"var(--muted)" }}/>
          </div>
          <div className="col" style={{ gap:4, flex:1 }}>
            <div style={{ fontWeight:800, fontSize:32, letterSpacing:"-.025em", lineHeight:1 }}>고진영님!</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>@gojinyoung · Composer · PRO</div>
          </div>
          <button className="btn sm outline" style={{ flexShrink:0 }}>
            <Icon.Settings size={14}/> 편집
          </button>
        </div>

        {/* 활동 섹션 */}
        <SectionCard>
          {/* 업로드한 데모곡 */}
          <div>
            <MenuItem
              icon={Icon.Upload}
              label="업로드한 데모곡"
              sub={uploadedDemos.length + "곡 업로드됨"}
              onClick={() => goTo("my")}
            />
            {uploadedOpen && (
              <div style={{ padding:"0 16px 16px" }}>
                <div className="col" style={{ gap:8 }}>
                  {uploadedDemos.map((d, i) => (
                    <button key={d.id} onClick={() => goTo("detail", d.id)}
                      style={{
                        display:"flex", alignItems:"center", gap:14, padding:"12px 14px",
                        background:"var(--elev)", border:"1px solid var(--border)",
                        borderRadius:10, cursor:"pointer", width:"100%", textAlign:"left",
                        transition:"border-color .12s",
                        fontFamily:"var(--font-sans)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      <div style={{
                        width:36, height:36, borderRadius:8, flexShrink:0, overflow:"hidden",
                        background: "linear-gradient(135deg, " + d.cover.g1 + ", " + d.cover.g2 + ")",
                      }}/>
                      <div className="col" style={{ gap:2, flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:14 }}>{"데모곡" + String(i+1).padStart(4,"0")}</div>
                        <div style={{ fontSize:12, color:"var(--muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {d.hashtags.slice(0,3).join(" ")}
                        </div>
                      </div>
                      <span style={{
                        fontSize:11, fontWeight:600, padding:"3px 8px", borderRadius:6,
                        background:"rgba(93,220,164,.14)", color:"var(--success)", flexShrink:0,
                      }}>{d.status}</span>
                      <Icon.ChevronRight size={14} style={{ color:"var(--muted-2)", flexShrink:0 }}/>
                    </button>
                  ))}
                  <button className="btn sm outline" style={{ alignSelf:"flex-start", marginTop:4 }}
                    onClick={() => goTo("upload")}>
                    <Icon.Plus size={12}/> 새 데모 업로드
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 참여한 데모곡 */}
          <div>
            <MenuItem
              icon={Icon.Pen}
              label="참여한 데모곡"
              sub="가사를 제출한 데모곡 목록"
              onClick={() => goTo("participated")}
              chevron={false}
            />
            {participatedOpen && (
              <div style={{ padding:"0 16px 16px" }}>
                <div className="col" style={{ gap:8 }}>
                  {participatedDemos.map((d, i) => (
                    <button key={d.id} onClick={() => goTo("detail", d.id)}
                      style={{
                        display:"flex", alignItems:"center", gap:14, padding:"12px 14px",
                        background:"var(--elev)", border:"1px solid var(--border)",
                        borderRadius:10, cursor:"pointer", width:"100%", textAlign:"left",
                        transition:"border-color .12s",
                        fontFamily:"var(--font-sans)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      <div style={{
                        width:36, height:36, borderRadius:8, flexShrink:0, overflow:"hidden",
                        background: "linear-gradient(135deg, " + d.cover.g1 + ", " + d.cover.g2 + ")",
                      }}/>
                      <div className="col" style={{ gap:2, flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:14 }}>{"데모곡" + String(i+4).padStart(4,"0")}</div>
                        <div style={{ fontSize:12, color:"var(--muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {d.hashtags.slice(0,3).join(" ")}
                        </div>
                      </div>
                      <span style={{
                        fontSize:11, fontWeight:600, padding:"3px 8px", borderRadius:6,
                        background:"var(--elev-2)", color:"var(--text-2)", flexShrink:0,
                      }}>제출 완료</span>
                      <Icon.ChevronRight size={14} style={{ color:"var(--muted-2)", flexShrink:0 }}/>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 결제 (구독) */}
          <MenuItem
            icon={Icon.Wallet}
            label="결제 (구독)"
            sub="현재 Pro 플랜 · 다음 결제 2026.06.18"
            onClick={() => goTo("billing")}
          />
        </SectionCard>

        {/* 설정 섹션 */}
        <SectionCard>
          <MenuItem icon={Icon.Profile} label="프로필 설정" sub="이름, 핸들, 소개 등" onClick={() => {}}/>
          <MenuItem icon={Icon.Settings} label="앱 설정" sub="알림, 언어, 테마" onClick={() => {}}/>
          <MenuItem icon={Icon.Globe} label="개인정보/서비스 이용약관" onClick={() => {}}/>
        </SectionCard>

        {/* 로그아웃 */}
        <SectionCard>
          <MenuItem icon={Icon.X} label="로그아웃" danger onClick={() => goTo("auth")} chevron={false}/>
        </SectionCard>

      </div>
    </div>
  );
}
window.ScreenProfile = ScreenProfile;

// Stub exports for compatibility
function ScreenInbox({ goTo }) {
  return (
    <div style={{ padding:"40px", textAlign:"center", color:"var(--muted)" }}>
      <div className="h-2" style={{ marginBottom:8 }}>받은 가사</div>
      <div className="body-sm">준비 중입니다.</div>
    </div>
  );
}
window.ScreenInbox = ScreenInbox;

function ScreenBilling({ goTo }) {
  const [period, setPeriod] = React.useState("monthly");
  const plans = [
    {
      tier:"FREE", name:"Free",
      price:{ monthly:"₩0", yearly:"₩0" }, suffix:" / 영구",
      tagline:"가볍게 시작하기",
      features:[
        { t:"월 3건 데모 응모", on:true },
        { t:"기본 검색 & 필터", on:true },
        { t:"공개 게시판 열람", on:true },
        { t:"직접 작곡가 의뢰", on:false },
        { t:"수수료 12%", on:true, sub:true },
      ],
    },
    {
      tier:"PRO", name:"Pro", recommended:true,
      price:{ monthly:"₩19,900", yearly:"₩16,900" }, suffix:" / 월",
      tagline:"전업 작사·작곡가용",
      features:[
        { t:"무제한 데모 응모", on:true },
        { t:"고급 검색 & 큐레이션", on:true },
        { t:"작곡가 직접 의뢰", on:true },
        { t:"가사 우선 노출", on:true },
        { t:"수수료 8%", on:true, sub:true },
      ],
    },
    {
      tier:"LABEL", name:"Label",
      price:{ monthly:"문의", yearly:"문의" }, suffix:"",
      tagline:"팀 / 레이블용",
      features:[
        { t:"멤버 5명+ 협업", on:true },
        { t:"전용 매니저 배정", on:true },
        { t:"맞춤 큐레이션 리포트", on:true },
        { t:"우선 검수 채널", on:true },
        { t:"수수료 협상", on:true, sub:true },
      ],
    },
  ];

  return (
    <div className="col" style={{gap:32, padding:"32px 40px"}}>
      <div className="col" style={{gap:14, textAlign:"center", alignItems:"center", padding:"24px 0"}}>
        <div className="eyebrow">PLAN & PRICING</div>
        <h1 className="h-display" style={{fontSize:48, maxWidth:720, textWrap:"balance"}}>오래 머무를 작품을 위한 도구.</h1>
        <div className="seg" style={{marginTop:8}}>
          <button className={period==="monthly"?"active":""} onClick={()=>setPeriod("monthly")}>월간</button>
          <button className={period==="yearly"?"active":""} onClick={()=>setPeriod("yearly")}>
            연간 <span className="badge new" style={{marginLeft:6, height:18}}>15% OFF</span>
          </button>
        </div>
      </div>
      <div className="grid" style={{gridTemplateColumns:"repeat(3, 1fr)", gap:18, alignItems:"stretch"}}>
        {plans.map(p => (
          <div key={p.tier} className="card" style={{
            padding:28, display:"flex", flexDirection:"column", gap:14,
            borderColor: p.recommended ? "var(--accent)" : "var(--border)",
            borderWidth: p.recommended ? 1.5 : 1,
            background: p.recommended ? "var(--accent-soft)" : undefined,
            position:"relative",
          }}>
            {p.recommended && (
              <div style={{
                position:"absolute", top:-12, right:24,
                padding:"4px 10px", background:"var(--accent)", color:"var(--accent-ink)",
                borderRadius:999, fontSize:10.5, fontWeight:700,
                letterSpacing:".08em", textTransform:"uppercase", fontFamily:"var(--font-mono)",
              }}>POPULAR</div>
            )}
            <div className="eyebrow">{p.tier}</div>
            <div className="col" style={{gap:4}}>
              <div className="h-2">{p.name}</div>
              <div className="caption">{p.tagline}</div>
            </div>
            <div className="row" style={{alignItems:"baseline", gap:6, marginTop:6}}>
              <span className="h-display" style={{fontSize:32, lineHeight:1}}>{p.price[period]}</span>
              <span className="caption">{p.suffix}</span>
            </div>
            <button className={"btn " + (p.recommended ? "primary lg" : "outline lg")} style={{marginTop:6}}>
              {p.tier==="LABEL" ? "상담 신청" : p.tier==="FREE" ? "현재 플랜" : "Pro 시작하기"}
            </button>
            <div className="divider" style={{margin:"4px 0"}}/>
            <div className="col" style={{gap:10}}>
              {p.features.map((f,i) => (
                <div key={i} className="row middle" style={{gap:10}}>
                  {f.on ? <Icon.Check size={14} style={{color:f.sub?"var(--muted)":"var(--accent)"}}/> : <Icon.X size={14} style={{color:"var(--muted-2)"}}/>}
                  <span className="body-sm" style={{color:f.on?(f.sub?"var(--muted)":"var(--text)"):"var(--muted-2)"}}>{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.ScreenBilling = ScreenBilling;
