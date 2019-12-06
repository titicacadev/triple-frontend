## 1.2.1 (2019-12-06)

- `image-carousel`과 `ad-banners` 에서 의존하고 있는 `@egjs/flicking`, `@egjs/react-flicking` 의 버전을 고정합니다.
  - `@egjs/flicking@3.4.0`
  - `@egjs/reac-flicking@3.1.0`

## 1.2.0 (2019-12-05)

- `core-elements` 의 carousel/CarouselBase 에 `overflow-y: hidden` 속성을 추가합니다.

## 1.0.0 (2019-11-21)

- `triple-document` 패키지에서 텍스트 요소(`Paragraph`, `H1`, `H2`, ...)를
  인터페이스로 노출합니다.
- `MyReviewsProvider`의 props 중 `type`을 `resourceType`으로 변경합니다.
- `ReviewLikesContext`가 노출하는 인터페이스를 다음과 같이 변경합니다:
    ```
    interface ReviewLikesContextProps {
      deriveCurrentStateAndCount: (currentState: {
        reviewId: any
        liked: boolean
        likesCount: number
      }) => { liked: boolean; likesCount: number }
      updateLikedStatus: (newLikes: { [reviewId: string]: boolean }) => void
    }
    ```
- `ReviewLikesContext`의 위치를 `@titicaca/review` 패키지로 옮깁니다.
