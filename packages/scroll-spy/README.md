# scroll-spy

activeId 값을 이용하여 해당위치로 scrolling 해주는 컴포넌트
`ScrollSpyContainer`와 `ScrollSpyEntity`는 아래와 같이 같이 사용해주셔야 합니다.

## How to use

```bash
npm install @titicaca/scroll-spy
```

```js
import React, { useState } from 'react'
import { ScrollSpyContainer, ScrollSpyEntity } from '@titicaca/scroll-spy'

function ScrollSpy() {
  const [activeId, setActiveId] = useState(null)

  return (
    <ScrollSpyContainer
      activeId={activeId}
      scrollOffset={30}
      onChange={setActiveId}
    >
      {ENTITIES.map((entity) => (
        <ScrollSpyEntity key={entity.id} id={entity.id} />
      ))}
    </ScrollSpyContainer>
  )
}
```

## Parameter

### ScrollSpyContainer

- activeId: ScrollSpyEntity의 사용되는 값으로 ScrollSpyContainer의 children에 대한 각각의 id 값 (required)
- onChange: activeId를 변경하는 핸들러 (required)
- scrollOffset: 해당 child의 위치를 기준으로 제외해야 할 값(부모 컴포넌트의 padding, margin 등) (optional)
- preventInitialScroll: true일 때 스크롤을 방지하는 값 (optional)

### ScrollSpyEntity

- id: ScrollSpyContainer의 activeId의 사용되는 id 값 (required)
