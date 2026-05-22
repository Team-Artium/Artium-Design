// app.jsx — Main router + Tweaks panel + global state

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "vermillion",
  "layoutMode": "feed",
  "startScreen": "auth"
}/*EDITMODE-END*/;

const SCREENS = [
  { id:"auth",          label:"로그인" },
  { id:"signup",        label:"회원가입" },
  { id:"board",         label:"데모 게시판" },
  { id:"detail",        label:"데모 상세" },
  { id:"upload",        label:"데모 업로드" },
  { id:"my",            label:"업로드한 데모곡" },
  { id:"lyrics-view",   label:"받은 가사" },
  { id:"participated",  label:"참여한 데모곡" },
  { id:"inbox",         label:"받은편지함" },
  { id:"profile",       label:"프로필" },
  { id:"billing",       label:"플랜 & 결제" },
];

// ───────── Hash routing ─────────
// GitHub Pages has no SPA fallback, so URL state lives in the hash.
// Format: "#/<route>" or "#/<route>/<param>" (e.g. "#/detail/d-101").
const ROUTE_IDS = SCREENS.map(s => s.id);
const PARAM_ROUTES = ["detail", "lyrics-view"]; // routes that carry a demo id

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [route, param] = raw.split("/");
  if (ROUTE_IDS.includes(route)) return { route, param: param || null };
  return { route: null, param: null };
}

