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
    replies={replies}
    registerPlaceholder={registerPlaceholder}
    customOnClick={customOnClick}
  />
)
```

## Parameter

각 api의 필요한 param은 아래 링크를 참고해주세요.

- replies: 댓글에 필요한 data입니다. (required)
  https://reply.proxy.triple-dev.titicaca-corp.com/messages
  https://github.com/titicacadev/triple-reply
- registerPlaceholder: Register 컴포넌트 내부의 문구를 커스터마이징하는 prop (optional)
  default: 이 일정에 궁금한 점은 댓글로 써주세요.
- customOnClick: customizing한 onClick을 icon, text에 적용합니다. (required)
