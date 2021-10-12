# reply

댓글 컴포넌트

## How to use

```bash
npm install @titicaca/reply
```

```js
import Reply from '@titicaca/reply'

return (
  <Reply
    itinerary={ItineraryData}
    reactions={ReactionsData}
    reply={ReplyData}
    onClick={() => alert('onClick 옵션을 custom하게 사용하세요.')}
  />
)
```

## Parameter

모든 parameter는 required 값입니다.

각 api의 필요한 param은 아래 링크를 참고해주세요.

- reply: 댓글에 필요한 data입니다.
  https://reply.proxy.triple-dev.titicaca-corp.com/messages
  https://github.com/titicacadev/triple-reply
- onClick: onClick이 적용된 icon, text에 적용합니다
