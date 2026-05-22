// screen-auth.jsx — Login + Signup (separate screens)

// ═══════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════
// ─── MatchingTicker 애니메이션 ───
const MATCHES = [
  { composer:"김준혁", lyricist:"고진영", title:"새벽의 끝에서" },
  { composer:"이민준", lyricist:"박서연", title:"첫눈처럼" },
  { composer:"한지호", lyricist:"윤채원", title:"기억의 온도" },
  { composer:"장우진", lyricist:"최다은", title:"그리움의 계절" },
  { composer:"오현석", lyricist:"김나리", title:"파란 자장가" },
  { composer:"서지훈", lyricist:"이수아", title:"여름의 잔상" },
  { composer:"박도현", lyricist:"정유진", title:"달빛 소나타" },
  { composer:"문지호", lyricist:"강민서", title:"사랑의 흔적" },
  { composer:"임재원", lyricist:"송하은", title:"두 번째 봄" },
  { composer:"정성훈", lyricist:"류지아", title:"이 밤이 지나면" },
];

function MatchingTicker() {
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState("enter"); // enter | visible | exit

  React.useEffect(() => {
    let t1, t2, t3;
    // enter: slide up + fade in (600ms)
    setPhase("enter");
    t1 = setTimeout(() => setPhase("visible"), 600);
    // stay visible 2.8s, then exit
    t2 = setTimeout(() => setPhase("exit"), 3400);
    // after exit (500ms), move to next
    t3 = setTimeout(() => {
      setIdx(i => (i + 1) % MATCHES.length);
    }, 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [idx]);

  const m = MATCHES[idx];
  const nameA = m.composer[0] + m.composer[1] + "O";
  const nameB = m.lyricist[0] + m.lyricist[1] + "O";

  const styles = {
    enter:   { opacity: 0, transform: "translateY(18px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
    exit:    { opacity: 0, transform: "translateY(-14px)" },
  };

  return (
    <div style={{ height: 72, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{
        ...styles[phase],
        transition: phase === "enter"
          ? "opacity .6s ease, transform .6s cubic-bezier(.22,.68,0,1.2)"
          : "opacity .5s ease, transform .5s ease",
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing:"-.02em", lineHeight:1.2, textAlign:"center" }}>
          {nameA} - {nameB}, ARTIUM
        </div>
        <div style={{ fontSize: 13, color:"var(--muted)", marginTop: 6, fontFamily:"var(--font-mono)", textAlign:"center" }}>
          {m.title} · 발매 확정
        </div>
      </div>
    </div>
  );
}

function ScreenAuth({ goTo, theme }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "48px 24px"
    }}>
      <div className="col" style={{
        gap: 40, width: "100%", maxWidth: 480,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "40px 48px",
        boxShadow: "var(--shadow-md)",
      }}>

        {/* ── Brand block ── */}
        <div className="col" style={{ gap: 20 }}>
          {/* Logo */}
          <div className="row middle" style={{ gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--text)", color: "var(--bg)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 800, letterSpacing: "-.02em"
            }}>A</div>
            <div className="row middle" style={{ gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 17, lineHeight: 1 }}>ARTIUM</span>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: ".12em", lineHeight: 1 }}>CONNECT-E</span>
            </div>
          </div>

          {/* 애니메이션 매칭 텍스트 */}
          <MatchingTicker/>
        </div>

        {/* ── Divider ── */}
        <div className="divider" style={{ margin: "-18px 0 -18px" }}/>

        {/* ── Login form ── */}
        <div className="col" style={{ gap: 24 }}>
          <div className="col" style={{ gap: 4 }}>
            <div className="eyebrow"></div>
            <h2 className="h-1"></h2>
          </div>

          <div className="col" style={{ gap: 14 }}>
            <div className="field">
              <label>이메일</label>
              <input className="input lg" type="email" placeholder="name@artium.kr" defaultValue="hanuel@artium.kr" />
            </div>

            <div className="field">
              <label>비밀번호</label>
              <input className="input lg" type="password" defaultValue="passwordpassword" />
              <div style={{ textAlign: "right" }}>
                <a className="caption" style={{ cursor: "pointer", color: "var(--text-2)" }}>비밀번호를 잊으셨나요?</a>
              </div>
            </div>
          </div>

          <button className="btn primary xl" style={{ width: "100%", borderRadius: 14 }}
          onClick={() => goTo("home")}>
            로그인 <Icon.ArrowRight size={15} />
          </button>

          {/* Social */}
          <div className="row middle" style={{ gap: 12 }}>
            <div className="divider" style={{ flex: 1 }} />
            <span className="caption">또는</span>
            <div className="divider" style={{ flex: 1 }} />
          </div>

          <div className="row" style={{ gap: 10 }}>
            <button className="btn outline" style={{ flex: 1, height: 48 }}>
              <span style={{ fontWeight: 700, fontSize: 15, marginRight: 4 }}>G</span>Google
            </button>
            <button className="btn outline" style={{ flex: 1, height: 48, background: "#03C75A", color: "white", border: "none" }}>
              NAVER
            </button>
          </div>

          <div className="caption" style={{ textAlign: "center" }}>
            처음이세요?{" "}
            <a style={{ cursor: "pointer", fontWeight: 600, color: "var(--text)" }}
            onClick={() => goTo("signup")}>
              회원가입
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="row between" style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <span className="caption mono">© 2025 ARTIUM Inc.</span>
          <div className="row" style={{ gap: 16 }}>
            <a className="caption" style={{ cursor: "pointer" }}>개인정보 처리방침</a>
            <a className="caption" style={{ cursor: "pointer" }}>이용약관</a>
          </div>
        </div>
      </div>
    </div>);

}
window.ScreenAuth = ScreenAuth;


