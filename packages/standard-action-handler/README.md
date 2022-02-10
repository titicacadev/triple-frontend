# standard-action-handler

/web-action/\* 형식으로 웹 프로젝트들이 공통으로 사용할 액션을 선언하는 Path를 정의합니다.

## Paths

- ### `/web-action/serial`
  - URL로 표현되는 액션을 순차로 수행합니다.
  - parameter
    - { path, query }
      - query : actions=[action]&actions=[action] ...
    - options : ContextOptions
    - handler : action을 수행할 핸들러
- ### `/web-action/cta`
  - Handler에 전달된 CTA 링크로 navigate합니다.
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

## How to use

initialize 메소드로 return된 execute 함수를 사용합니다.

### example

```
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'

const { navigate } = useHistoryFunctions()

const handleStandardActions = initialize({ navigate })

handleStandardActions(href, {})

```

initialize의 argument로 사용된 navigate는
[react-contexts의 history-context]('https://github.com/titicacadev/triple-frontend/blob/e0f022f6f25265899ad1557fb7b4c0b6454c2e68/packages/react-contexts/src/history-context/history-context.tsx#L48')
가 제공하는 인터페이스입니다.

## Parameter

### initialize(options)

```
{
  options?: ContextOptions
}
```

### execute(url, params)

```
{
  /** 이동할 URL */
  url: string
  /** navigate options */
  params?: NavigateOptions
}
```

```
ContextOptions: {
    cta?: string
    /** execute 함수에서 사용할 navigate */
    navigate: {
      rawHref: string
      parmas?: NavigateOptions
    }
  }

NavigateOptions : {
    target?: string
    title?: string
    [key:string]: unknown
  }
```
