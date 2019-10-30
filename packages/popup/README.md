# `popup`

밑에서 쑤욱 올라오는 팝업입니다.

## Usage

```typescript
import Popup from '@titicaca/popup'

return
<Popup open={open} onClose={onClose} borderless osName="window">
  {children}
</Popup>
```

## Parameter

- open: 팝업을 열지 결정합니다. (optional, default: false)
- borderless: Navbar의 border를 그릴지 결정합니다. (optional, default: false)
- onClose: 닫기 버튼을 눌렀을 때의 이벤트 입니다. (required)
- children: 팝업에서 그릴 `ReactNode`입니다. (required)
- title: Navbar의 제목입니다. (optional, default: undefined)
- isIOS: `userAgentContext`에서 가져온 osName이 `iOS` 인지 여부를 넘겨주면 됩니다. (required)
