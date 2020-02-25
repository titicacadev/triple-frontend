# `booking-complete`

항공/호텔/TNA에서 예약이 최종적으로 완료 되었을 때 보여주는 페이지입니다.

- 항공: http://zpl.io/bAWXk9x
- TNA: https://zpl.io/2510WdW
- 호텔: https://zpl.io/bej3L8N

## Usage

```typescript
const BookingCompletion = require('booking-complete')

return (
  <BookingCompletion
    descriptions={[
      `예약자 메일로 발송된 E-ticket을 확인해주세요.`,
      `출발 72시간 전까지, 탑승객의 여권 정보를 입력해주세요.`,
    ]}
    title={`발권이\n완료되었습니다.`}
    onMoveToBookingDetail={() => {
      navigate(
        `${APP_URL_SCHEME}:///inlink?path=${encodeURIComponent(
          `${withAssetPrefix(`/my-orders/${orderId}`)}?_triple_no_navbar`,
        )}`,
      )
    }}
    region={{ id: regionId, names: { ko: '바르셀로나', en: 'Barcelona' } }}
  />
)
```

## Parameters

| 파라미터              | 타입               | 필수여부 | 기본값                      | 설명                                                                                                                                  |
| --------------------- | ------------------ | :------: | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| title                 | string             |    X     | '예약이 \n 접수되었습니다.' | 최상단에 보여지는 제목입니다.                                                                                                         |
| onMoveToBookingDetail | () => void         |    O     | -                           | `내 예약에서 확인` 버튼을 눌렀을 때 발생하는 이벤트입니다.                                                                            |
| descriptions          | string[]           |    X     | -                           | 해당 예약에 대한 설명 문구입니다. 없을 경우 표시되지 않습니다.                                                                        |
| region                | Region (아래 참고) |    X     | -                           | 해당 예약에 대한 region 정보 있습니다. region 정보가 존재할 경우, 추가로 버튼이 표시되며, 해당 버튼을 클릭시 도시메인으로 이동합니다. |

### Region

```typescript
interface Region {
  id: string
  names: {
    ko?: string
    en?: string
  }
}
```

- `names.ko`를 우선으로 표시하며, 없을 경우 `names.en` 정보를 노출합니다.
