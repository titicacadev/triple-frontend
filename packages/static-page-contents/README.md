# Static Page Component

StaticPageContents 는 triple-static-pages repository 에 있는 정적 파일을 표시하기 위한 컴포넌트입니다.

## Props

```ts
type Props = {
  /** 표시할 정적 파일 명 (확장자까지 포함시켜야 합니다.) */
  src: string
  /** 정적파일 로딩이 실패되었을 때 */
  onFallback?: () => JSX.Element
}
```

## Usage

```jsx
import StaticContents from '@titicaca/static-contents'
import Popup from '@titicaca/popup'

const PolicyPopup = () => {
  return (
    <Popup open={true}>
      <StaticContents src="hotel-service-policy.html" />
      <StaticContents src="air/reservation/private-policy.html" />
    </Popup>
  )
}
```

호텔 서비스 정책을 표시하고 싶다면

   <StaticContents src="hotel-service-policy.html" />

- <https://github.com/titicacadev/triple-static-pages/src/hotel-service-policy.md>

항공 개인정보 이용동의를 표시하고 싶다면

   <StaticContents src="air/reservation/private-policy.html">

- <https://github.com/titicacadev/triple-static-pages/src/air/reservation/private-policy.html>

## Notice

StaticPageContents 컴포넌트는 환경에 맞게 상대 경로로 `fetch` 가 동작하기 때문에 로컬 환경에서 개발할 때에는 커스텀 서버의 proxy 설정이 필요합니다.

```ts
const dev = process.env.NODE_ENV !== 'production'
const API_URL_BASE =
  process.env.API_URI_BASE || 'https://triple-dev.titicaca-corp.com'

if (dev) {
  app.use(
    proxy('/pages', {
      target: API_URL_BASE,
      changeOrigin: true,
    }),
  )
}
```

## with Custom Style

static page 로 serving 되는 페이지들은 markdown -> html 형태로 되어있다 보니 구조적인 markup 을 가지고 있어서
스타일을 변경할 때 해당 정적 html 파일을 보면서 스타일을 변경하면 좋습니다.

```jsx
import styled from 'styled-components'
import StaticContents from '@titicaca/static-contents'

const CustomStyledStaticContents = styled(StaticPageContents)`
  li {
    list-style: disc;
  }
`
```

## with Fallback

어떤 이유에서 정적 페이지를 로드하지 못할 경우 StaticPageContents 컴포넌트는 아래의 컴포넌트를 렌더링합니다.

```jsx
<NoContent>컨텐츠를 불러올 수 없습니다.</NoContent>
```

만약 fallback 처리를 커스텀하고 싶은 경우 `JSX.Element` 를 반환하는 `onFallback` 함수를 전달하면 됩니다.

```jsx
import styled from 'styled-components'
import StaticContents from '@titicaca/static-contents'

function foo() {
  return (
    <StaticPageContents
      src="can-not-load-static-file.html"
      onFallback={() => <span>custom fallback contents</span>}
    />
  )
}
```

## Etc

어떤 이유에서 static page 를 표시할 수 없는 경우 StaticPageContents 는 `컨텐츠를 불러올 수 없습니다.` 라는 메세지를 표시하도록 합니다.

이 메세지를 혹은 컴포넌트를 커스터마이징 하려면 `onFallback` prop 을 활용할 수 있다.
