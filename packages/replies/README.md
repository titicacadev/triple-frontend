# replies

댓글 컴포넌트

## How to use

```bash
npm install @titicaca/replies
```

```js
import Replies from '@titicaca/replies'

return (
  <Replies
    resourceId={resourceId}
    resourceType={resourceType}
    registerPlaceholder={registerPlaceholder}
    size={size || 10}
  />
)
```

## Parameter

- resourceId, resourceType: 아래 스웨거를 참고해주세요. (required)
  https://reply.proxy.triple-dev.titicaca-corp.com/webjars/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config

- registerPlaceholder: Register 컴포넌트 내부의 문구를 커스터마이징하는 prop (optional)
  default: 이 일정에 궁금한 점은 댓글로 써주세요.
- size : api 호출 시 댓글을 가져오는 크기, default: 10 (optional)
