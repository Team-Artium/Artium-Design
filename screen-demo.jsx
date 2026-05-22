// screen-demo.jsx — 데모 상세 페이지 (웹 스타일)

function ScreenDemoDetail({ demoId, goTo }) {
  const D = window.ARTIUM_DATA;
  const demoIdx = D.demos.findIndex((d) => d.id === demoId);
  const demo = D.demos[demoIdx >= 0 ? demoIdx : 0];
  const demoNum = "데모_" + String((demoIdx >= 0 ? demoIdx : 0) + 1001);

  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [files, setFiles] = React.useState([
  { name: "모두의 창업_제출.pdf", status: "word만 가능!", size: "150.09KB", limit: "제한없음", invalid: true }]
  );
  const [dragging, setDragging] = React.useState(false);
  const FILENAME_RULE = "데모제목_닉네임_마감날짜.word";

  // Fake progress ticker
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => p >= 100 ? 0 : p + 0.3), 100);
    return () => clearInterval(id);
  }, [playing]);

  const addFile = (name) => {
    const valid = /\.docx?$/i.test(name);
    setFiles((prev) => [...prev, { name, status: valid ? "업로드 완료" : "word만 가능!", size: "42.00KB", limit: "제한없음", invalid: !valid }]);
  };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const elapsed = Math.floor(progress / 100 * 204);
  const timeStr = Math.floor(elapsed / 60) + ":" + String(elapsed % 60).padStart(2, "0");

  return (
    <div style={{ padding: "32px 40px 64px", background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Back link */}
        <button className="btn ghost sm" style={{ alignSelf: "flex-start", marginBottom: 16, color: "var(--text-2)", display: "flex", alignItems: "center", gap: 6 }}
        onClick={() => goTo("home")}>
          <Icon.ChevronLeft size={15} /> 게시판으로
        </button>

        {/* MAIN CARD */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 18, padding: "40px 48px",
          boxShadow: "var(--shadow-sm)", position: "relative"
        }}>

          {/* 신고 버튼 */}
          <button
            title="신고하기"
            style={{
              position: "absolute", top: 24, right: 24,
              width: 40, height: 40, borderRadius: 10,
              background: "var(--elev)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--muted)",
              transition: "color .12s, border-color .12s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--danger)"; e.currentTarget.style.borderColor = "var(--danger)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <Icon.Siren size={16}/>
          </button>

          {/* 제목 */}
          <h1 style={{ fontWeight: 800, fontSize: 52, letterSpacing: "-.03em", margin: "0 0 36px", lineHeight: 1, paddingRight: 60 }}>
            {demoNum}
          </h1>

          {/* 음원 플레이어 + 곡설명 자료 다운로드 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, marginBottom: 36, alignItems: "stretch" }}>

            {/* 오디오 플레이어 */}
            <div style={{
              background: "var(--elev)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "20px 24px"
            }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
                음원 미리듣기
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button
                  onClick={() => setPlaying(!playing)}
                  style={{
                    width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                    background: "var(--accent)", color: "var(--accent-ink)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--shadow-sm)"
                  }}>
                  {playing ? <Icon.Pause size={18} /> : <Icon.Play size={18} />}
                </button>
                <div style={{ flex: 1 }}>
                  <Waveform seed={demo.id} played={progress / 100} height={36} bars={100} playing={playing} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)" }}>{timeStr}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>{demo.duration}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 곡 설명 자료 다운로드 */}
            <div style={{
              background: "var(--elev)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "20px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, minWidth: 160, cursor: "pointer",
              transition: "border-color .12s, background .12s"
            }}
            onMouseEnter={(e) => {e.currentTarget.style.borderColor = "var(--accent)";e.currentTarget.style.background = "var(--accent-soft)";}}
            onMouseLeave={(e) => {e.currentTarget.style.borderColor = "var(--border)";e.currentTarget.style.background = "var(--elev)";}}>
              <div style={{
                width: 60, height: 60, borderRadius: 12,
                background: "var(--surface)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Icon.File size={28} style={{ color: "var(--text-2)" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>곡 설명 자료</div>
                <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.4 }}>pdf, word, ppt 등</div>
              </div>
              <button className="btn sm primary" style={{ width: "100%" }}>
                <Icon.Download size={12} /> 다운로드
              </button>
            </div>
          </div>

          {/* 곡 설명 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>곡 설명</div>
            <div style={{
              background: "var(--elev)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "18px 20px",
              fontSize: 14, lineHeight: 1.75, color: "var(--text-2)"
            }}>{demo.desc}</div>
          </div>

          {/* 해시태그 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>해시태그</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>(필터링과는 중복 불가) (10글자씩. 총 5개)</span>
            </div>
            <div style={{
              background: "var(--elev)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "16px 20px",
              display: "flex", flexWrap: "wrap", gap: 10
            }}>
              {demo.hashtags.slice(0, 5).map((h) =>
              <span key={h} style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>{h}</span>
              )}
            </div>
          </div>

          {/* 마감 기한 */}
          <div style={{ marginBottom: 36, display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 20 }}>마감 기한:</span>
            <span style={{ fontWeight: 800, fontSize: 28, color: "var(--accent)", letterSpacing: "-.01em" }}>
              {demo.deadline}. 16:00
            </span>
          </div>

          {/* 가사 업로드 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>가사 업로드</span>
              <span style={{ color: "var(--danger)", fontWeight: 800, fontSize: 14 }}>※ 중요</span>
              <span style={{
                background: "var(--accent-soft)", color: "var(--accent)",
                border: "1px solid var(--accent)", borderRadius: 6,
                padding: "3px 10px", fontSize: 12, fontWeight: 700,
                fontFamily: "var(--font-mono)"
              }}>{FILENAME_RULE}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>파일 양식 안지켜서 제출해도 횟수 복구 안돼줌ㅠ</span>
            </div>

            <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              {/* 테이블 헤더 */}
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 100px 160px",
                padding: "10px 18px", background: "var(--elev)",
                borderBottom: "1px solid var(--border)",
                fontSize: 11, color: "var(--muted)",
                fontFamily: "var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase"
              }}>
                <span>파일명</span><span>업로드 상태</span><span>용량</span><span>다운로드 가능기간</span>
              </div>

              {/* 파일 rows */}
              {files.map((f, i) =>
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 100px 160px",
                padding: "14px 18px", alignItems: "center",
                borderBottom: i < files.length - 1 ? "1px solid var(--border)" : "none",
                background: f.invalid ? "rgba(255,84,112,.04)" : "transparent"
              }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <button onClick={() => removeFile(i)} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--muted)", padding: 0, fontSize: 15, lineHeight: 1, flexShrink: 0 }}>×</button>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: f.invalid ? "var(--danger)" : "var(--success)" }}>{f.status}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-2)" }}>{f.size}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-2)" }}>{f.limit}</span>
                    <button className="btn sm primary" style={{ height: 28, fontSize: 12 }}>전환</button>
                  </div>
                </div>
              )}

              {/* 드롭존 */}
              <div
                style={{
                  padding: "20px 18px",
                  borderTop: files.length ? "1px solid var(--border)" : "none",
                  background: dragging ? "var(--accent-soft)" : "var(--elev)",
                  cursor: "pointer", transition: "background .12s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10
                }}
                onDragOver={(e) => {e.preventDefault();setDragging(true);}}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {e.preventDefault();setDragging(false);const f = e.dataTransfer.files[0];if (f) addFile(f.name);}}
                onClick={() => addFile("가사_데모0001_닉네임_2026.05.16.docx")}>
                
                <Icon.Upload size={15} style={{ color: "var(--muted)" }} />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>파일을 드래그하거나 클릭해서 업로드</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
window.ScreenDemoDetail = ScreenDemoDetail;

function LyricsSubmitModal() {return null;}
window.LyricsSubmitModal = LyricsSubmitModal;