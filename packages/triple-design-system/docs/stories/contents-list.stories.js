import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container, Text } from '@titicaca/triple-design-system'
import { contents } from './contents-list.sample.json'
import RecommendedContentsList from '../../src/views/recommended-contents-list'

storiesOf('RelatedContent', module).add('관련 컨텐츠', () => (
  <Container margin={{ top: 50, left: 30, right: 30 }}>
    <Text size="big" bold>
      다른 컨텐츠 더보기
    </Text>
    <RecommendedContentsList {...{ contents }} />
  </Container>
))
