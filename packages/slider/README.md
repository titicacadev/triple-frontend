# `@titicaca/slider`

## 설명

일정 범위를 선택할 수 있는 Slider 컴포넌트

### 컴포넌트 목록

- SingleSlider
- RangeSlider

## Props

### 공통

| 이름 | 필수 여부 | 설명 |
| ---- | ---- | ---- |
| step | X | number. 증감량의 단위 정확하게 작동하지 않으니 상대적인 값으로 생각해주세요. default 1. |
| min | X | number. 범위의 최소값 default 0. |
| max | X | number. 범위의 최대값 default 100. |
| nonLinear | X | boolean. 비선형적으로 증감하게 만듧니다. default false|
| debounceTime | X | number. onChange 함수에 걸리는 debounce 시간 (ms). default 500|

### SingleSlider

| 이름 | 필수 여부 | 설명 |
| ---- | ---- | ---- |
| initialValue | X | number. 초기값. default 0. |
| labelComponent | X | React.ComponentType<{ value: number }>. 슬라이더 상단 라벨 영역을 표시하는 컴포넌트. |
| onChange | O | (value: number) => void. |

### RangeSlider

| 이름 | 필수 여부 | 설명 |
| ---- | ---- | ---- |
| initialValues | X | readonly number[] 초기값 default [0] |
| labelComponent | X | React.ComponentType<{ fromValue: number; toValue: number }>. 슬라이더 상단 라벨 영역을 표시하는 컴포넌트. |
| onChange | O | (values: readonly number[]) => void. |
