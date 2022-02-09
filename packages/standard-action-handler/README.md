# standard-action-handler

/web-action/\* 형식으로 웹 프로젝트들이 공통으로 사용할 액션을 선언하는 Path를 정의합니다.

- `/web-action/serial` : URL로 표현되는 액션을 순차로 수행합니다.
- `/web-action/cta` : Handler에 전달된 CTA 링크로 navigate합니다.
- `/web-action/fetch-api` : Parameter로 정의한 API 호출을 수행합니다.
- `/web-action/show-toast` : Toast 메시지를 출력합니다.
- `/web-action/share` : 현재 페이지의 URL을 복사합니다.
- `/web-action/copy-to-clipboard` : 텍스트를 클립보드에 복사합니다.

## How to use

### example

```
const handleStandardActions = initialize({ navigate })

handleStandardActions(href, {})

```

initialize 메소드로 return된 execute 함수를 사용합니다.

## Parameter

### initialize(options)

- options : {cta, navigate}

  |          | required | role                             |
  | -------- | :------: | -------------------------------- |
  | cta      |    X     |                                  |
  | navigate |    O     | execute 함수에서 사용할 navigate |

### execute(url, params)

|        | required | role             |
| ------ | :------: | ---------------- |
| url    |    O     | 이동할 URL       |
| params |    X     | navigate options |
