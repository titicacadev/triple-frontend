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
;<Section anchor="equipping-pois">...</Section>
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

### useDebouncedState

value와 timeout을 파라미터로 받습니다. value가 업데이트 될 때 timeout만큼 업데이트를 디바운스한 결과와 진행중인 debounce를 취소하는 함수를 반환합니다.

#### 예시

짧은 시간 동안 많이 업데이트 되는 input 값을 천천히 업데이트 되도록 할 때 사용할 수 있습니다.

```tsx
const [inputValue, setInputValue] = useState('')
const { debounced: debouncedValue } = useDebouncedState(inputValue, 500)

useEffect(() => {
  fetchAPI(debouncedValue) // 500ms에 한 번씩 실행됨
}, [debounceValue])

return (
  <input
    value={inputValue}
    onChange={(e) => setInputValue(e.currentTarget.value)}
  />
)
```

`clearDebounce` 함수는 검색 창에 api 요청을 통한 자동 완성을 구현할 때 사용합니다.
엔터를 치면 지연 없이 바로 검색이 되게 api 요청을 보내고,
중복 요청을 하지 않도록 debounce를 취소합니다.

```tsx
const [inputValue, setInputValue] = useState('')
const { debounced: debouncedValue, clearDebounce } = useDebouncedState(
  inputValue,
  500,
)

useEffect(() => {
  fetchAPI(debouncedValue) // 500ms에 한 번씩 실행됨
}, [debounceValue])

return (
  <input
    value={inputValue}
    onChange={(e) => setInputValue(e.currentTarget.value)}
    // 주의! onEnter는 실제 인터페이스가 아닙니다.
    onEnter={(e) => {
      clearDebounce()
      fetchAPI(e.currentTarget.value)
    }}
  />
)
```

### useLottie

Json형태로 내 보낸 Adobe After Effects 애니메이션을 지정된 컴포넌트에서 렌더링 할수 있도록 도와줍니다.
animationData와 player 옵션들을 파라미터로 받습니다.

#### 예시

```tsx
import { useLottie } from '@titicaca/react-hooks'

const LottieContainer = styled.div`
  width: 57px;
  height: 57px;
`

export function Lottie() {
  const { animationRef } = useLottie<HTMLDivElement>({
    data: logos,
    rendererSettings: {
      viewBoxSize: `0 0 57px 57px`,
    },
  })

  return <LottieContainer ref={animationRef} />
}
```
