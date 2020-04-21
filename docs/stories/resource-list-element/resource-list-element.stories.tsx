import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, array } from '@storybook/addon-knobs'
import {
  Card,
  ReviewScrapStat,
  ResourceListElementStats,
} from '@titicaca/resource-list-element'
import styled from 'styled-components'

const CheckerBoardBackground = styled.div`
  width: 100%;
  height: 2000px;
  padding: 75px 0;
  background-image: linear-gradient(45deg, #cccccc 25%, transparent 25%),
    linear-gradient(-45deg, #cccccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #cccccc 75%),
    linear-gradient(-45deg, transparent 75%, #cccccc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`

storiesOf('resource-list-element | resource-list-element', module)
  .add('Card', () => (
    <CheckerBoardBackground>
      <Card
        cardHeight={number('cardHeight', 140)}
        sideSpacing={number('sideSpacing', 12)}
      >
        children을 넣어주세요
      </Card>
    </CheckerBoardBackground>
  ))
  .add('ReviewScrapStat', () => (
    <ReviewScrapStat
      reviewsCount={number('reviewsCount', 2)}
      scrapsCount={number('scrapsCount', 0)}
      reviewsRating={number('reviewsRating', 3.7, { min: 1, max: 5 })}
    />
  ))
  .add('ResourceListElementStats', () => (
    <ResourceListElementStats stats={array('stats', ['볼거리', '판교'])} />
  ))
