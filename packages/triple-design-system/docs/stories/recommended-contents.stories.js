import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container, Text } from '@titicaca/triple-design-system'
import { contents } from './recommended-contents.sample.json'
import RecommendedContents from '../../src/views/recommended-contents'

storiesOf('RecommendedContents', module).add('추천 컨텐츠', () => (
  <Container margin={{ top: 50, left: 30, right: 30 }}>
    <Text size="big" bold>
      다른 컨텐츠 더보기
    </Text>
    <RecommendedContents {...{ contents }} margin={{ top: 30 }} />
  </Container>
))
