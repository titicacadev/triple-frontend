# React-hooks

React Custom Hook 들을 제공합니다.

## Usage

### use-fetch

```
import { useFetch } from '@titicaca/react-hooks';

const { response, data, error, loading } = useFetch(url, options)
```

### use-body-scroll-lock

```
import { useBodyScrollLock } from '@titicaca/react-hooks';

useBodyScrollLock(lockFlag: boolean)
```

### useScrollToAnchor

기본 사용법은 아래와 같이 alias 에 key/value 방식으로 컴포넌트에 지정한 `anchor` 이름과 맵핑 됩니다.

```js
  useScrollToAnchor({
    /* scroll target */
    alias: { 'equipping-pois': 'equipping-pois' },
  })

  return
    <Section anchor="equipping-pois">
      ...
    </Section>
```

`alias` 값을 지정하지 않을 경우 location.hash 값 id 로 해서 타깃 엘리먼트를 찾아 자동 스크롤이 동작합니다.

```js
console.log(location.hash) // #my-hash

useScrollToAnchor({})
```

위와 같은 케이스일 경우 `<Component anchor="my-hash" />` 로 자동 스크롤 됩니다.

#### Parameters

```ts
type Options = {
  /** 스크롤 위치 상대값 */
  offset?: number
  /** 스크롤 시작 딜레이 타임 */
  delayTime?: number
  /** 스크롤 시간길이, 단위는 ms */
  duration?: number
  /** 스크롤 시작 방향 */
  align?: 'top' | 'bottom' | 'middle'
  /** 스크롤 타겟 엘리먼트 */
  alias?: {
    [key: string]: string
  }
}
```

##### alias

한 페이지내에 여러개의 스크롤 타깃이 존재하는 경우 `alias` 에 key/value 형태로 여러개를 설정할 수 있습니다.

```js
useScrollToAnchor({
  /* scroll target */
  alias: {
    'hash-key1': 'target-element1',
    'hash-key2': 'target-element2',
  },
})
```
