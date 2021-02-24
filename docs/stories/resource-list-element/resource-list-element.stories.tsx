import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text, number, array } from '@storybook/addon-knobs'
import ExtendedResourceListElement, {
  ReviewScrapStat,
  ResourceListElementStats,
} from '@titicaca/resource-list-element'
import Pricing from '@titicaca/pricing'
import { Container } from '@titicaca/core-elements'

storiesOf('resource-list-element / resource-list-element', module)
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
  .add('ExtendedResourceListElement', () => (
    <ExtendedResourceListElement
      name={text('name', '카멜리아 힐 입장권')}
      comment={text(
        'comment',
        '500여 품종 동백나무로 사계절 내내 아름다운 포토 스팟 수목원',
      )}
      reviewsCount={number('reviewsCount', 5)}
      reviewsRating={number('reviewsRating', 3)}
      hideScrapButton={boolean('hideScrapButton', true)}
      partnerName={text('partnerName', '브이패스')}
    >
      <Container margin={{ top: 18 }}>
        <Pricing
          basePrice={number('basePrice', 30000)}
          basePriceUnit={text('basePriceUnit', '원')}
          salePrice={25000}
          rich
        />
      </Container>
    </ExtendedResourceListElement>
  ))
