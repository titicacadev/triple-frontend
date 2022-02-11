# standard-action-handler

/web-action/\* 형식으로 웹 프로젝트들이 공통으로 사용할 액션을 선언하는 Path를 정의합니다.

## Paths

- ### `/web-action/serial`
  - URL로 표현되는 액션을 순차로 수행합니다.
  - parameter
    - { path, query }
      - query : actions[]=[action1]&actions[]=[action2]...
    - options : ContextOptions
    - handler : action을 수행할 핸들러
- ### `/web-action/cta`
  - CTA 링크로 navigate합니다.
  - parameter
    - { path }
    - options : ContextOptions
- ### `/web-action/fetch-api`
  - Parameter로 정의한 API 호출을 수행합니다.
  - parameter
    - { path, query }
      - query : path=[apiPath]&method=[method]&body=[body]
- ### `/web-action/show-toast`
  - Toast 메시지를 출력합니다.
  - parameter
    - { path, query }
      - query : text=[토스트로 출력할 텍스트]
- ### `/web-action/share`
  - 현재 페이지의 URL을 복사합니다.
  - parameter
    - { path }
- ### `/web-action/copy-to-clipboard`
  - 텍스트를 클립보드에 복사합니다.
  - parameter
    - { path, query }
      - query : text=[복사할 텍스트]

### How to make URL

example

```
/** show-toast URL */
const action1 = `/web-action/show-toast?text='토스트 메시지'`
/** fetch-api URL */
const action2 = `/web-action/fetch-api?method=GET&path='/api/apiPath'`

/** serial URL */
const webAction = `/web-action/serial?actions[]=${action1}&actions[]=${action2}`

```

### 새로운 Action 추가하기

standard-action-handler 내에 action을 정의하고 index.ts파일의 handler에 해당 action을 추가합니다. URL을 판단하여 액션을 실행하기 때문에 모든 action에서 path는 parameter에 필수적으로 포함되어야 합니다.

## Parameter

### initialize(options)

```
{
  options?: ContextOptions
}

ContextOptions: {
    cta?: string
    /** execute 함수에서 사용할 navigate */
    navigate: (
      rawHref: string,
      parmas?: NavigateOptions
     ) => string | undefined | void
  }
```

initialize의 parameter로 사용되는 `navigate`는 실행되는 환경과 세션 등을 고려하여 전달받은 URL(rawHref)로 이동하는 역할을 합니다.

### execute(url, params)

```
{
  /** 이동할 URL */
  url: string
  /** navigate options */
  params?: NavigateOptions
}

NavigateOptions : {
    target?: string
    title?: string
    [key:string]: unknown
  }
```

## How to use

initialize 메소드에서 return된 execute 함수를 사용합니다.

### example

```
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'

const { navigate } = useHistoryFunctions()

const handleStandardActions = initialize({ navigate })

handleStandardActions(href, {})

```
