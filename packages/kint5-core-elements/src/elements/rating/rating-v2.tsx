import { Text } from '../text'
import { FlexBox } from '../flex-box'

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
      <img
        src="https://assets.triple-dev.titicaca-corp.com/images/kint5-ico-star-fill.svg"
        alt="Rating"
        width={12}
        height={12}
      />
      <Text css={{ fontSize: 13, fontWeight: 700 }}>{formattedScore}</Text>
    </FlexBox>
  )
}
