# `Image-Viewer`

이미지를 볼 수 있는 이미지 뷰어 팝업 패키지입니다. 현재 확대뷰를 제공합니다.

## 사용법

### ImagesContext를 사용한 예시

```tsx
import {
  useImagesContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'

const HASH_IMAGE_VIEWER_POPUP = 'image-viewer.popup'

function Component() {
  const { push, back } = useHistoryFunctions()
  const uriHash = useUriHash()

  const {
    images,
    total,
    actions: { indexOf, fetch },
  } = useImagesContext()

  return (
    <ImageViewerPopup
      open={uriHash === HASH_IMAGE_VIEWER_POPUP}
      onClose={() => {
        back()
      }}
      images={images}
      totalCount={total}
      defaultImageIndex={0}
      fetchNext={fetch}
    />
  )
}
```
