# scroll-to-element

스크롤 액션 인터페이스를 관리하는 패키지입니다.

## Usage

### scrollToElement

parameter로 받은 `element` 위치로 스크롤하는 인터페이스입니다.

```tsx
import scrollToElement from '@ititcaca/scroll-to-element'

const element = document.getElementById(`${id}`)

scrollToElement(element, {
  offset: -52,
})

scrollToElement()
```

#### Parameters

element : Element

- 스크롤을 위치시키고 싶은 element를 의미합니다.

options : ScrollOptions

- offset : 최종 위치에 오프셋을 추가합니다.
- align : Element의 정렬을 의미합니다.
- duration : 애니메이션 시간을 의미합니다.

```ts
interface ScrollOptions {
  offset: number
  align?: 'top' | 'middle' | 'bottom'
  duration?: number
}
```

## Refererence

- https://github.com/willhoag/scroll-to-element
