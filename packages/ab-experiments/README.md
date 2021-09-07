# ab-experiments

A/B 테스트를 지원하는 패키지입니다.

## 인터페이스

#### `GoogleOptimizeExperimentProvider`

자식 컴포넌트에 실험ID를 공급하여 A/B테스트 환경을 제공합니다.

##### props

| 이름         | 타입                   | 기본값      | 설명                                                            |
| :----------- | :--------------------- | :---------- | :-------------------------------------------------------------- |
| experimentId | `string` / `undefined` | `undefined` | Google Optimize에서 생성한 실험 ID                              |
| containerId  | `string` / `undefined` | `undefined` | Google Optimize 컨테이너 ID <br />(ex. GTM-XXXXXX / OPT-XXXXXX) |

#### `useExperimentVariant`

A/B 테스트의 후보군을 파라미터로 받으며, 반환 값은 후보군 중 선택된 단일값입니다.

##### props

| 이름     | 타입  | 기본값      | 설명                                 |
| :------- | :---- | :---------- | :----------------------------------- |
| variants | `T[]` | `undefined` | A/B테스트에 사용될 2개 이상의 후보군 |

## 사용 예시

### 1. Code Section

테스트 환경에 따른 `GOOGLE_OPTIMIZE_CONTAINER_ID` & `EXPERIMENT_NAME_ID`를 설정해줍니다.

```shell
// envs.dev, staging, prod

NEXT_PUBLIC_GOOGLE_OPTIMIZE_CONTAINER_ID = "Google Optimize Container ID" (ex. GTM-XXXXXX / OPT-XXXXXX)
NEXT_PUBLIC_EXPERIMENT_NAME_ID = "Google Optimize Experiment Name ID"
```

A/B 테스트를 진행하려는 페이지를 `GoogleOptimizeExperimentProvider`로 감쌉니다.

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
      ...
      ]
  })

  return (
    <div>{experimentText}</div>
  )
}
```

### 2. Google Optimize Section

1. 최적화 도구 계정 [기본 메뉴 > 계정](https://optimize.google.com/optimize/home/#/accounts)으로 이동합니다.
2. 테스트 환경과 동일한 컨테이너로 이동합니다.
3. `환경 만들기` 를 클릭하여 환경 이름과 테스트의 유형을 설정합니다.
4. 페이지 타겟팅, GA 목표를 설정합니다.
5. 테스트 환경 배포 후 설정 섹션의 `설치 확인`을 클릭하여 최적화 도구가 올바르게 설치되어있는지 확인합니다.
6. `시작`을 클릭하여 테스트를 진행합니다.
