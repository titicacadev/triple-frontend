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

- https://github.com/titicacadev/triple-static-pages/src/hotel-service-policy.md

항공 개인정보 이둉동의를 표시하고 싶다면

   <StaticContents src="air/reservation/private-policy.html">

- https://github.com/titicacadev/triple-static-pages/src/air/reservation/private-policy.html

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

## Etc

어떤 이유에서 static page 를 표시할 수 없는 경우 StaticPageContents 는 `컨텐츠를 불러올 수 없습니다.` 라는 메세지를 표시하도록 합니다.

이 메세지를 혹은 컴포넌트를 커스터마이징 하려면 `onFallback` prop 을 활용할 수 있다.
