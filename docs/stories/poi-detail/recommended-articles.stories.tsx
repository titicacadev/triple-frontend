import React from 'react'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { RecommendedArticles } from '@titicaca/poi-detail'
import { Container } from '@titicaca/core-elements'

export default {
  title: 'poi-detail / RecommendedArticles',
  component: RecommendedArticles,
}

export const Basic = () => {
  return (
    <Container padding={{ left: 30, right: 30 }}>
      <RecommendedArticles
        appInstallationCta={{
          inventoryId: text('Inventory ID', 'app-install-cta-footer-hotel-v1'),
          href: text('설치 URL', 'https://triple-dev.titicaca-corp.com'),
          onClick: action('onCTAClick'),
        }}
        regionId={text('Region ID', '23c5965b-01ad-486b-a694-a2ced15f245c')}
        onArticleClick={action('onArticleClick')}
      />
    </Container>
  )
}
Basic.storyName = '일반'
