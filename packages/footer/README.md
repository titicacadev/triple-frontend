# Footer

트리플에서 사용되는 다양한 Footer를 쓰실 수 있습니다.

## DefaultFooter

### Usage

```jsx
<DefaultFooter />
```

## CSFooter

### Usage

```jsx
<CSFooter
  serviceType="AIR"
  csTime={'오전 9시 - 오후 6시 (한국시간 기준, 연중무휴)'}
  csMessage={'현지사용 긴급문의 카카오톡 @트리플서비스\n(오전 9시 - 오후 10시)'}
  onFAQButtonClick={() => console.log('자주묻는 질문 버튼 클릭')}
  onCSButtonClick={() => console.log('1:1 문의 버튼 클릭')}
/>
```

### Parameters

| 파라미터         | 필수여부     | 기본값 | 설명                                                                         |
| ---------------- | ------------ | ------ | ---------------------------------------------------------------------------- |
| appUrlScheme     | required     | -      | APP_URL_SCHEME                                                               |
| serviceType      | required     | -      | AIR, TNA, HOTEL 중 하나. 1:1 문의 노출 시 이용됩니다.                        |
| csTime           | required     | -      | CS 운영시간 '오전 9시 - 오후 6시 (한국시간 기준, 연중무휴)'                  |
| csMessage        | required     | -      | CS 메시지 '현지사용 긴급문의 카카오톡 @트리플서비스\n(오전 9시 - 오후 10시)' |
| onFAQButtonClick | not required | -      | 자주 묻는 질문 버튼 클릭시 발생시킬 이벤트                                   |
| onCSButtonClick  | not required | -      | 1:1 문의 버튼 클릭시 발생시킬 이벤트                                         |

## SimpleFooter

### Usage

```jssx
<LogoFooter />
```
