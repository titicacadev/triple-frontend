# Core Elements / Image 컴포넌트

> ℹ️이 내용은 triple-frontend-docs에서 mdx로 확인하실 수도 있습니다.

## 개요

이미지를 표시하는 컴포넌트입니다.
[compound-component 패턴](https://kentcdodds.com/blog/compound-components-with-react-hooks)으로 만들어져 있기 때문에 용도에 맞게 컴포넌트를 조합하여 사용합니다.
context를 만들어주는 컴포넌트, 프레임 관련 컴포넌트, 실제 이미지 태그를 만드는 컴포넌트,
그리고 각종 추가 정보를 표시하는 컴포넌트로 이루어져있습니다.

## 컴포넌트

### Image

| prop 이름    | 설명                           |
| ------------ | ------------------------------ |
| borderRadius | 이미지의 경계 곡률을 정합니다. |

이미지의 컴포넌트 경계를 설정합니다. context provider로 자식을 감쌉니다.

### Image.FixedRatioFrame

| prop 이름 | 설명                                                     |
| --------- | -------------------------------------------------------- |
| frame     | (optional) 이미지 비율 preset. `FrameRatioAndSizes` 참조 |
| floated   | (optional) 이미지 float 값                               |
| margin    | (optional)                                               |
| onClick   | (optional)                                               |

이미지를 미리 정해진 프레임 안에 넣는 컴포넌트 중 하나입니다. width는 무조건 100%고 주어진 `frame` 값에 따라 높이가 정해집니다.

### Image.FixedDimensionsFrame

| prop 이름 | 설명                              |
| --------- | --------------------------------- |
| size      | (optional) 이미지 세로 preset.    |
| width     | (optional) px 단위의 이미지 가로. |
| height    | (optional) px 단위의 이미지 세로. |
| floated   | (optional) 이미지 float 값        |
| margin    | (optional)                        |
| onClick   | (optional)                        |

이미지를 미리 정해진 프레임 안에 넣는 컴포넌트 중 하나입니다.
`width`를 명시하지 않으면 100%로 설정됩니다.
height는 `height` prop으로 직접 입력하거나 `size`에 맞게 미리 정해진 height 값을 사용할 수 있습니다. `height`이 `size`보다 우선시됩니다. 아무 값도 주어지지 않으면 height는 지정되지 않습니다.

### Image.Img

| prop 이름 | 설명                                        |
| --------- | ------------------------------------------- |
| src       | 이미지 URL                                  |
| alt       | (optional) 이미지 대체 문구                 |
| 기타      | img 태그에 들어가는 모든 prop이 가능합니다. |

실제 `img` 태그를 그리는 컴포넌트입니다. Frame 관련 컴포넌트의 자식으로 들어갑니다.

### Image.SourceUrl

이미지 출처를 표시할 때 사용하는 컴포넌트입니다.
이미지 우측 하단에 위치시켜주고 기본적인 텍스트 스타일을 지정해줍니다.
Frame 관련 컴포넌트의 자식으로 들어갑니다.

### Image.Overlay

| prop 이름   | 설명                                |
| ----------- | ----------------------------------- |
| overlayType | 오버레이 색상 타입 (dark, gradient) |
| padding     | 오버레이의 패딩                     |

이미지 위에 검은색 오버레이를 덧씌워주는 컴포넌트입니다.
Frame 관련 컴포넌트의 자식으로 들어갑니다.

### Image.LinkIndicator

이미지가 링크임을 표시해주는 오른쪽 화살표를 띄워주는 컴포넌트입니다.
Frame 관련 컴포넌트의 자식으로 들어갑니다.

### Image.Placeholder

| prop 이름 | 설명       |
| --------- | ---------- |
| src       | 이미지 URL |

이미지 값이 없을 때 placeholder로 사용하는 컴포넌트입니다.
주어진 url의 이미지를 회색 배경과 함께 가운데 40\*40 크기로 표시합니다.
Frame 관련 컴포넌트의 자식으로 들어갑니다.

### Image.Circular

| prop 이름 | 설명                                       |
| --------- | ------------------------------------------ |
| size      | (optional) 원 크기 preset. (small, medium) |
| width     | (optional) 원 크기 직접 입력할 수 있는 값  |
| floated   | (optional) 이미지 float 값                 |

원형 이미지를 표시하는 컴포넌트입니다. `Image` 컴포넌트로 감싸지 않고 독립적으로 사용할 수 있습니다.
`size`가 `width`보다 우선시됩니다. 아무 값도 주어지지 않으면 `size="small"`로 간주합니다.

## 개발할 때

만약 이미지의 여러 부분이 관련된 기능을 추가한다면,
기능을 구현할 때 관련된 컴포넌트 중 트리 가장 위쪽 컴포넌트에
prop을 넣고 context를 통해 트리 아래로 공급하면 좋습니다.

특정 부분만 사용하는 기능이라면 각 컴포넌트에 prop으로 추가하세요.

이미지 위 레이어 형태의 컴포넌트를 추가하게 된다면
독립적으로 만들고 `Image.Img`와 같은 계층에 마운트하면 됩니다.
새로운 컴포넌트도 Image의 static property로 제공하여
사용할 때 편하게 접근할 수 있도록 해주세요.
