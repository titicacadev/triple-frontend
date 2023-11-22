import { useMemo } from 'react'

import { Text } from '../text'
import { StarIcon } from '../icon'
import { FlexBox } from '../flex-box'

/**
 * **최솟값 0, 최댓값 5**로 설정되는 별점 컴포넌트입니다. score에 최소,최대보다 작거나 큰 값을 넣어도 동작합니다.
 */
export function Rating({
  score: initScore = 0,
  size = 16,
  gapBetweenStars = 2,
  showRatingScore = true,
}: {
  score?: number
  size?: number
  gapBetweenStars?: number
  showRatingScore?: boolean
}) {
  const score = useMemo(
    () => Math.floor(Math.max(Math.min(initScore, 5), 0)),
    [initScore],
  )

  return (
    <FlexBox flex css={{ alignItems: 'center', gap: 4 }}>
      <FlexBox
        flex
        css={{
          alignItems: 'center',
          gap: gapBetweenStars,
        }}
      >
        {[...Array(score)].map((_, i: number) => (
          <StarIcon key={i} width={size} height={size} />
        ))}
      </FlexBox>
      {showRatingScore && (
        <Text css={{ fontSize: 13, fontWeight: 700 }}>{score}</Text>
      )}
    </FlexBox>
  )
}
