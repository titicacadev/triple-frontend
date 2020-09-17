# Icons

트리플 서비스에서 사용되는 모든 아이콘을 포함합니다.

## Props

```ts
type Props = {
  /** 색상 */
  color?: string
  /** 가로 사이즈 */
  width?: number
  /** 세로 사이즈 */
  height?: number
  /** 두께 */
  strokeWidth?: number
  /** 투명도 */
  opacity?: number
}
```

## Usage

```jsx
import * as Icons from '@titicaca/icons'

<Icons.Back />
<Icons.Back color="red" />
<Icons.Back color="blue" strokeWidth={3} />
```

## Notice

## with Theme Provider

`@titicaca/icons` 에 포함된 모든 아이콘의 컬러설정 우선순위는 다음과 같습니다.

1. `color` props value
2. ThemeProvider 의 `colors.primary` value
3. `@titicaca/color-palette` 에서 제공하는 `gray` value

```jsx
import styled, { ThemeProvider } from 'styled-components'
import * as Icons from '@titicaca/icons'
;<ThemeProvider theme={{ colors: { primary: 'red' } }}>
  <Back />
</ThemeProvider>
```

## with Styled Component

```jsx
import styled from 'styled-components'
import * as Icons from '@titicaca/icons'

const CustomStyledBackIcon = styled(Back)`
  padding: 5px;
`

<CustomStyledBackIcon color="red" />
```

## TODOs

- [ ] Triple Frontend 에서 사용중인 컴포넌트를 전체적으로 svg 로 전환합니다.
- [ ] 표준 아이콘을 모두 svg icon 으로 생성합니다.

## Refereneces

- fallback: https://css-tricks.com/a-complete-guide-to-svg-fallbacks/#fallback-inline-svg-imgtag
