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
