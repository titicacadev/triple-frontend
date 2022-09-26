# ScrapsContext

페이지 내에 렌더링하는 POI 및 가이드의 저장 여부를 관리하고, 이 데이터를
`scrap-button`과 같은 컴포넌트에 노출하는 역할을 담당합니다.

## `ScrapsProvider`

### Props

- `scraps: Record<string, boolean>`: 미리 알 수 있는 저장 상태입니다.
  `TripleDocument`처럼 컨텐트가 Embed된 응답인데 `scraped` 정보를 서버사이드에서
  합쳐주지 않을 경우 사용합니다. 리소스 ID를 키로 하고, Scrap 여부를 값으로 하는
  `Object`입니다. (Optional)
- `beforeScrapedChange: (resource: { id: string; type: string }, scraped: boolean) => boolean`:
  Scrap 상태가 바뀌기 전에 호출하는 함수입니다. 이 함수가 `false`를 반환하면
  상태를 변경하지 않습니다. Context를 이용하는 페이지에서 상태 변경 시마다
  실행해야 하는 로직이 있다면 이 함수를 이용해 처리합니다.
- `afterScrapedChange: (resource: { id: string; type: string }, scraped: boolean) => unknown`:
  Scrap 상태가 바뀐 직후에 호출하는 함수입니다.

## `useScrapsContext()`

### Return values

- `deriveCurrentStateAndCount: (params: { id: string; scraped?: boolean; scrapsCount?: number }) => { scraped: boolean; scrapsCount: number }`:
  특정 리소스의 ID 및 최초 scrap 여부를 받아 현재 상태를 반환합니다. 개별 리소스의
  초기 상태가 아닌, 사용자와의 interaction 후 반영된 최신 상태를 알 수 있습니다.
- `scrape: ({ id: string; type: string }) => Promise<void>`: 주어진 리소스를
  scrape합니다.
- `unscrape: ({ id: string; type: string }) => Promise<void>`: 주어진 리소스를
  unscrape합니다.
