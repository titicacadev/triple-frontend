import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Container,
  Text,
  RecommendedContents,
} from '@titicaca/triple-design-system'
import { contents } from './recommended-contents.sample.json'

storiesOf('RecommendedContents', module).add('추천 컨텐츠', () => (
  <Container margin={{ top: 50, left: 30, right: 30 }}>
    <Text size="big" bold>
      다른 컨텐츠 더보기
    </Text>
    <RecommendedContents contents={contents} margin={{ top: 30 }} />
  </Container>
))
