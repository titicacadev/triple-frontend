import { Text } from '../text'
import { FlexBox } from '../flex-box'
import { FilledStarIcon } from '../icon/filled-star-icon'

export function RatingV2({
  score: initScore = 0,
  fractionDigits = 2,
}: {
  score: number | undefined
  fractionDigits?: number
}) {
  const score = Number(
    Math.max(Math.min(initScore, 5), 0).toFixed(fractionDigits),
  )
  const formattedScore = score % 1 === 0 ? Math.trunc(score) : score

  return (
    <FlexBox flex css={{ alignItems: 'center', gap: 2 }}>
      <FilledStarIcon color="#FFBD14" />
      <Text css={{ fontSize: 13, fontWeight: 700, marginTop: 1 }}>
        {formattedScore}
      </Text>
    </FlexBox>
  )
}
