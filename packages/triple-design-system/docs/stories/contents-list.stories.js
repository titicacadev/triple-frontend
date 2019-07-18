import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  RelatedContentsList,
  RelatedContent,
  Container,
  Text,
} from '@titicaca/triple-design-system'

storiesOf('RelatedContent', module).add('관련 컨텐츠', () => (
  <Container margin={{ top: 50, left: 30, right: 30 }}>
    <Text size="big" bold>
      다른 컨텐츠 더보기
    </Text>
    <RelatedContentsList margin={{ top: 30, right: -15 }}>
      <RelatedContent backgroundImageUrl="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg">
        한줄테스트
      </RelatedContent>
      <RelatedContent backgroundImageUrl="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg">
        두줄테스트
        <br />
        두줄테스트
      </RelatedContent>
      <RelatedContent backgroundImageUrl="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg">
        윗줄넘어갔어요오오오오윗줄넘어갔어요오오오오윗줄넘어갔어요오오오오윗줄넘어갔어요오오오오
        <br />
        윗줄테스트
      </RelatedContent>
      <RelatedContent backgroundImageUrl="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg">
        아랫줄테스트
        <br />
        아랫줄넘어갔어요오오오오아랫줄넘어갔어요오오오오아랫줄넘어갔어요오오오오아랫줄넘어갔어요오오오오
      </RelatedContent>
      <RelatedContent backgroundImageUrl="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg">
        윗줄넘어갔어요오오오오윗줄넘어갔어요오오오오윗줄넘어갔어요오오오오윗줄넘어갔어요오오오오
        <br />
        아랫줄넘어갔어요오오오오아랫줄넘어갔어요오오오오아랫줄넘어갔어요오오오오아랫줄넘어갔어요오오오오
      </RelatedContent>
      <RelatedContent backgroundImageUrl="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg">
        한줄인데넘어갔어요오오오오오오오한줄인데넘어갔어요오오오오오오오한줄인데넘어갔어요오오오오오오오
      </RelatedContent>
    </RelatedContentsList>
  </Container>
))
