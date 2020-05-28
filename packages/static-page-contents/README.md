# Static Page Component

StaticPageContents 는 triple-static-pages repository 에 있는 정적 파일을 표시하기 위한 컴포넌트입니다.

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
