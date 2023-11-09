import type { Meta } from '@storybook/react'

import { RatingV2 } from './rating-v2'

export default {
  title: 'kint5-core-elements / Rating V2',
} as Meta

export function RatingV2Example1() {
  return <RatingV2 score={3.66667} />
}
RatingV2Example1.storyName = 'score 정상범위 (0~5)'

export function RatingV2Example2() {
  return <RatingV2 score={-0.01} />
}
RatingV2Example2.storyName = 'score가 0보다 작은 경우'

export function RatingV2Example3() {
  return <RatingV2 score={5.01} />
}
RatingV2Example3.storyName = 'score가 5보다 큰 경우'
