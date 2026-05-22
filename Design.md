# ARTIUM: Connect-E — Design Specification
> 작곡가 × 작사가 매칭 플랫폼 · 프론트엔드 구현 핸드오프 문서  
> 최종 업데이트: 2026.05

---

## 1. 개요 (Overview)

ARTIUM Connect-E는 작곡가가 데모곡을 업로드하고, 작사가가 가사를 응모·제출하는 B2B2C 플랫폼입니다.  
데스크탑 웹 (1440px 기준) 단일 플랫폼으로 구현합니다.

---

## 2. 디자인 시스템 (Design System)

### 2.1 컬러 토큰

| 토큰 | 라이트 값 | 설명 |
|---|---|---|
| `--bg` | `#faf9f5` | 페이지 배경 |
| `--surface` | `#ffffff` | 카드, 헤더 배경 |
| `--elev` | `#f4f3ee` | 1단계 상승 배경 (hover, 드롭다운 내부) |
| `--elev-2` | `#ecebe4` | 2단계 상승 배경 |
| `--border` | `#e6e4dc` | 기본 구분선 |
| `--border-strong` | `#c9c6bb` | 강조 구분선 (포커스, 호버) |
| `--text` | `#1a1a1d` | 본문 텍스트 |
| `--text-2` | `#44444a` | 보조 텍스트 |
| `--muted` | `#82828a` | 비활성/힌트 텍스트 |
| `--muted-2` | `#aeadb2` | 더 약한 힌트 |
| `--accent` | `#FF5C2B` | 주 액센트 (Vermillion) |
| `--accent-ink` | `#ffffff` | 액센트 위 텍스트 |
| `--accent-soft` | `rgba(255,92,43,.10)` | 액센트 배경 (선택 상태) |
| `--danger` | `#e8274b` | 오류·삭제 |
| `--success` | `#1f9e6e` | 완료·채택 |
| `--warning` | `#d08a00` | 경고 |

> 액센트 컬러 변형 (추후 브랜드 방향에 따라 선택):
> - Lime: `#DEFF4D` / Cobalt: `#3461FF` / Ink: `#111111`

### 2.2 타이포그래피

| 폰트 역할 | 폰트 패밀리 | 용도 |
|---|---|---|
| `--font-sans` | `THE명품고딕` → `Pretendard Variable` → system-ui | 모든 UI 텍스트 |
| `--font-mono` | `JetBrains Mono` → `SF Mono` → ui-monospace | 파일명, 수치, 코드, eyebrow |
| `--font-serif` | `Noto Serif KR` → Georgia | (현재 미사용, 에디토리얼 확장 여지) |

> **THE명품고딕**은 `local()` 방식으로 설치된 환경에서 우선 적용하며, 미설치 시 Pretendard로 자동 폴백됩니다.  
> Pretendard는 CDN(`cdn.jsdelivr.net/gh/orioncactus/pretendard`) 통해 Variable 웨이트로 로드합니다.

#### 타입 스케일

| 클래스 | 크기 | 웨이트 | 자간 | 줄간격 |
|---|---|---|---|---|
| `.h-display` | 56px | 700 | -0.025em | 1.02 |
| `.h-1` | 32px | 700 | -0.018em | 1.12 |
| `.h-2` | 22px | 700 | -0.012em | 1.20 |
| `.h-3` | 17px | 700 | -0.006em | 1.30 |
| `.h-4` | 14px | 700 | 0 | 1.30 |
| `.body` | 14px | 400 | -0.005em | 1.50 |
| `.body-sm` | 13px | 400 | -0.005em | 1.45 |
| `.caption` | 12px | 400 | 0 | 1.40 |
| `.eyebrow` | 11px | — | +0.08em | — |
| `.mono` | 상속 | — | 0 | — |

### 2.3 간격 (Spacing)

