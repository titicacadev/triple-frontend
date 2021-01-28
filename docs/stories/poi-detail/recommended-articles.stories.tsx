import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { RecommendedArticles } from '@titicaca/poi-detail'

storiesOf('poi-detail | RecommendedArticles', module).add('일반', () => (
  <RecommendedArticles
    inventoryId={text('Inventory ID', 'd')}
    installURL={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
    regionId={text('Region ID', '23c5965b-01ad-486b-a694-a2ced15f245c')}
    onArticleClick={action('onArticleClick')}
  />
))
