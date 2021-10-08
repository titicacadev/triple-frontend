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

- itinerary: 해당 일정의 정보 data입니다.
  /api/itinerary/itineraries/${itineraryId}
  https://github.com/titicacadev/triple-itineraries-api
- reactions: 좋아요를 누른 유저들의 data입니다.
  /api/itinerary/reactions
  https://github.com/titicacadev/triple-itineraries-api
- reply: 댓글에 필요한 data입니다.
  https://reply.proxy.triple-dev.titicaca-corp.com/messages
  https://github.com/titicacadev/triple-reply
- onClick: onClick이 적용된 icon, text에 적용합니다