function buildHash(route, param) {
  return param && PARAM_ROUTES.includes(route) ? `#/${route}/${param}` : `#/${route}`;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // First page is the login screen unless the URL hash points elsewhere.
  const initial = parseHash();
  const [route, setRouteState] = React.useState(initial.route || t.startScreen || "auth");
  const [detailId, setDetailId] = React.useState(initial.param || "d-101");

  // Apply theme + accent at document level
  React.useEffect(() => {
    document.documentElement.dataset.theme = t.theme;
    document.documentElement.dataset.accent = t.accent;
  }, [t.theme, t.accent]);

  // Ensure the hash always reflects the current route — so a refresh or a
  // direct link lands on the right screen. Runs once on mount.
  React.useEffect(() => {
    const { route: r } = parseHash();
    if (!r) {
      window.history.replaceState(null, "", buildHash(route, detailId));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Browser back/forward + manual hash edits.
  React.useEffect(() => {
    const onHashChange = () => {
      const { route: r, param } = parseHash();
      if (!r) return;
      if (param) setDetailId(param);
      setRouteState(r);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setRoute = React.useCallback((r, param) => {
    const hash = buildHash(r, param);
    if (window.location.hash !== hash) window.location.hash = hash;
    setRouteState(r);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const goTo = React.useCallback((r, payload) => {
    if (PARAM_ROUTES.includes(r) && payload) {
      setDetailId(payload);
      setRoute(r, payload);
    } else {
      setRoute(r);
    }
  }, [setRoute]);

  // Whole-screen routes (no app shell)
  if (route === "auth")       return <><ScreenAuth       goTo={goTo} theme={t.theme}/><TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/></>;
  if (route === "signup")     return <><ScreenSignup goTo={goTo}/><TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/></>;

  if (route === "my")           return <><ScreenMyDemos           goTo={goTo}/><TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/></>;
  if (route === "participated")  return <><ScreenParticipatedDemos goTo={goTo}/><TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/></>;
  if (route === "lyrics-view")   return <><ScreenLyricsView demoId={detailId} goTo={goTo}/><TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/></>;

  // board = 전체화면 (자체 탑바 포함)
  if (route === "board") return <><ScreenBoard goTo={goTo}/><TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/></>;

  // App shell (사이드바 + 탑바)
  const breadcrumb = {
    detail:  ["데모 게시판", "데모 상세"],
    upload:  ["새로운 작품", "데모 업로드"],
    inbox:   null,
    profile: null,
    billing: null,
  }[route];
  const pageTitle = {
    inbox: "받은 가사", profile: "프로필", billing: "플랜 & 결제",
    upload: "데모 업로드", detail: "데모 상세",
    my: "내 작품", lyrics: "내 작품",
  }[route];

  return (
    <div style={{minHeight:"100vh", background:"var(--bg)"}}>
      <div className="content">
        {route === "detail"  && <ScreenDemoDetail demoId={detailId} goTo={goTo}/>}
        {route === "upload"  && <ScreenUpload goTo={goTo}/>}
        {route === "inbox"   && <ScreenInbox goTo={goTo}/>}
        {route === "profile" && <ScreenProfile goTo={goTo}/>}
        {route === "billing" && <ScreenBilling goTo={goTo}/>}
        {(route === "my" || route === "lyrics") && <ScreenProfile goTo={goTo}/>}
      </div>
      <TweaksUI t={t} setTweak={setTweak} route={route} setRoute={setRoute}/>
    </div>
  );
}

// ───────── Mini player ─────────
function MiniPlayer({ demoId }) {
  const D = window.ARTIUM_DATA;
  const demo = D.demos.find(d => d.id === demoId) || D.demos[0];
  const [playing, setPlaying] = React.useState(false);
  const [played, setPlayed] = React.useState(0.18);
  return (
    <div className="player-bar">
      <div style={{width:48, height:48, borderRadius:8, overflow:"hidden", flexShrink:0}}>
        <CoverArt cover={demo.cover} label=""/>
      </div>
      <div className="col" style={{gap:2, width:200, minWidth:0}}>
        <div style={{fontWeight:600, fontSize:13.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{demo.title}</div>
        <div className="caption mono">{demo.composer.name}</div>
      </div>
      <div className="row middle" style={{gap:8}}>
        <button className="btn sm icon ghost"><Icon.Skip size={14} style={{transform:"scaleX(-1)"}}/></button>
        <button
          aria-label={playing ? "정지" : "재생"}
          onClick={() => setPlaying(!playing)}
          style={{
            width:38, height:38, borderRadius:"50%",
            background:"var(--text)", color:"var(--bg)", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
          {playing ? <Icon.Pause size={15}/> : <Icon.Play size={15}/>}
        </button>
        <button className="btn sm icon ghost"><Icon.Skip size={14}/></button>
      </div>
      <div className="row middle" style={{flex:1, gap:12, minWidth: 0}}>
        <span className="mono caption">1:24</span>
        <Waveform seed={demo.id} played={played} height={28} bars={120} playing={playing}/>
        <span className="mono caption">{demo.duration}</span>
      </div>
      <div className="row middle" style={{gap:6}}>
        <button className="btn sm icon ghost"><Icon.Heart size={15}/></button>
        <button className="btn sm icon ghost"><Icon.Share size={15}/></button>
        <button className="btn sm icon ghost"><Icon.More size={15}/></button>
      </div>
    </div>
  );
}

// ───────── Tweaks UI ─────────
function TweaksUI({ t, setTweak, route, setRoute }) {
  return (
    <TweaksPanel title="ARTIUM Tweaks">
      <TweakSection label="화면">
        <TweakSelect label="현재 스크린" value={route}
          options={SCREENS.map(s => ({ value: s.id, label: s.label }))}
          onChange={setRoute}/>
      </TweakSection>

      <TweakSection label="테마">
        {/* 테마: 라이트 모드 전용 */}
        <TweakColor label="액센트" value={t.accent}
          options={[
            { value:"vermillion", label:"Vermillion" },
            { value:"lime",       label:"Lime" },
            { value:"cobalt",     label:"Cobalt" },
            { value:"ink",        label:"Ink" },
          ].map(o => o.value === "vermillion" ? "#FF5C2B" :
            o.value === "lime" ? "#DEFF4D" :
            o.value === "cobalt" ? "#3461FF" : "#111111")}
          onChange={(color) => {
            const mapped = { "#FF5C2B":"vermillion", "#DEFF4D":"lime", "#3461FF":"cobalt", "#111111":"ink" }[color] || "vermillion";
            setTweak("accent", mapped);
          }}/>
      </TweakSection>

      <TweakSection label="빠른 이동">
        <div className="twk-row">
          <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
            {SCREENS.map(s => (
              <button key={s.id} className="twk-btn secondary"
                style={{fontSize:10, padding:"0 8px", height:22}}
                onClick={() => setRoute(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
