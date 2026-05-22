// shell.jsx — shared primitives: icons, cover art, waveform, sidebar, topbar

// ───────── Icons (stroke-based, 20px viewBox) ─────────
const ico = (path, opts = {}) => (props) => (
  <svg viewBox="0 0 20 20" width={props.size || 18} height={props.size || 18}
       fill="none" stroke="currentColor" strokeWidth={opts.sw || 1.6}
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    {typeof path === "string" ? <path d={path} /> : path}
  </svg>
);

const Icon = {
  Home:        ico("M3 9.5 10 3.5l7 6V17a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1V9.5Z"),
  Compass:     ico(<><circle cx="10" cy="10" r="7.2"/><path d="m13.2 6.8-2 4.4-4.4 2 2-4.4z"/></>),
  Feed:        ico(<><circle cx="5" cy="15" r="1.6"/><path d="M3 9a8 8 0 0 1 8 8M3 4a13 13 0 0 1 13 13"/></>),
  Inbox:       ico(<><path d="M3 11v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/><path d="m3 11 2-7h10l2 7"/><path d="M3 11h4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2h4"/></>),
  Profile:     ico(<><circle cx="10" cy="7" r="3"/><path d="M4 17c1-3 3.2-4 6-4s5 1 6 4"/></>),
  Briefcase:   ico(<><rect x="3" y="6" width="14" height="11" rx="1.5"/><path d="M7 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1M3 11h14"/></>),
  Wallet:      ico(<><rect x="3" y="5" width="14" height="11" rx="1.5"/><path d="M13 11h2"/><path d="M3 8h14"/></>),
  Music:       ico(<><circle cx="6" cy="15" r="2"/><circle cx="15" cy="13" r="2"/><path d="M8 15V5l9-2v10"/></>),
  Pen:         ico("M4 16 14.5 5.5a1.5 1.5 0 0 1 2.1 2.1L6 18l-3 .5L4 16Z"),
  Search:      ico(<><circle cx="9" cy="9" r="5.5"/><path d="m13.2 13.2 4 4"/></>),
  Plus:        ico("M10 4v12M4 10h12"),
  Filter:      ico("M3 5h14M6 10h8M9 15h2"),
  Bell:        ico(<><path d="M5 14V9.5a5 5 0 1 1 10 0V14l1.5 2H3.5L5 14Z"/><path d="M8.5 17a1.5 1.5 0 0 0 3 0"/></>),
  Settings:    ico(<><circle cx="10" cy="10" r="2.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M4.2 15.8l1.5-1.5M14.3 5.7l1.5-1.5"/></>),
  Play:        ico("M6 4.5v11l9-5.5-9-5.5Z", {sw:1.4}),
  Pause:       ico("M6 4h2v12H6zM12 4h2v12h-2z", {sw:1.4}),
  Skip:        ico("M6 4v12M8 10l8 6V4l-8 6Z"),
  Heart:       ico("M10 16.5 3.8 10.4a3.6 3.6 0 0 1 5.1-5L10 6.5l1.1-1.1a3.6 3.6 0 0 1 5.1 5L10 16.5Z"),
  Bookmark:    ico("M5 3h10v14l-5-3-5 3V3Z"),
  Share:       ico(<><circle cx="5" cy="10" r="2"/><circle cx="15" cy="5" r="2"/><circle cx="15" cy="15" r="2"/><path d="m7 9 6-3M7 11l6 3"/></>),
  Upload:      ico("M10 14V4M6 7.5 10 3.5l4 4M4 16h12"),
  Download:    ico("M10 4v10M6 10.5l4 4 4-4M4 17h12"),
  File:        ico("M5 3h7l3 3v11H5V3ZM12 3v3h3"),
  Mic:         ico(<><rect x="8" y="2" width="4" height="9" rx="2"/><path d="M5 9a5 5 0 0 0 10 0M10 14v3"/></>),
  Lock:        ico(<><rect x="4" y="9" width="12" height="8" rx="1.5"/><path d="M7 9V7a3 3 0 0 1 6 0v2"/></>),
  Mail:        ico(<><rect x="3" y="5" width="14" height="11" rx="1.5"/><path d="m3 6 7 5 7-5"/></>),
  Check:       ico("M4 10.5 8 14.5l8-9"),
  X:           ico("M5 5l10 10M15 5 5 15"),
  ChevronRight:ico("M8 4l5 6-5 6"),
  ChevronLeft: ico("M12 4l-5 6 5 6"),
  ChevronDown: ico("M5 8l5 5 5-5"),
  ArrowRight:  ico("M4 10h12M11 5l5 5-5 5"),
  ArrowUpRight:ico("M6 14 14 6M7 6h7v7"),
  Sparkle:     ico("M10 3v4M10 13v4M3 10h4M13 10h4M5 5l2 2M13 13l2 2M5 15l2-2M13 7l2-2"),
  Eye:         ico(<><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z"/><circle cx="10" cy="10" r="2.5"/></>),
  Calendar:    ico(<><rect x="3" y="5" width="14" height="12" rx="1.5"/><path d="M3 9h14M7 3v4M13 3v4"/></>),
  Clock:       ico(<><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/></>),
  Tag:         ico(<><path d="M3 3h7l7 7-7 7-7-7V3Z"/><circle cx="7" cy="7" r="1"/></>),
  Grid:        ico(<><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></>),
  List:        ico("M6 5h11M6 10h11M6 15h11M3 5h.01M3 10h.01M3 15h.01"),
  Sort:        ico("M5 5h10M5 10h7M5 15h4M14 12v5M14 17l2-2M14 17l-2-2"),
  More:        ico("M5 10h.01M10 10h.01M15 10h.01", {sw:2.4}),
  Flag:        ico(<><path d="M4 3v14M4 3h11l-2.5 4.5L15 12H4"/></>),
  Siren:       ico(<>
    <rect x="4" y="14" width="12" height="3" rx="1" fill="currentColor" stroke="none"/>
    <path d="M10 11V7" strokeWidth="2"/>
    <path d="M7.5 9.5L5.5 7.5" strokeWidth="1.8"/>
    <path d="M12.5 9.5L14.5 7.5" strokeWidth="1.8"/>
    <path d="M6 13a4 4 0 0 1 8 0" fill="currentColor" stroke="none"/>
    <circle cx="10" cy="6" r="2.5" fill="currentColor" stroke="none"/>
  </>),
  Star:        ico("M10 3l2.2 4.6 5 .7-3.6 3.5.9 5L10 14.4l-4.5 2.4.9-5-3.6-3.5 5-.7L10 3Z"),
  Spotify:     ico(<><circle cx="10" cy="10" r="7.5"/><path d="M5.5 8c3-1 6-1 9 .5M6 11c2.5-.8 5-.8 7.5.5M6.5 13.8c2-.6 4-.6 6 .4"/></>),
  Globe:       ico(<><circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3c3 3.5 3 10.5 0 14M10 3c-3 3.5-3 10.5 0 14"/></>),
};
window.Icon = Icon;

// ───────── Cover Art (gradient + grain placeholder) ─────────
function CoverArt({ cover, title, size, square = true, label }) {
  const id = React.useId();
  const w = size || "100%";
  return (
    <div className="cover" style={{
      width: w, aspectRatio: square ? "1/1" : "auto",
      background: `linear-gradient(135deg, ${cover.g1} 0%, ${cover.g2} 60%, ${cover.g3} 100%)`,
      position:"relative", overflow:"hidden", borderRadius: 10,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none"
           style={{position:"absolute", inset:0, mixBlendMode:"overlay", opacity:.45}}>
        <defs>
          <radialGradient id={`g${id}`} cx="30%" cy="20%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity=".6"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <pattern id={`grain${id}`} width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".4" fill="white" opacity=".05"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#g${id})`}/>
        <rect width="200" height="200" fill={`url(#grain${id})`}/>
      </svg>
      <div style={{position:"absolute", left:10, top:10, fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,.6)", letterSpacing:".1em"}}>
        {label || "ART"}
      </div>
      {title && (
        <div style={{position:"absolute", left:12, right:12, bottom:10,
          fontSize:11, fontWeight:600, color:"rgba(255,255,255,.92)",
          letterSpacing:"-.005em", lineHeight:1.2,
          textShadow:"0 1px 8px rgba(0,0,0,.3)"}}>
          {title}
        </div>
      )}
    </div>
  );
}
window.CoverArt = CoverArt;

// ───────── Waveform (deterministic placeholder) ─────────
function pseudoBars(seed, n = 64) {
  // simple PRNG so bars are stable per demo id
  let h = 0;
  for (const c of String(seed)) h = (h * 31 + c.charCodeAt(0)) | 0;
  const out = [];
  for (let i = 0; i < n; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    out.push(0.2 + ((h >>> 8) % 1000) / 1000 * 0.8);
  }
  return out;
}

function Waveform({ seed, played = 0.34, height = 36, bars = 80, playing = false }) {
  const data = React.useMemo(() => pseudoBars(seed, bars), [seed, bars]);
  return (
    <div className={"wave" + (playing ? " playing" : "")} style={{height, gap:2, width:"100%"}}>
      {data.map((v, i) => {
        const isPlayed = i / data.length < played;
        return (
          <i key={i}
             className={isPlayed ? "played" : ""}
             style={{
               height: `${Math.max(3, v * height)}px`,
               flex: 1,
               minWidth: 0,
             }}/>
        );
      })}
    </div>
  );
}
window.Waveform = Waveform;

// ───────── Avatar ─────────
function Avatar({ name, size, cover }) {
  const initials = (name || "?").split(/\s+/).map(s => s[0]).slice(0,2).join("").toUpperCase();
  const cls = size === "sm" ? "avatar sm" : size === "lg" ? "avatar lg" : size === "xl" ? "avatar xl" : "avatar";
  const bg = cover
    ? `linear-gradient(135deg, ${cover.g1}, ${cover.g2})`
    : `linear-gradient(135deg, var(--elev-2), var(--elev))`;
  return (
    <div className={cls} style={{background: bg, color: cover ? "white" : "var(--text)"}}>
      {initials}
    </div>
  );
}
window.Avatar = Avatar;

// ───────── Sidebar ─────────
function Sidebar({ route, setRoute }) {
  const items = [
    { grp: "메인" },
    { id:"home",    label:"데모 게시판", ico: Icon.Compass, count: 142 },
    { id:"inbox",   label:"받은 가사",   ico: Icon.Inbox, count: 7 },
    { grp: "작곡가" },
    { id:"upload",  label:"데모 업로드", ico: Icon.Upload },
    { id:"my",      label:"내 작품",     ico: Icon.Music, count: 12 },
    { grp: "계정" },
    { id:"profile", label:"프로필",     ico: Icon.Profile },
    { id:"billing", label:"플랜 & 결제", ico: Icon.Wallet },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div style={{
          width:30, height:30, borderRadius:8,
          background:"var(--text)", color:"var(--bg)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"var(--font-serif)", fontSize:18, fontWeight:700, letterSpacing:"-.02em"
        }}>A</div>
        <div style={{display:"flex", flexDirection:"column", lineHeight:1}}>
          <span style={{fontWeight:700, fontSize:15, letterSpacing:"-.015em"}}>ARTIUM</span>
          <span className="mono" style={{fontSize:9.5, color:"var(--muted)", letterSpacing:".12em", marginTop:2}}>CONNECT-E</span>
        </div>
      </div>

      <nav className="nav">
        {items.map((it, i) => it.grp ? (
          <div className="grp" key={"g"+i}>{it.grp}</div>
        ) : (
          <a key={it.id}
             className={route === it.id ? "active" : ""}
             onClick={() => setRoute(it.id)}>
            <it.ico size={17}/>
            <span>{it.label}</span>
            {it.count != null && <span className="count">{it.count}</span>}
          </a>
        ))}
      </nav>

      <div className="footer">
        <Avatar name={"강 하늘"} size="sm" />
        <div style={{display:"flex", flexDirection:"column", lineHeight:1.2, minWidth:0, flex:1}}>
          <span style={{fontSize:13, fontWeight:600}}>{"강하늘"}</span>
          <span className="mono" style={{fontSize:10.5, color:"var(--muted)"}}>
            {"Composer · PRO"}
          </span>
        </div>
        <button className="btn sm icon ghost" aria-label="설정"><Icon.Settings size={16}/></button>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;

// ───────── Topbar ─────────
function Topbar({ page, breadcrumb, goTo }) {

  return (
    <header style={{
      position:"sticky", top:0, zIndex:50,
      background:"var(--surface)", borderBottom:"1px solid var(--border)",
      height:64, display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 32px",
    }}>
      {/* 뒤로가기 */}
      <button className="btn ghost icon" onClick={() => goTo && goTo("home")} style={{color:"var(--text-2)"}}>
        <Icon.ChevronLeft size={22}/>
      </button>

      {/* 로고 */}
      <div className="row middle" style={{gap:10}}>
        <div style={{
          width:30, height:30, borderRadius:7,
          background:"var(--text)", color:"var(--bg)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontWeight:800, fontSize:17,
        }}>A</div>
        <div className="col" style={{lineHeight:1}}>
          <span style={{fontWeight:700, fontSize:14}}>ARTIUM</span>
          <span className="mono" style={{fontSize:9, color:"var(--muted)", letterSpacing:".12em", marginTop:1}}>CONNECT-E</span>
        </div>
      </div>

      {/* 알림 */}
      <button className="btn ghost icon" style={{position:"relative", color:"var(--text-2)"}}>
        <Icon.Bell size={20}/>
        <span style={{position:"absolute", top:8, right:8, width:6, height:6, borderRadius:"50%", background:"var(--accent)"}}/>
      </button>
    </header>
  );
}
window.Topbar = Topbar;

// ───────── Status pill ─────────
function StatusPill({ status }) {
  const map = {
    "공개 모집": { bg:"rgba(93,220,164,.14)", color:"#5ddca4", border:"rgba(93,220,164,.35)" },
    "심사 중":   { bg:"rgba(255,194,77,.14)", color:"#ffc24d", border:"rgba(255,194,77,.35)" },
    "마감":      { bg:"rgba(122,122,130,.18)", color:"var(--muted)", border:"var(--border)" },
    "초대":      { bg:"var(--accent-soft)", color:"var(--accent)", border:"var(--accent)" },
  };
  const s = map[status] || map["공개 모집"];
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6,
      height: 22, padding:"0 10px", borderRadius: 999,
      background: s.bg, color: s.color, border:`1px solid ${s.border}`,
      fontSize: 11, fontWeight: 600, letterSpacing:"-.005em",
    }}>
      <span style={{width:5, height:5, borderRadius:"50%", background: s.color, display:"inline-block"}}/>
      {status}
    </span>
  );
}
window.StatusPill = StatusPill;

// ───────── Empty State ─────────
function EmptyState({ icon: I = Icon.Search, title, hint, action }) {
  return (
    <div style={{padding:"56px 24px", display:"flex", flexDirection:"column",
      alignItems:"center", gap:14, textAlign:"center", color:"var(--muted)"}}>
      <div style={{width:48, height:48, borderRadius:12, background:"var(--elev)",
        display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)"}}>
        <I size={22}/>
      </div>
      <div className="h-3" style={{color:"var(--text)"}}>{title}</div>
      <div className="body-sm" style={{maxWidth:380}}>{hint}</div>
      {action}
    </div>
  );
}
window.EmptyState = EmptyState;
