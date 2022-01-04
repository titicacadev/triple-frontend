# scroll-spy

activeId 값을 이용하여 scroll 시 해당위치로 이동할 수 있는 컴포넌트

## How to use

```bash
npm install @titicaca/scroll-spy
```

```js
import { ScrollSpyContainer, ScrollSpyEntity } from '@titicaca/scroll-spy'

function ScrollSpy() {
  const [activeId, setActiveId] = (useState < string) | (null > null)

  return (
    <ScrollSpyContainer
      activeId={activeId}
      scrollOffset={number}
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
- scrollOffset: 해당 child의 위치를 기준으로 제외해야 할 값(부모 컴포넌트의 padding, margin 등) (required)
- onChange: activeId를 변경하는 핸들러
- preventInitialScroll: 첫 스크롤을 방지하는 설정 값 (optional)

### ScrollSpyEntity

- id: ScrollSpyContainer의 activeId의 사용되는 id 값 (required)