```
--s-1: 4px   --s-2: 8px   --s-3: 12px  --s-4: 16px
--s-5: 20px  --s-6: 24px  --s-7: 32px  --s-8: 40px
--s-9: 56px  --s-10: 72px
```

### 2.4 Border Radius

```
--r-xs: 4px  --r-sm: 6px  --r-md: 10px  --r-lg: 14px  --r-xl: 20px
```

### 2.5 Shadow

```css
--shadow-sm: 0 1px 2px rgba(20,20,30,.06), 0 0 0 .5px rgba(20,20,30,.05);
--shadow-md: 0 6px 22px rgba(20,20,30,.07), 0 0 0 .5px rgba(20,20,30,.05);
--shadow-lg: 0 18px 50px rgba(20,20,30,.12), 0 0 0 .5px rgba(20,20,30,.06);
```

---

## 3. 공통 컴포넌트 (Components)

### 3.1 버튼

| 변형 | 배경 | 텍스트 | 높이 |
|---|---|---|---|
| `.btn` (기본) | `--elev` | `--text` | 40px |
| `.btn.primary` | `--accent` | `--accent-ink` | 40px |
| `.btn.outline` | transparent | `--text` | 40px (border: 1px solid --border) |
| `.btn.ghost` | transparent | `--text` | 40px |
| `.btn.sm` | 위와 동일 | — | 32px |
| `.btn.lg` | 위와 동일 | — | 48px |
| `.btn.xl` | 위와 동일 | — | 56px |

- font-weight: 600 / font-size: 14px / border-radius: 10px
- hover: 기본버튼은 `--elev-2`, primary는 `brightness(1.08)`
- active: `translateY(0.5px)`
- disabled: `opacity: 0.5; cursor: not-allowed`

### 3.2 카드

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg); /* 14px */
}
```

- hover 시 `border-color: --border-strong` + `box-shadow: --shadow-sm` 적용

### 3.3 인풋 / 텍스트에어리어

```css
.input, .textarea, .select {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
}
/* focus: border-color → --accent */
```

### 3.4 칩 (Chip / Filter)

- 기본: `background: --elev / border: 1px solid --border / height: 28px`
- active: `background: --text / color: --bg`
- filter-active (필터 선택): `background: --accent-soft / border: --accent / color: --accent`

### 3.5 상태 배지 (StatusPill)

| 상태 | 배경 | 텍스트 컬러 |
|---|---|---|
| 공개 모집 | `rgba(93,220,164,.14)` | `#5ddca4` |
| 심사 중 | `rgba(255,194,77,.14)` | `#ffc24d` |
| 마감 | `rgba(122,122,130,.18)` | `--muted` |

### 3.6 세그먼트 토글 (`.seg`)

```css
.seg { display: inline-flex; padding: 3px; background: --elev; border-radius: 10px; }
.seg button.active { background: --surface; box-shadow: --shadow-sm; }
```

### 3.7 탭 (`.tabs`)

- 하단 2px 액센트 라인으로 active 표시
- 비활성: `color: --muted` / hover: `color: --text-2` / active: `color: --text`

### 3.8 진행 표시줄 (`.progress-bar`)

```css
.progress-bar { height: 4px; background: --elev; border-radius: 999px; }
.progress-bar > i { display: block; height: 100%; background: --accent; transition: width .3s ease; }
```

---

## 4. 화면 목록 및 라우팅 (Screens & Routing)

### 4.1 라우트 맵

| Route | 화면 | 레이아웃 | 접근 조건 |
|---|---|---|---|
| `/login` | 로그인 | 풀스크린 (자체 컨테이너) | 비로그인 |
| `/signup` | 회원가입 (2단계) | 풀스크린 | 비로그인 |
| `/board` | 데모 게시판 (메인) | 자체 탑바 풀스크린 | 로그인 |
| `/demo/:id` | 데모 상세 | 공통 탑바 | 로그인 |
| `/upload` | 데모 업로드 | 공통 탑바 | 로그인 (작곡가 유료) |
| `/my-demos` | 업로드한 데모곡 | 자체 탑바 풀스크린 | 로그인 (작곡가) |
| `/participated` | 참여한 데모곡 | 자체 탑바 풀스크린 | 로그인 (작사가) |
| `/lyrics-view/:demoId` | 받은 가사 | 자체 탑바 풀스크린 | 로그인 (작곡가) |
| `/profile` | 프로필 | 공통 탑바 | 로그인 |
| `/billing` | 플랜 & 결제 | 공통 탑바 | 로그인 |

