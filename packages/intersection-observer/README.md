# intersection-observer

intersection 관련 컴포넌트 및 Hook을 제공합니다.

## Usage

### use-intersection

기본 사용법은 아래와 같이 useIntersection의 사용하고자 하는 타입 ex) `HTMLDivElement`지정 그리고 `threshold, rootMargin` 값을 Optional 하게 사용하여 목적에 맞는 ref 를 생성 후 `isIntersecting`를 확인하고자 하는 태그에 해당 ref를 설정합니다.

```js
import { useIntersection } from '@titicaca/intersection-observer';

const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ threshold, rootMargin }

return (
    <div ref={ref}></div>
)

```
