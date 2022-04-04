# replies

댓글 컴포넌트

## How to use

```bash
npm install @titicaca/replies
```

```js
import Replies from '@titicaca/replies'

const placeholders = {
  reply : '댓글을 입력하세요'
  childReply : '답글을 입력하세요'
}

const padding = { left : 30, right : 30, bottom : 30}

return (
  <Replies
    resourceId={resourceId}
    resourceType={resourceType}
    placeholders={placeholders}
    size={size || 10}
    padding={padding}
    isFormFixed={false}

  />
)
```

## Parameter

- resourceId, resourceType: 아래 스웨거를 참고해주세요. (required)
  https://reply.proxy.triple-dev.titicaca-corp.com/webjars/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config

- placeholders: Register 컴포넌트 내부의 문구를 커스터마이징하는 prop (optional)
  - 댓글 : 댓글을 입력하세요 (default)
  - 답글 : 답글을 입력하세요 (default)
- size : api 호출 시 댓글을 가져오는 크기, default: 10 (optional)
- isFormFixed : 화면 최하단에 댓글/답글 입력창을 고정할 지 선택하는 prop (optional)
- padding : 댓글 리스트의 padding을 결정하는 props (optional)
