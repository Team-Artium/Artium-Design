# Artium-Design-Web-

웹 초기 디자인(참고용)

빌드 과정 없이 React + Babel standalone으로 동작하는 SPA. `index.html`을 그대로 열거나 GitHub Pages로 배포한다.

## 라우팅

GitHub Pages는 서버 측 SPA fallback을 지원하지 않으므로 **hash 기반 라우팅**을 사용한다. 라우팅 로직은 전부 `app.jsx`에서 처리하며, URL hash로 화면 상태를 관리해 새로고침·딥링크·브라우저 뒤로/앞으로 가기를 지원한다.

### URL 형식

```
#/<route>            예: #/board
#/<route>/<param>    예: #/detail/d-101
```

- hash가 없으면 기본 라우트인 `#/auth`(로그인)로 진입한다.
- `param`은 데모 id를 받는 라우트(`detail`, `lyrics-view`)에서만 사용한다.

### 전체 라우트

| URL | 라우트 id | 화면 | 컴포넌트 | 비고 |
|-----|-----------|------|----------|------|
| `#/auth` | `auth` | 로그인 | `ScreenAuth` | **기본 진입 화면** · 전체화면 |
| `#/signup` | `signup` | 회원가입 | `ScreenSignup` | 전체화면 |
| `#/home` | `home` | 데모 게시판 | `ScreenBoard` | 전체화면(자체 탑바 포함) |
| `#/detail/<demoId>` | `detail` | 데모 상세 | `ScreenDemoDetail` | 앱 셸 · 데모 id 필요 |
| `#/upload` | `upload` | 데모 업로드 | `ScreenUpload` | 앱 셸 |
| `#/my` | `my` | 업로드한 데모곡 | `ScreenMyDemos` | 전체화면 |
| `#/lyrics-view/<demoId>` | `lyrics-view` | 받은 가사 | `ScreenLyricsView` | 전체화면 · 데모 id 필요 |
| `#/participated` | `participated` | 참여한 데모곡 | `ScreenParticipatedDemos` | 전체화면 |
| `#/inbox` | `inbox` | 받은편지함 | `ScreenInbox` | 앱 셸 |
| `#/profile` | `profile` | 프로필 | `ScreenProfile` | 앱 셸 |
| `#/billing` | `billing` | 플랜 & 결제 | `ScreenBilling` | 앱 셸 |

### 화면 이동

코드 내에서는 `goTo(route, payload)`로 화면을 전환한다.

```jsx
goTo("home")                // #/home 로 이동
goTo("detail", "d-101")     // #/detail/d-101 로 이동
goTo("lyrics-view", "d-101")// #/lyrics-view/d-101 로 이동
```

`goTo`는 hash를 갱신하므로 주소창 URL이 함께 바뀌고, 그 URL을 직접 열거나 새로고침하면 같은 화면으로 복원된다. 브라우저 뒤로/앞으로 가기는 `hashchange` 이벤트로 처리된다.
