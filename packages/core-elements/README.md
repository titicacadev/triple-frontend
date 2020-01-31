# `@titicaca/core-elements`

트리플의 프론트엔드 페이지에서 쓰이는 공통 디자인 요소들을 구현한 라이브러리입니다.

## Mixins

styled-components 템플릿 안에 집어넣어 컴포넌트에 특정 스타일을 부여합니다.

사용 예시

```typescript
const StyledDiv = styled.div`
  ${someMixin}
`
```

### marginMixin, paddingMixin

컴포넌트가 `margin`, `padding` prop을 받아 스타일을 적용할 수 있게 해줍니다.

```typescript
const StyledDiv = styled.div`
  ${marginMixin}
  ${paddingMixin}
`

<StyledDiv margin={{ top: 10, bottom: 15 }} padding={{left: '30px', right: '30px' }} />
```

이는 다음과 같은 스타일 시트를 만듧니다.

```css
.styled-div {
  margin: 10px 0 15px 0;
  padding: 0 30px 0 30px;
}
```

### safeAreaInsetMixin

`env(safe-area-inset-bottom)`을 컴포넌트 하단 padding에 추가해줍니다.
화면 하단에 달라붙는 컴포넌트에 사용하여 아이폰 X 대응을 할 수 있습니다.

`padding` prop을 넘겨주는 경우 (기존 padding 값 + safe-area-inset-bottom 값)을 추가합니다.

> 🚨이 mixin은 padding 자체를 추가하지 않습니다. 컴포넌트에 padding을 추가하고 싶다면 paddingMixin을 사용하세요.

```typescript
const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;

  ${safeAreaInsetMixin}
`

const PaddedFixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;

  ${paddingMixin}
  ${safeAreaInsetMixin}
`

// padding 없는 경우
<FixedDiv />

// padding 있는 경우
<PaddedFixedDiv padding={{ bottom: 30 }}>
```

이는 다음과 같은 스타일시트를 만듧니다.

```css
/* padding 없는 경우 */
.fixed-div {
  @supports (padding: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 0px);
  }
}

/* padding 있는 경우 */
.padded-fixed-div {
  padding: 0 0 30px 0;

  @supports (padding: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 30px);
  }
}
```