### 4.2 공통 탑바 (Topbar)

- 높이: 64px / `position: sticky; top: 0; z-index: 50`
- 배경: `--surface`, 하단 `1px solid --border`
- 좌: 뒤로가기 버튼 (`←`)
- 중앙: ARTIUM 로고
- 우: 알림 버튼 (미구현, 서버 연동 예정)

### 4.3 게시판 전용 탑바 (BoardTopbar)

- 높이: 68px
- 좌: 로고 / 우: 유저명 + 프로필 아이콘
- 중간: `데모곡 올리기` 버튼 (작곡가 유료 플랜만 표시)

---

## 5. 화면별 상세 스펙

### 5.1 로그인 화면

**레이아웃**
- 단일 컬럼, 중앙 정렬
- 최대 너비: 480px
- 카드 패딩: `40px 48px` / border-radius: 20px / box-shadow: `--shadow-md`

**매칭 애니메이션 (MatchingTicker)**
- 발매 매칭된 작곡가·작사가 정보를 순환 표시
- 텍스트 형식: `홍○○ - 김○○, ARTIUM / [곡제목] · 발매 확정`
- 이름 3번째 글자는 `O`로 마스킹
- 애니메이션:
  - enter: `translateY(18px) → 0` + `opacity 0 → 1` / duration: 600ms / easing: `cubic-bezier(.22,.68,0,1.2)`
  - visible: 2.8초 유지
  - exit: `translateY(-14px)` + `opacity → 0` / duration: 500ms
  - 전환 주기: 3.9초
- 컨테이너: `height: 72px; overflow: hidden`

**폼 구성**
- 이메일 input (type=email)
- 비밀번호 input (type=password)
- 비밀번호 찾기 링크 (우측 정렬)
- 로그인 버튼 (`btn primary xl`, width: 100%)
- 소셜 로그인: Google, NAVER
- 회원가입 링크

---

### 5.2 회원가입 화면 (2단계)

**STEP 1 — 약관 동의**
- 전체 동의 버튼 (CheckCircle UI)
- 개별 항목: 이용약관 [필수], 개인정보 처리방침 [필수], 마케팅 수신 [선택]
- 필수 항목 미동의 시 다음 버튼 비활성화

**STEP 2 — 계정 정보**

역할 선택 (작곡가/작사가) — 반드시 하나 선택 필수

그룹 1: 이름 · 생년월일 · 성별
```
┌─────────────────────────────┐
│ 👤  이름 (실명)              │
├─────────────────────────────┤
│ 📅  생년월일 8자리           │
├────────────┬────────────────┤
│    남성    │    여성   │선택안함│
└────────────┴────────────────┘
```
- 생년월일: 숫자 8자리 직접 입력 (YYYYMMDD)
- 성별: 3등분 버튼, 선택 시 `--accent-soft` 배경 + `--accent` 텍스트

안내 문구: 신분증 상의 이름, 생년월일, 성별과 일치해야 실명인증이 가능합니다.

그룹 2: 이메일 · 비밀번호 · 비밀번호 확인
- 비밀번호 강도 표시 (4단계 바: 취약/취약/보통/강함)
  - 검사 항목: 8자 이상 / 영문 포함 / 숫자 포함 / 특수문자 포함
  - 컬러: 취약=`--danger`, 보통=`--warning`, 강함=`--success`
- 비밀번호 불일치: 빨간 X 아이콘 / 일치: 초록 체크 아이콘

