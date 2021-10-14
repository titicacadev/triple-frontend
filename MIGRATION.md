# 마이그레이션 가이드

## v2 to v3

### react-contexts: EnvProvider에 필수 props 필요

새 props가 추가되었습니다.

- afOnelinkId (required)
- afOnelinkPid (required)
- afOnelineSubdomain (required)

### public-header: props 변경 필요함

deprecated된 props을 제거합니다.

- href
- playStoreUrl
- appStoreUrl
- fixed
- minWidth
- mobileViewHeight
- borderless
- children

새 props가 추가되었습니다.

- category (optional)
- deeplinkPath (optional)
- disableAutoHide (optional)

### public-header: position: fixed 제거됨

`position: fixed` 스타일이 제거되어 기본적으로 페이지 상단에 고정되지 않습니다.
페이지 상단에 고정시키기 위해서는 `core-elements/StickyHeader`와 같이 사용할 수 있습니다.

```tsx
<StickyHeader>
  <PublicHeader>
</StickyHeader>
```
