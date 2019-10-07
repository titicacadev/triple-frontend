# `content-sharing`

콘텐츠 하단에 들어가는 공유 영역입니다.

카카오톡 공유, 클립보드 복사, 기타 공유 버튼을 표시하고 있습니다.

## Usage

```javascript
import ContentSharing, { Method } from '@titicaca/content-sharing'
```

```tsx harmony
<ContentSharing
  onShareClick={({ method }: { method: Method }) => {
    // something
  }}
  label="label"
/>
```