// ═══════════════════════════════════════════════
// SIGNUP — 2 steps: 동의 → 정보 입력
// ═══════════════════════════════════════════════
function ScreenSignup({ goTo }) {
  const [step, setStep] = React.useState(1); // 1=consent, 2=info
  const [agrees, setAgrees] = React.useState({ all: false, terms: false, privacy: false, marketing: false });
  const [phone, setPhone] = React.useState("");
  const [phoneSent, setPhoneSent] = React.useState(false);
  const [phoneVerified, setPhoneVerified] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState("");
  const [timer, setTimer] = React.useState(0);
  const [pw, setPw] = React.useState("");
  const [pwConfirm, setPwConfirm] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [birthYear, setBirthYear] = React.useState("");
  const [birthMonth, setBirthMonth] = React.useState("");
  const [birthDay, setBirthDay] = React.useState("");

  // timer countdown
  React.useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleAgreeAll = (v) => setAgrees({ all: v, terms: v, privacy: v, marketing: v });
  const handleAgree = (key, v) => {
    const next = { ...agrees, [key]: v };
    next.all = next.terms && next.privacy && next.marketing;
    setAgrees(next);
  };
  const canProceed = agrees.terms && agrees.privacy;

  const sendCode = () => {
    if (!phone || phone.length < 10) return;
    setPhoneSent(true);
    setTimer(180);
  };
  const checkCode = () => {
    if (verifyCode.length === 6) setPhoneVerified(true);
  };

  const pwMatch = pw && pwConfirm && pw === pwConfirm;
  const pwWrong = pw && pwConfirm && pw !== pwConfirm;

  const timerStr = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;

  const years = Array.from({ length: 80 }, (_, i) => 2006 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "48px 24px"
    }}>
      <div className="col" style={{
        gap: 32, width: "100%", maxWidth: 520,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "40px 48px",
        boxShadow: "var(--shadow-md)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-.02em" }}>ARTIUM: CONNECT-E</span>
        </div>

        {/* Progress */}
        <div className="progress-bar">
          <i style={{ width: `${step / 2 * 100}%` }} />
        </div>

        {/* ─── STEP 1: 약관 동의 ─── */}
        {step === 1 &&
        <div className="col" style={{ gap: 28 }}>
            <div className="col" style={{ gap: 6 }}>
            </div>

            {/* 전체 동의 */}
            <button
            onClick={() => handleAgreeAll(!agrees.all)}
            className="card"
            style={{
              padding: "20px 22px", cursor: "pointer", textAlign: "left",
              borderColor: agrees.all ? "var(--accent)" : "var(--border)",
              background: agrees.all ? "var(--accent-soft)" : "var(--surface)"
            }}>
              <div className="row middle" style={{ gap: 14 }}>
                <CheckCircle checked={agrees.all} />
                <div className="col" style={{ gap: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>모두 동의합니다</div>
                  <div className="caption">선택 항목 포함 전체 동의</div>
                </div>
              </div>
            </button>

            {/* 개별 항목 */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              {[
            { key: "terms", label: "이용약관 동의", required: true, link: true },
            { key: "privacy", label: "개인정보 처리방침 동의", required: true, link: true },
            { key: "marketing", label: "마케팅 정보 수신 동의", required: false, link: false }].
            map((item, i) =>
            <div key={item.key}
            style={{
              padding: "16px 22px",
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              display: "flex", alignItems: "center", gap: 14
            }}>
                  <button onClick={() => handleAgree(item.key, !agrees[item.key])} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <CheckCircle checked={agrees[item.key]} small />
                  </button>
                  <span className="body-sm" style={{ flex: 1 }}>
                    {item.required ?
                <span className="mono" style={{ color: "var(--accent)", marginRight: 6, fontSize: 10 }}>[필수]</span> :
                <span className="mono" style={{ color: "var(--muted)", marginRight: 6, fontSize: 10 }}>[선택]</span>
                }
                    {item.label}
                  </span>
                  {item.link &&
              <button className="btn sm ghost" style={{ color: "var(--muted)", fontSize: 12 }}>
                      보기 <Icon.ChevronRight size={11} />
                    </button>
              }
                </div>
            )}
            </div>

            <button className="btn primary xl" style={{ width: "100%", borderRadius: 14 }}
          disabled={!canProceed}
          onClick={() => setStep(2)}>
              다음 <Icon.ChevronRight size={15} />
            </button>
          </div>
        }

        {/* ─── STEP 2: 정보 입력 (네이버 스타일) ─── */}
        {step === 2 && (
          <div className="col" style={{ gap: 20 }}>

            {/* 역할 선택 */}
            <div className="field">
              <label style={{ fontSize:13, fontWeight:600, color:"var(--text-2)", marginBottom:4 }}>역할 선택 <span style={{ color:"var(--danger)" }}>*</span></label>
              <div className="row" style={{ gap:10 }}>
                {[{v:"composer", l:"작곡가", d:"데모 업로드 및 작사가 매칭"}, {v:"lyricist", l:"작사가", d:"데모에 가사 응모 및 제출"}].map(r => (
                  <button key={r.v} onClick={() => setUserRole(r.v)}
                    style={{
                      flex:1, padding:"16px 14px", borderRadius:10, cursor:"pointer",
                      border: `1.5px solid ${userRole === r.v ? "var(--accent)" : "var(--border)"}`,
                      background: userRole === r.v ? "var(--accent-soft)" : "var(--surface)",
                      fontFamily:"var(--font-sans)", textAlign:"left", transition:"all .12s",
                    }}>
                    <div style={{ fontWeight:700, fontSize:15, color: userRole === r.v ? "var(--accent)" : "var(--text)", marginBottom:4 }}>{r.l}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.4 }}>{r.d}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 그룹 1: 이름 · 생년월일 · 성별 */}
            <div style={{ border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
              {/* 이름 */}
              <div className="row middle" style={{ gap:14, padding:"0 16px", height:56, borderBottom:"1px solid var(--border)" }}>
                <Icon.Profile size={18} style={{ color:"var(--muted)", flexShrink:0 }}/>
                <input style={{ flex:1, border:"none", outline:"none", background:"transparent",
                  fontSize:15, color:"var(--text)", fontFamily:"var(--font-sans)" }}
                  placeholder="이름 (실명)" defaultValue="강하늘"/>
              </div>
              {/* 생년월일 */}
              <div className="row middle" style={{ gap:14, padding:"0 16px", height:56, borderBottom:"1px solid var(--border)" }}>
                <Icon.Calendar size={18} style={{ color:"var(--muted)", flexShrink:0 }}/>
                <input style={{ flex:1, border:"none", outline:"none", background:"transparent",
                  fontSize:15, color:"var(--text)", fontFamily:"var(--font-sans)" }}
                  placeholder="생년월일 8자리 (예: 19900101)" maxLength={8}
                  value={birthYear + birthMonth + birthDay}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g,"").slice(0,8);
                    setBirthYear(v.slice(0,4)); setBirthMonth(v.slice(4,6)); setBirthDay(v.slice(6,8));
                  }}/>
              </div>
              {/* 성별 */}
              <div className="row" style={{ height:52 }}>
                {["남성","여성","선택안함"].map((g, i) => (
                  <button key={g} onClick={() => setGender(g)} style={{
                    flex:1, height:"100%", border:"none", borderRight: i < 2 ? "1px solid var(--border)" : "none",
                    background: gender === g ? "var(--accent-soft)" : "transparent",
                    color: gender === g ? "var(--accent)" : "var(--muted)",
                    fontWeight: gender === g ? 700 : 500, fontSize:14,
                    cursor:"pointer", fontFamily:"var(--font-sans)",
                    transition:"background .12s, color .12s",
                  }}>{g}</button>
                ))}
              </div>
            </div>

            {/* 안내 문구 */}
            <div className="row middle" style={{ gap:8 }}>
              <Icon.Check size={13} style={{ color:"var(--accent)", flexShrink:0 }}/>
              <span className="caption" style={{ color:"var(--accent)", lineHeight:1.5 }}>
                신분증 상의 이름, 생년월일, 성별과 일치해야 실명인증이 가능합니다.
              </span>
            </div>

            {/* 그룹 2: 이메일 · 비밀번호 · 비밀번호 확인 */}
            <div style={{ border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
              {/* 이메일 */}
              <div className="row middle" style={{ gap:14, padding:"0 16px", height:56, borderBottom:"1px solid var(--border)" }}>
                <Icon.Mail size={18} style={{ color:"var(--muted)", flexShrink:0 }}/>
                <input type="email" style={{ flex:1, border:"none", outline:"none", background:"transparent",
                  fontSize:15, color:"var(--text)", fontFamily:"var(--font-sans)" }}
                  placeholder="이메일 주소" defaultValue="hanuel@artium.kr"/>
              </div>
              {/* 비밀번호 */}
              <div className="col" style={{ borderBottom:"1px solid var(--border)" }}>
                <div className="row middle" style={{ gap:14, padding:"0 16px", height:56 }}>
                  <Icon.Lock size={18} style={{ color:"var(--muted)", flexShrink:0 }}/>
                  <input type="password" style={{ flex:1, border:"none", outline:"none", background:"transparent",
                    fontSize:15, color:"var(--text)", fontFamily:"var(--font-sans)" }}
                    placeholder="비밀번호 (영문·숫자·특수문자 8자 이상)"
                    value={pw} onChange={e => setPw(e.target.value)}/>
                </div>
                {pw && (
                  <div style={{ padding:"0 16px 12px" }}>
                    <PasswordStrength pw={pw}/>
                  </div>
                )}
              </div>
              {/* 비밀번호 확인 */}
              <div className="row middle" style={{ gap:14, padding:"0 16px", minHeight:56 }}>
                <Icon.Lock size={18} style={{ color: pwWrong ? "var(--danger)" : pwMatch ? "var(--success)" : "var(--muted)", flexShrink:0 }}/>
                <input type="password" style={{ flex:1, border:"none", outline:"none", background:"transparent",
                  fontSize:15, color:"var(--text)", fontFamily:"var(--font-sans)" }}
                  placeholder="비밀번호 확인"
                  value={pwConfirm} onChange={e => setPwConfirm(e.target.value)}/>
                {pwWrong && <Icon.X size={16} style={{ color:"var(--danger)", flexShrink:0 }}/>}
                {pwMatch && <Icon.Check size={16} style={{ color:"var(--success)", flexShrink:0 }}/>}
              </div>
            </div>

            {/* 그룹 3: 국가 · 휴대폰 */}
            <div style={{ border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
              {/* 국가 */}
              <div className="row middle" style={{ gap:14, padding:"0 16px", height:56, borderBottom:"1px solid var(--border)" }}>
                <Icon.Globe size={18} style={{ color:"var(--muted)", flexShrink:0 }}/>
                <span style={{ flex:1, fontSize:15, color:"var(--text)" }}>대한민국 +82</span>
                <Icon.ChevronDown size={16} style={{ color:"var(--muted)", flexShrink:0 }}/>
              </div>
              {/* 휴대폰 번호 */}
              <div className="col">
                <div className="row middle" style={{ gap:14, padding:"0 16px", height:56,
                  borderBottom: phoneSent && !phoneVerified ? "1px solid var(--border)" : "none" }}>
                  <Icon.Mic size={18} style={{ color: phoneVerified ? "var(--success)" : "var(--muted)", flexShrink:0 }}/>
                  <input type="tel" style={{ flex:1, border:"none", outline:"none", background:"transparent",
                    fontSize:15, color:"var(--text)", fontFamily:"var(--font-sans)" }}
                    placeholder="휴대폰 번호 (- 없이 숫자만)"
                    value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,""))}
                    disabled={phoneVerified}/>
                  {phoneVerified
                    ? <span className="caption" style={{ color:"var(--success)", fontWeight:600, flexShrink:0 }}>인증완료</span>
                    : <button onClick={sendCode} disabled={phone.length < 10}
                        style={{ border:"1px solid var(--accent)", borderRadius:6, background:"transparent",
                          color:"var(--accent)", padding:"6px 12px", fontSize:13, fontWeight:600,
                          cursor:"pointer", flexShrink:0, fontFamily:"var(--font-sans)",
                          opacity: phone.length < 10 ? .5 : 1 }}>
                        {phoneSent ? "재전송" : "인증번호 발송"}
                      </button>
                  }
                </div>
                {/* 인증번호 입력 */}
                {phoneSent && !phoneVerified && (
                  <div className="row middle" style={{ gap:14, padding:"0 16px", height:56 }}>
                    <Icon.Check size={18} style={{ color:"var(--muted)", flexShrink:0 }}/>
                    <input style={{ flex:1, border:"none", outline:"none", background:"transparent",
                      fontSize:15, color:"var(--text)", fontFamily:"var(--font-mono)", letterSpacing:"0.1em" }}
                      placeholder="인증번호 6자리"
                      value={verifyCode} onChange={e => setVerifyCode(e.target.value.replace(/\D/g,"").slice(0,6))}
                      maxLength={6}/>
                    {timer > 0 && (
                      <span className="mono" style={{ fontSize:13, color: timer < 30 ? "var(--danger)" : "var(--muted)", flexShrink:0 }}>{timerStr}</span>
                    )}
                    <button onClick={checkCode} disabled={verifyCode.length !== 6}
                      style={{ border:"1px solid var(--accent)", borderRadius:6, background:"transparent",
                        color:"var(--accent)", padding:"6px 12px", fontSize:13, fontWeight:600,
                        cursor:"pointer", flexShrink:0, fontFamily:"var(--font-sans)",
                        opacity: verifyCode.length !== 6 ? .5 : 1 }}>
                      확인
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 가입 완료 버튼 */}
            <button className="btn primary xl" style={{ width:"100%", borderRadius:14, marginTop:4 }}
              onClick={() => goTo("board")}>
              가입 완료
            </button>
          </div>
        )}
      </div>
    </div>);

}
window.ScreenSignup = ScreenSignup;


// ─── helper: CheckCircle ───
function CheckCircle({ checked, small }) {
  const s = small ? 20 : 26;
  return (
    <div style={{
      width: s, height: s, borderRadius: "50%", flexShrink: 0,
      background: checked ? "var(--accent)" : "var(--elev)",
      border: `1.5px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background .12s, border-color .12s"
    }}>
      {checked && <Icon.Check size={small ? 10 : 14} style={{ color: "var(--accent-ink)" }} />}
    </div>);

}

// ─── helper: PasswordStrength ───
function PasswordStrength({ pw }) {
  const checks = [
  { t: "8자 이상", ok: pw.length >= 8 },
  { t: "영문 포함", ok: /[a-zA-Z]/.test(pw) },
  { t: "숫자 포함", ok: /[0-9]/.test(pw) },
  { t: "특수문자", ok: /[^a-zA-Z0-9]/.test(pw) }];

  const score = checks.filter((c) => c.ok).length;
  const colors = ["var(--danger)", "var(--danger)", "var(--warning)", "var(--warning)", "var(--success)"];
  const labels = ["", "취약", "취약", "보통", "강함"];
  return (
    <div className="col" style={{ gap: 8 }}>
      <div className="row" style={{ gap: 4 }}>
        {[0, 1, 2, 3].map((i) =>
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < score ? colors[score] : "var(--elev-2)",
          transition: "background .2s"
        }} />
        )}
      </div>
      <div className="row between">
        <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
          {checks.map((c) =>
          <span key={c.t} className="caption mono" style={{ color: c.ok ? "var(--success)" : "var(--muted-2)" }}>
              {c.ok ? "✓" : "·"} {c.t}
            </span>
          )}
        </div>
        {score > 0 &&
        <span className="caption mono" style={{ color: colors[score], fontWeight: 600 }}>{labels[score]}</span>
        }
      </div>
    </div>);

}