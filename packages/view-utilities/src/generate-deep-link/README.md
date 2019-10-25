# generate-deep-link

## 사용 방법

```:javascript
const generateDeepLink = makeDeepLinkGenerator({
  oneLinkParams: {
    subdomain: '',
    id: '',
    pid: '',
  },
  appScheme: '',
  webURLBase: '',
})

// 컴포넌트에서
generateDeepLink({
  campaign: '하단 배너',
  ...injectContentSource(source),
  ...injectUTMContext(utmContext),
})
```
