# Icons

트리플 서비스에서 사용되는 모든 아이콘을 포함합니다.

## Props

```ts
type Props = {
  /** 색상 */
  color?: string
  /** 두께 */
  strokeWidth?: number
}
```

## Usage

```jsx
import { Back } from '@titicaca/icons'
import * as Colors from '@titicaca/color-palette'

<Back />
<Back color="red" />
<Back color="blue" strokeWidth={3} />
```

## Notice

## with Theme Provider

`@titicaca/icons` 에 포함된 모든 아이콘의 컬러설정 우선순위는

1. `color` props value
2. ThemeProvider 의 `colors.primary` value
3. `@titicaca/color-palette` 에서 제공하는 `gray` value

```jsx
import styled, { ThemeProvider } from 'styled-components'
import { Back } from '@titicaca/icons'
;<ThemeProvider theme={{ colors: { primary: 'red' } }}>
  <Back />
</ThemeProvider>
```

## Etc
