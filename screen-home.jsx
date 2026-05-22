// screen-home.jsx — Home / dashboard screen

function ScreenHome({ goTo }) {
  const D = window.ARTIUM_DATA;
  const isComposer = true;
  const featured = D.demos.slice(0, 4);
  const topLyricists = D.lyricists.slice(0, 4);
  const featuredComposers = D.composers.slice(0, 4);

  return (
    <div className="col" style={{gap:36}}>
      {/* HERO */}
      <section>
        <div style={{
          padding:"40px 36px 36px",
          background: "linear-gradient(120deg, var(--accent-soft) 0%, transparent 60%)",
          border:"1px solid var(--border)",
          borderRadius: 18, position:"relative", overflow:"hidden",
        }}>
          <div className="row middle" style={{gap:8, marginBottom:18}}>
            <span className="dot live"/>
            <span className="eyebrow" style={{color:"var(--muted)"}}>오늘의 ARTIUM · {new Date().toLocaleDateString("ko-KR")}</span>
          </div>
          <h1 className="h-display" style={{maxWidth: 760, marginBottom: 14}}>
            {isComposer
              ? <>당신의 멜로디에 <br/>가사가 닿는 곳.</>
              : <>당신의 한 줄이 <br/>곡이 되는 순간.</>}
          </h1>
          <p className="body" style={{color:"var(--text-2)", maxWidth: 560, marginBottom: 28, fontSize:15, lineHeight:1.55}}>
            {isComposer
              ? "오늘 마감 임박 데모 7곡. 한 시간이면 가사가 도착합니다. 새 데모를 올려보거나, 검증된 작사가에게 직접 의뢰해보세요."
              : "오늘 새로 올라온 데모 18곡. 마음에 닿는 멜로디를 찾고, 한 줄로 시작해보세요. 채택률 높은 작사가는 평균 4시간 안에 첫 메모를 보냅니다."}
          </p>
          <div className="row" style={{gap:10}}>
            <button className="btn primary lg" onClick={() => goTo(isComposer ? "upload" : "home")}>
              {isComposer ? <><Icon.Upload size={16}/> 새 데모 업로드</> : <><Icon.Compass size={16}/> 데모 둘러보기</>}
            </button>
            <button className="btn lg outline" onClick={() => goTo("home")}>
              {isComposer ? "작사가 직접 의뢰" : "큐레이션 받기"} <Icon.ArrowRight size={15}/>
            </button>
          </div>

          {/* Stat strip */}
          <div className="row" style={{gap:32, marginTop:36, paddingTop:24, borderTop:"1px solid var(--border)"}}>
            {[
              { l: "활동 작곡가", v: "1,284", d: "+24 이번 주" },
              { l: "활동 작사가", v: "2,617", d: "+89 이번 주" },
              { l: "이번 달 매칭", v: "412", d: "전월 +18%" },
              { l: "평균 회신 시간", v: "3.8시간", d: "1주 평균" },
            ].map((s) => (
              <div key={s.l} className="col" style={{gap:4}}>
                <div className="eyebrow">{s.l}</div>
                <div className="h-1" style={{fontSize:28}}>{s.v}</div>
                <div className="caption">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — today's pick */}
      <section className="col" style={{gap:16}}>
        <div className="row between middle">
          <div className="col" style={{gap:2}}>
            <div className="eyebrow">오늘의 추천</div>
            <h2 className="h-2">에디터가 고른 데모</h2>
          </div>
          <button className="btn sm ghost" onClick={() => goTo("home")}>
            전체 보기 <Icon.ArrowRight size={14}/>
          </button>
        </div>
        <div className="grid" style={{gridTemplateColumns:"repeat(4, 1fr)", gap:16}}>
          {featured.map(d => (
            <DemoCard key={d.id} demo={d} onClick={() => goTo("detail", d.id)} />
          ))}
        </div>
      </section>

      {/* TWO COL: activity + recommend */}
      <section className="grid" style={{gridTemplateColumns:"1.4fr 1fr", gap:24}}>
        {/* Activity */}
        <div className="card" style={{padding:0}}>
          <div className="row between middle" style={{padding:"18px 22px 14px", borderBottom:"1px solid var(--border)"}}>
            <div className="col" style={{gap:2}}>
              <div className="eyebrow">실시간</div>
              <div className="h-3">활동 피드</div>
            </div>
            <button className="btn sm ghost" style={{marginRight:-6}}>
              <Icon.Bell size={14}/> 알림 설정
            </button>
          </div>
          <div className="col" style={{gap:0}}>
            {D.activity.map((a, i) => (
              <div key={i} className="row middle"
                style={{gap:12, padding:"14px 22px", borderBottom: i < D.activity.length - 1 ? "1px solid var(--border)" : "none"}}>
                <ActivityDot kind={a.kind}/>
                <div className="body-sm" style={{flex:1, minWidth:0}}>
                  <span style={{fontWeight:600}}>{a.who}</span>
                  <span style={{color:"var(--text-2)"}}> 님이 </span>
                  <span style={{fontWeight:500}}>{a.target}</span>
                  <span style={{color:"var(--text-2)"}}>에 {a.action}</span>
                </div>
                <span className="mono" style={{fontSize:11, color:"var(--muted)"}}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions chart for composer / recommend lyricist for lyricist */}
        {isComposer ? (
          <div className="card" style={{padding:22}}>
            <div className="row between middle" style={{marginBottom:18}}>
              <div className="col" style={{gap:2}}>
                <div className="eyebrow">이번 주 활동</div>
                <div className="h-3">받은 가사 제출</div>
              </div>
              <button className="btn sm ghost icon"><Icon.More size={16}/></button>
            </div>
            <div className="row" style={{alignItems:"flex-end", gap:10, height: 130, padding:"6px 0"}}>
              {D.weekly.map((w) => (
                <div key={w.d} className="col" style={{flex:1, alignItems:"center", gap:8}}>
                  <div style={{
                    width:"100%", maxWidth:32,
                    height: `${(w.v / 14) * 100}px`,
                    background: w.d === "금" ? "var(--accent)" : "var(--elev-2)",
                    borderRadius: 4, transition:"height .3s",
                  }}/>
                  <div className="mono" style={{fontSize:10.5, color:"var(--muted)"}}>{w.d}</div>
                </div>
              ))}
            </div>
            <div className="divider" style={{margin:"18px 0"}}/>
            <div className="row between">
              <div className="col" style={{gap:2}}>
                <div className="caption">총 제출</div>
                <div className="h-2">55건</div>
              </div>
              <div className="col" style={{gap:2}}>
                <div className="caption">평균 회신</div>
                <div className="h-2">2.1시간</div>
              </div>
              <div className="col" style={{gap:2}}>
                <div className="caption">채택률</div>
                <div className="h-2" style={{color:"var(--accent)"}}>32%</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card" style={{padding:0}}>
            <div className="row between middle" style={{padding:"18px 22px 14px", borderBottom:"1px solid var(--border)"}}>
              <div className="col" style={{gap:2}}>
                <div className="eyebrow">큐레이션</div>
                <div className="h-3">나에게 맞는 작곡가</div>
              </div>
              <button className="btn sm ghost icon"><Icon.More size={16}/></button>
            </div>
            <div className="col" style={{gap:0}}>
              {featuredComposers.map((c, i) => (
                <div key={c.id} className="row middle"
                  style={{gap:12, padding:"14px 22px", borderBottom: i < featuredComposers.length-1 ? "1px solid var(--border)" : "none"}}>
                  <Avatar name={c.name} size="sm" cover={D.demos[i].cover}/>
                  <div className="col" style={{gap:2, flex:1, minWidth:0}}>
                    <div className="body-sm" style={{fontWeight:600}}>{c.name}</div>
                    <div className="caption mono">{c.handle} · {c.credits}곡</div>
                  </div>
                  <div className="row middle" style={{gap:4}}>
                    <Icon.Star size={12} style={{color:"var(--accent)"}}/>
                    <span className="mono" style={{fontSize:12}}>{c.rating}</span>
                  </div>
                  <button className="btn sm outline">팔로우</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* GENRE QUICK FILTER */}
      <section className="col" style={{gap:14}}>
        <div className="row between middle">
          <div className="col" style={{gap:2}}>
            <div className="eyebrow">탐색</div>
            <h2 className="h-2">장르별 둘러보기</h2>
          </div>
        </div>
        <div className="row" style={{gap:10, flexWrap:"wrap"}}>
          {D.GENRES.map((g, i) => (
            <button key={g} className="card"
              onClick={() => goTo("home")}
              style={{
                cursor:"pointer", padding:"18px 22px",
                minWidth: 152, textAlign:"left",
                background: i === 0 ? "var(--accent-soft)" : undefined,
                borderColor: i === 0 ? "var(--accent)" : undefined,
              }}>
              <div style={{fontSize:13, fontWeight:600, marginBottom:6}}>{g}</div>
              <div className="mono caption">{[42, 28, 31, 18, 22, 14, 9, 27, 12, 8][i]}곡</div>
            </button>
          ))}
        </div>
      </section>

      {/* MARQUEE - top lyricists */}
      {!isComposer ? null : (
        <section className="col" style={{gap:16}}>
          <div className="row between middle">
            <div className="col" style={{gap:2}}>
              <div className="eyebrow">상위 작사가</div>
              <h2 className="h-2">평균 채택률 30%+</h2>
            </div>
          </div>
          <div className="grid" style={{gridTemplateColumns:"repeat(4, 1fr)", gap:16}}>
            {topLyricists.map((l, i) => (
              <LyricistMiniCard key={l.id} lyricist={l} cover={D.demos[i].cover}/>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ───────── Demo Card ─────────
function DemoCard({ demo, onClick }) {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div className="card"
      style={{cursor:"pointer", padding:14, transition:"transform .12s, border-color .12s"}}
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}>
      <div style={{position:"relative", marginBottom:12}}>
        <CoverArt cover={demo.cover} label={demo.id.toUpperCase()}/>
        <button
          onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
          aria-label={playing ? "일시정지" : "재생"}
          style={{
            position:"absolute", right:10, bottom:10,
            width:36, height:36, borderRadius:"50%",
            background:"rgba(255,255,255,.95)", color:"#0b0b0d",
            border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 6px 18px rgba(0,0,0,.30)",
          }}>
          {playing ? <Icon.Pause size={14}/> : <Icon.Play size={14}/>}
        </button>
        {demo.remaining !== "마감" && (
          <span className="badge" style={{
            position:"absolute", left:8, top:8,
            background:"rgba(0,0,0,.55)", color:"white",
            backdropFilter:"blur(8px)"
          }}>
            {demo.remaining}
          </span>
        )}
      </div>
      <div className="row between" style={{marginBottom:6, alignItems:"flex-start", gap:8}}>
        <div className="h-3" style={{flex:1, textWrap:"pretty"}}>{demo.title}</div>
      </div>
      <div className="caption mono" style={{marginBottom:10}}>
        {demo.composer.name} · {demo.bpm} BPM · {demo.key} · {demo.duration}
      </div>
      <Waveform seed={demo.id} played={playing ? 0.45 : 0.0} height={26} bars={42} playing={playing}/>
      <div className="row middle" style={{marginTop:10, gap:6, flexWrap:"wrap"}}>
        {demo.genre.slice(0, 2).map(g => <span key={g} className="chip sm">{g}</span>)}
        <span style={{flex:1}}/>
        <span className="caption mono">{demo.submissions}건 제출</span>
      </div>
    </div>
  );
}
window.DemoCard = DemoCard;

// ───────── Activity dot ─────────
function ActivityDot({ kind }) {
  const map = {
    submit: { color:"#5ddca4", I: Icon.Upload },
    upload: { color:"#ffc24d", I: Icon.Music },
    revision: { color:"#ff5470", I: Icon.Pen },
    accept: { color:"var(--accent)", I: Icon.Check },
    bookmark: { color:"#c4b5ff", I: Icon.Bookmark },
    system: { color:"var(--muted)", I: Icon.Settings },
  };
  const m = map[kind] || map.system;
  return (
    <div style={{
      width:32, height:32, borderRadius:8,
      background:"var(--elev)", border:"1px solid var(--border)",
      display:"flex", alignItems:"center", justifyContent:"center",
      color: m.color, flexShrink:0,
    }}>
      <m.I size={14}/>
    </div>
  );
}

// ───────── Lyricist mini card ─────────
function LyricistMiniCard({ lyricist, cover }) {
  return (
    <div className="card" style={{padding:18, textAlign:"center"}}>
      <Avatar name={lyricist.name} size="lg" cover={cover}/>
      <div className="h-3" style={{marginTop:10}}>{lyricist.name}</div>
      <div className="caption mono">{lyricist.handle}</div>
      <div className="row center" style={{gap:14, marginTop:14, paddingTop:14, borderTop:"1px solid var(--border)"}}>
        <div className="col" style={{gap:2}}>
          <span className="mono" style={{fontSize:13, fontWeight:600}}>{lyricist.credits}</span>
          <span className="caption" style={{fontSize:11}}>크레딧</span>
        </div>
        <div className="divider v" style={{height:24}}/>
        <div className="col" style={{gap:2}}>
          <span className="mono" style={{fontSize:13, fontWeight:600, color:"var(--accent)"}}>{lyricist.rating}</span>
          <span className="caption" style={{fontSize:11}}>평점</span>
        </div>
      </div>
      <button className="btn sm outline" style={{marginTop:12, width:"100%"}}>의뢰하기</button>
    </div>
  );
}

window.ScreenHome = ScreenHome;
