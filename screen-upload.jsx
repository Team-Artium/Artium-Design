// screen-upload.jsx — 데모 업로드 (단일 폼)

const COUNTRIES = ["한국어", "영어", "일본어", "중국어", "스페인어", "포르투갈어", "프랑스어", "기타"];
const INSTRUMENTS = ["피아노", "기타", "베이스", "드럼", "현악", "관악", "신디사이저", "보컬만", "인스트루멘탈"];

function ScreenUpload({ goTo }) {
  const D = window.ARTIUM_DATA;
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [genre, setGenre] = React.useState(["발라드"]);
  const [country, setCountry] = React.useState([]);
  const [instrument, setInstrument] = React.useState([]);
  const [audioFile, setAudioFile] = React.useState(null);
  const FILENAME_HINT = "곡제목_BPM_키_가이드여부.mp3";
  const audioValid = audioFile ? /^.+_\d+bpm_.+\.(mp3|wav|m4a)$/i.test(audioFile) : true;

  const toggle = (arr, set, v, max) => {
    if (arr.includes(v)) set(arr.filter(x => x !== v));
    else if (!max || arr.length < max) set([...arr, v]);
  };

  return (
    <div className="col" style={{gap:24, maxWidth:900, marginInline:"auto"}}>
      <div className="page-head">
        <div className="titles">
          <div className="eyebrow">새로운 작품</div>
          <h1 className="h-1">데모 업로드</h1>
        </div>
      </div>

      <div className="card" style={{padding:36}}>
        <div className="col" style={{gap:24}}>

          {/* 오디오 업로드 */}
          <div className="field">
            <label style={{fontSize:14, fontWeight:700, color:"var(--text)"}}>오디오 파일</label>
            <div className="caption" style={{marginBottom:8}}>MP3, WAV, M4A · 최대 30MB · 워터마크 자동 삽입</div>
            <div style={{
              padding:"32px 24px", textAlign:"center", borderRadius:12,
              border:"1.5px dashed " + (audioFile && !audioValid ? "var(--danger)" : "var(--border-strong)"),
              background: audioFile && !audioValid ? "rgba(255,84,112,.06)" : "var(--elev)",
            }}>
              {!audioFile ? (
                <>
                  <div style={{width:48, height:48, borderRadius:12, background:"var(--surface)",
                    display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px"}}>
                    <Icon.Music size={22} style={{color:"var(--muted)"}}/>
                  </div>
                  <div style={{fontWeight:600, fontSize:15, marginBottom:4}}>오디오 파일을 드래그해서 올려주세요</div>
                  <div className="caption" style={{marginBottom:12}}>
                    권장 파일명: <span className="mono" style={{color:"var(--text-2)"}}>{FILENAME_HINT}</span>
                  </div>
                  <button className="btn outline" onClick={() => setAudioFile("데모곡0001_78bpm_Am_guideF.mp3")}>
                    <Icon.Upload size={13}/> 파일 선택
                  </button>
                </>
              ) : (
                <div className="col" style={{gap:12}}>
                  <div className="row middle" style={{gap:12, textAlign:"left",
                    padding:"12px 14px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10}}>
                    <div style={{width:38, height:38, borderRadius:8, background:"var(--accent)", color:"var(--accent-ink)",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                      <Icon.Music size={16}/>
                    </div>
                    <div className="col" style={{gap:1, flex:1, minWidth:0}}>
                      <div className="mono" style={{fontSize:13, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{audioFile}</div>
                      <div className="caption">24.8MB</div>
                    </div>
                    {audioValid && <span style={{display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:600, color:"var(--success)", flexShrink:0}}><Icon.Check size={13}/> 업로드 완료</span>}
                    <button className="btn sm ghost icon" onClick={() => setAudioFile(null)}><Icon.X size={13}/></button>
                  </div>

                </div>
              )}
            </div>
            {audioFile && !audioValid && (
              <div className="row middle" style={{gap:6, color:"var(--danger)", marginTop:4}}>
                <Icon.X size={13}/>
                <span className="body-sm">파일명 규칙: <span className="mono">{FILENAME_HINT}</span></span>
              </div>
            )}
          </div>

          <div className="divider"/>

          {/* 제목 */}
          <div className="field">
            <label>제목 (가제목)</label>
            <input className="input lg" placeholder="예: 데모곡0001"
              value={title} onChange={e => setTitle(e.target.value)}/>
          </div>

          {/* 곡 설명 */}
          <div className="field">
            <label>곡 설명</label>
            <textarea className="textarea" style={{minHeight:96}}
              placeholder="이 곡의 분위기, 감정, 상황 등을 자유롭게 설명해주세요."
              value={desc} onChange={e => setDesc(e.target.value)}/>
          </div>

          {/* 장르 */}
          <div className="field">
            <label>장르 (최대 3개)</label>
            <div className="row" style={{gap:6, flexWrap:"wrap"}}>
              {D.GENRES.map(g => (
                <button key={g} className={"chip " + (genre.includes(g) ? "active" : "")}
                  onClick={() => toggle(genre, setGenre, g, 3)}>{g}</button>
              ))}
            </div>
          </div>

          {/* 나라별 (언어) */}
          <div className="field">
            <label>가사 언어 · 나라 (최대 3개)</label>
            <div className="row" style={{gap:6, flexWrap:"wrap"}}>
              {COUNTRIES.map(c => (
                <button key={c} className={"chip " + (country.includes(c) ? "active" : "")}
                  onClick={() => toggle(country, setCountry, c, 3)}>{c}</button>
              ))}
            </div>
          </div>

          {/* 악기 */}
          <div className="field">
            <label>주요 악기 (최대 5개)</label>
            <div className="row" style={{gap:6, flexWrap:"wrap"}}>
              {INSTRUMENTS.map(inst => (
                <button key={inst} className={"chip " + (instrument.includes(inst) ? "active" : "")}
                  onClick={() => toggle(instrument, setInstrument, inst, 5)}>{inst}</button>
              ))}
            </div>
          </div>

          {/* 해시태그 */}
          <div className="field">
            <label>해시태그</label>
            <input className="input" placeholder="#발라드 #감성 #새벽감성"/>
            <div className="caption">스페이스 또는 쉼표로 구분 · 최대 8개 · 10글자 이내</div>
          </div>

          {/* 마감 날짜 / 시간 */}
          <div className="field">
            <label>마감 날짜 / 시간</label>
            <div className="row" style={{gap:12}}>
              <input className="input" type="date" defaultValue="2026-06-18" style={{flex:1.5}}/>
              <select className="select" style={{flex:1}}>
                {["00:00","06:00","09:00","12:00","15:00","16:00","18:00","21:00","23:59"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="caption">마감 시간 이후 가사 제출이 불가합니다.</div>
          </div>

          <div className="divider"/>

          {/* 제출 */}
          <div className="row" style={{justifyContent:"flex-end", gap:10}}>
            <button className="btn outline" style={{height:48}} onClick={() => goTo("home")}>취소</button>
            <button className="btn primary lg" style={{height:48}} onClick={() => goTo("home")}>
              <Icon.Upload size={15}/> 업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.ScreenUpload = ScreenUpload;
