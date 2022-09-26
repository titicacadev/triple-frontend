# `@titicaca/constants`

트리플 프론트엔드의 공통 상수를 모아놓는 패키지입니다.

- 공통 상수
- 공통 정규 표현식

## How to use

```tsx
import { EMAIL_REGEX } from '@titicaca/constants'

const isValidEmailAddress = !EMAIL_REGEX.test(value)
```
