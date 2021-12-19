# google-optimize-context

**Google Optimize**를 이용하여 세션을 통해 A/B 테스트를 도와주는 context입니다.

## 인터페이스

### `GoogleOptimizeExperimentProvider`

자식 컴포넌트에 실험ID와 실험 컨테이너ID를 공급하여 A/B테스트 환경을 제공합니다.

#### props

| 이름         | 타입     | 설명                                                            |
| :----------- | :------- | :-------------------------------------------------------------- |
| experimentId | `string` | Google Optimize에서 생성한 실험 ID                              |
| containerId  | `string` | Google Optimize 컨테이너 ID <br />(ex. GTM-XXXXXX / OPT-XXXXXX) |

### `useExperimentVariant`

A/B 테스트의 후보군을 파라미터로 받으며, 반환 값은 후보군 중 선택된 단일값입니다.

#### props

| 이름     | 타입  | 설명                                 |
| :------- | :---- | :----------------------------------- |
| variants | `T[]` | A/B테스트에 사용될 2개 이상의 후보군 |

## 사용 예시

테스트 환경에 따른 `GOOGLE_OPTIMIZE_CONTAINER_ID` & `EXPERIMENT_NAME_ID`를 설정해줍니다.

```shell
// envs.dev, staging, prod

NEXT_PUBLIC_GOOGLE_OPTIMIZE_CONTAINER_ID = "Google Optimize Container ID" (ex. GTM-XXXXXX / OPT-XXXXXX)
NEXT_PUBLIC_EXPERIMENT_NAME_ID = "Google Optimize Experiment Name ID"
```

A/B 테스트가 필요한 페이지를 `GoogleOptimizeExperimentProvider`로 감쌉니다.

```tsx
export default function TestPage(){

  return (
    <GoogleOptimizeExperimentProvider
      experimentId={process.env.NEXT_PUBLIC_EXPERIMENT_NAME_ID}
      containerId={process.env.NEXT_PUBLIC_GOOGLE_OPTIMIZE_CONTAINER_ID}>
      <SomeComponent>
    </GoogleOptimizeExperimentProvider>
  )
}
```

`useExperimentVariant`를 이용하여 A/B 테스트의 후보군(variants)을 설정합니다.

```tsx
export default function TestComponent(){
  const experimentText = useExperimentVariant({
    variants: [
      ... // 후보군 입력
      ]
  })

  return (
    <div>{experimentText}</div>
  )
}
```

[Google Optimize](https://optimize.google.com/optimize/home/#/accounts)로 이동하여 A/B 테스트를 생성합니다.

- A/B 테스트 생성 방법은 [google-optimize A/B 테스트 만들기](https://support.google.com/optimize/answer/6211930?hl=ko)를 참고해주세요.