그룹 3: 국가 코드 · 휴대폰 인증
- 국가: 대한민국 +82 (드롭다운)
- 인증번호 발송 → 6자리 입력 → 타이머 (3분, 30초 미만 시 빨간색) → 확인
- 인증 완료 시 녹색 텍스트 표시

---

### 5.3 데모 게시판 (메인)

**레이아웃**: 풀스크린, 컨텐츠 최대 너비 860px, 중앙 정렬

**필터 바**
- 필터링(장르·악기) 버튼: 드롭다운 → 장르 칩 + 무드 칩 선택
- 해시태그(#단어) 버튼: 드롭다운 → 해시태그 칩 선택
- 선택된 필터 수 뱃지 (액센트 원형)
- 데모곡 올리기 버튼 (필터 바 내 우측)
- 드롭다운 외부 클릭 시 닫힘

**데모 카드 (게시판형)**
```
┌────────────────────────────────────────────────────┐
│ 데모곡0001                              [참여]버튼  │
│                                                    │
│ 곡 설명 2줄 (텍스트 클램프)                          │
│                                                    │
│ #해시태그1  #해시태그2  #해시태그3    작곡가 (닉네임) │
└────────────────────────────────────────────────────┘
```
- 카드 클릭 → 데모 상세 페이지 이동
- 참여 버튼 클릭 → 데모 상세 페이지 이동
- hover: `border-color: --border-strong`, `box-shadow: --shadow-sm`
- 제목: `font-weight: 800 / font-size: 20px / letter-spacing: -0.018em`
- 해시태그: 첫 2개 액센트 컬러, 이후 `--text-2`

---

### 5.4 데모 상세 페이지

**레이아웃**: 컨텐츠 최대 너비 960px, 패딩 `32px 40px`

**카드 구조 (padding: 40px 48px)**

1. **신고 버튼** — 우상단 고정 (40×40px), 호버 시 `--danger` 컬러 (경광등 아이콘)
2. **제목** — 데모_XXXX, `font-size: 52px, font-weight: 800`
3. **음원 플레이어 + 곡설명 자료** (그리드 `1fr auto`)
   - 플레이어: 재생/정지 버튼(48×48px, 원형, `--accent`) + 파형 + 경과시간
   - 곡설명 자료: 파일 아이콘 카드 — 호버 시 `--accent` 테두리 + 다운로드 버튼 출현
4. **곡 설명** — `--elev` 배경 텍스트 박스
5. **해시태그** — `--accent` 컬러 텍스트, 우측 "(필터링과는 중복 불가) (10글자씩. 총 5개)" 안내
6. **마감 기한** — `font-size: 24-28px, font-weight: 800, color: --accent`
7. **가사 업로드** — 파일명 규칙 강조 (`데모제목_닉네임_마감날짜.word`)
   - 파일 테이블: 파일명 / 업로드 상태 / 용량 / 다운로드 가능기간
   - 드래그 & 드롭 업로드 영역
   - 잘못된 파일 형식 (word 외): `--danger` 컬러로 "word만 가능!" 표시

**파일명 규칙**: `데모제목_닉네임_마감날짜.docx` (word만 허용)

---

### 5.5 데모 업로드 (단일 폼)

**레이아웃**: 최대 너비 900px, 단일 카드 폼

**섹션 순서**
1. 오디오 파일 업로드 (MP3/WAV/M4A, 최대 30MB)
   - 파일명 규칙: `곡제목_BPM_키_가이드여부.mp3`
   - 업로드 후: 파일명 + 용량 + "업로드 완료" 표시
   - 워터마크: 검토 단계 자동 삽입, 채택 후 원본 전달
2. — 구분선 —
3. 제목 (가제목)
4. 곡 설명 (textarea)
5. 장르 칩 선택 (최대 3개)
6. 가사 언어·나라 칩 선택 (최대 3개): 한국어/영어/일본어/중국어/스페인어/포르투갈어/프랑스어/기타
7. 주요 악기 칩 선택 (최대 5개): 피아노/기타/베이스/드럼/현악/관악/신디사이저/보컬만/인스트루멘탈
8. 해시태그 (스페이스/쉼표 구분, 최대 8개, 10글자 이내)
9. 마감 날짜 + 시간 (date picker + select: 기본값 16:00)
10. — 구분선 —
11. 취소 / 업로드 버튼 (height: 48px)

---

### 5.6 프로필 페이지

**레이아웃**: 최대 너비 720px, 중앙 정렬

**헤더 카드**: 프로필 아이콘 (80×80px, border-radius: 18px) + 닉네임 (`font-size: 32px, font-weight: 800`) + 핸들/플랜 + 편집 버튼

**섹션 카드 1 — 활동**
- 업로드한 데모곡 → `/my-demos` 이동
- 참여한 데모곡 → `/participated` 이동
- 결제 (구독) → `/billing` 이동

**섹션 카드 2 — 설정**
- 프로필 설정
- 앱 설정
- 개인정보/서비스 이용약관

**섹션 카드 3 — 로그아웃**
- 텍스트: 빨간색 (`--danger`)

> 각 MenuItem: 아이콘 없음 / `font-size: 15px, font-weight: 600` / hover 시 `--elev` 배경

---

### 5.7 업로드한 데모곡 페이지

**레이아웃**: 자체 탑바, 컨텐츠 최대 너비 860px

**검색바**: height 48px, border-radius 12px

**데모 카드**
```
┌──────────────────────────────────────────────────┐
│ 데모_1112                       [수정] 버튼       │  ← 모집 중
│ 데모_1113          [가사 보기] [마감(비활성)] 버튼  │  ← 마감됨
│                                                  │
│ 곡 설명 2줄                                       │
│ #장르1  #장르2  #해시태그1      작곡가 (닉네임)    │
└──────────────────────────────────────────────────┘
```
- 모집 중: 우상단 수정 버튼만 (→ 업로드 페이지)
- 마감됨: 가사 보기 버튼 (→ 받은 가사 페이지) + 마감 텍스트 (비활성화 스타일)
- 카드 클릭 → 데모 상세 이동

---

### 5.8 참여한 데모곡 페이지

**레이아웃**: 자체 탑바, 컨텐츠 최대 너비 860px

**검색바 + 횟수 카운터** (가로 정렬, 동일 높이 48px)
- 카운터: `남은 횟수 N회 / 총 보낸 개수 N회` (남은 횟수: `--accent` 컬러)

**데모 카드**: 상태 배지 없음 / 클릭 → 데모 상세 이동

---

### 5.9 받은 가사 페이지 (Lyrics View)

**레이아웃**: 자체 탑바, 컨텐츠 최대 너비 860px

**헤더**: 뒤로가기(→ 업로드한 데모곡) + 제목 + 총 파일 수 + 전체 다운로드 버튼

**파일 리스트**
```
┌──────────────────────────────────────────────────┐
│ 📄 파일명.docx                   32KB  [다운로드] │
├──────────────────────────────────────────────────┤
│ 📄 파일명.docx                   28KB  [다운로드] │
└──────────────────────────────────────────────────┘
```
- 파일명: `JetBrains Mono` 폰트
- 짝수 행: `--surface` / 홀수 행: `--elev`
- hover: `--elev-2`
- 다운로드: 실제 파일 다운로드 트리거

---

## 6. 인터랙션 패턴

### 6.1 필터 드롭다운 (게시판)
- 버튼 클릭 시 드롭다운 열림, 다른 버튼 클릭 시 현재 닫힘
- 외부 클릭 시 자동 닫힘 (addEventListener 방식)
- 적용 버튼 클릭 또는 다른 영역 클릭 시 닫힘

### 6.2 파일 업로드 (드래그 & 드롭)
- `onDragOver`: 배경 `--accent-soft` 강조
- `onDrop`: 파일 추가 및 유효성 검사
- 파일명 규칙 위반 시: `--danger` 테두리 + 에러 메시지

### 6.3 휴대폰 인증 (회원가입)
- 인증번호 발송 후 3분 타이머 (setInterval, 1초마다 감소)
- 타이머 30초 미만: `--danger` 컬러로 전환
- 6자리 입력 완료 시 확인 버튼 활성화

### 6.4 비밀번호 강도 표시
- 4개 항목 통과 수에 따라 색상 변화
- `0-1`: danger, `2-3`: warning, `4`: success

### 6.5 데모 카드 hover
```css
card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-sm);
}
```
transition: 120ms

---

## 7. API 연동 포인트 (서버 연동 예정)

| 기능 | 엔드포인트 | 비고 |
|---|---|---|
| 로그인 | `POST /auth/login` | email + password |
| 소셜 로그인 | `POST /auth/social` | provider: google/naver |
| 회원가입 | `POST /auth/signup` | 이름/전화/이메일/비번/생년월일/성별/역할 |
| 전화 인증 발송 | `POST /auth/phone/send` | phone |
| 전화 인증 확인 | `POST /auth/phone/verify` | phone + code |
| 데모 목록 | `GET /demos` | 장르/무드/해시태그 필터 쿼리 파라미터 |
| 데모 상세 | `GET /demos/:id` | |
| 데모 업로드 | `POST /demos` | multipart/form-data (오디오 파일 포함) |
| 데모 수정 | `PATCH /demos/:id` | |
| 가사 업로드 | `POST /demos/:id/lyrics` | .docx only |
| 가사 목록 | `GET /demos/:id/lyrics` | 작곡가 전용 |
| 가사 다운로드 | `GET /lyrics/:id/download` | |
| 내 업로드 목록 | `GET /my/demos` | |
| 참여한 목록 | `GET /my/participated` | 제출 횟수 포함 |
| 프로필 조회 | `GET /profile` | |
| 플랜 정보 | `GET /billing/plan` | |

---

## 8. 파일 명명 규칙

### 데모곡 오디오 파일
```
곡제목_BPM_키_가이드여부.mp3
예: 흐릿한새벽_78bpm_Am_guideF.mp3
```

### 가사 파일
```
데모제목_닉네임_마감날짜.docx
예: 흐릿한새벽_오재희_2026.05.16.docx
```
- `.docx` (Word) 파일만 허용
- 규칙 위반 시 서버에서 400 반환 + UI에서 에러 표시

---

## 9. 접근성 & 반응형

- 최소 지원 해상도: 1280px 이상 (데스크탑 웹 전용)
- 모든 인터랙티브 요소에 `aria-label` 필수
- 포커스 스타일: `outline: 2px solid --accent; outline-offset: 2px`
- 이미지/아이콘 alt 필수
- 색상만으로 상태를 표시하지 않음 (텍스트 또는 아이콘 병행)

---

## 10. 아이콘 시스템

모든 아이콘은 stroke-based SVG (20×20 viewBox, strokeWidth: 1.6)를 사용합니다.  
현재 구현된 아이콘 목록:

`Home, Compass, Feed, Inbox, Profile, Briefcase, Wallet, Music, Pen, Search, Plus, Filter, Bell, Settings, Play, Pause, Skip, Heart, Bookmark, Share, Upload, Download, File, Mic, Lock, Mail, Check, X, ChevronRight, ChevronLeft, ChevronDown, ArrowRight, ArrowUpRight, Sparkle, Eye, Calendar, Clock, Tag, Grid, List, Sort, More, Crown, Star, Spotify, Globe, Siren, Flag`

---

*본 문서는 ARTIUM Connect-E 프로토타입 (2026.05 기준) 기반으로 작성되었습니다.  
실제 구현 시 서버 스펙에 따라 일부 내용이 변경될 수 있습니다.*
