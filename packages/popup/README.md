# `popup`

밑에서 쑤욱 올라오는 팝업입니다.

## Usage

```typescript
import Popup from '@titicaca/popup'

return (
  <Popup open={open} onClose={onClose} borderless osName="window">
    {children}
  </Popup>
)
```

## Parameter

- open: 팝업을 열지 결정합니다. (optional, default: false)
- borderless: Navbar의 border를 그릴지 결정합니다. (optional, default: false)
- onClose: 닫기 버튼을 눌렀을 때의 이벤트 입니다. (required)
- children: 팝업에서 그릴 `ReactNode`입니다. (required)
- title: Navbar의 제목입니다. (optional, default: undefined)

## History

- 2019.11.07: 팝업이 닫히자마자 push or replace 하는 케이스에서 타이밍 이슈가 생겨 lock 을 풀지못하는 케이스가 있었습니다. 일단 lock 의 구현 동작이 완벽하지 않기 떄문에 스펙에서 빼고 다시 고민해보기로 했습니다.
