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
    onClick={onClick}
  />
)
```

## Parameter

- resourceId, resourceType: 아래 스웨거를 참고해주세요. (required)
  https://reply.proxy.triple-dev.titicaca-corp.com/webjars/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
- /reply/api : 해당 api url을 사용하는 플젝의 next.config.js 파일에 위의 스웨거를 참고하여 proxy 설정을 해주세요.

```
// next.config.js

{
  source: '/reply-api/:path*',
  destination: `${REPLY_API_URI_BASE}/:path*`,
  basePath: false,
},

```

- registerPlaceholder: Register 컴포넌트 내부의 문구를 커스터마이징하는 prop (optional)
  default: 이 일정에 궁금한 점은 댓글로 써주세요.
- size : api 호출 시 댓글을 가져오는 크기, default: 10 (optional)

- onClick: customizing한 onClick을 icon, text에 적용합니다. (required)
