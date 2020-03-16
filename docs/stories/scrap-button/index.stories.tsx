import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import ScrapButton from '@titicaca/scrap-button'
import styled from 'styled-components'

const ScrapButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
  border: solid 1px black;
  padding: 20px;
`

storiesOf('ScrapButton | ScrapButton', module)
  .add('일반', () => (
    <ScrapButtonWrapper>
      <ScrapButton
        scraped={boolean('scraped', false)}
        onScrapedChange={action('scraped changed')}
        resource={{ a: 'test' }}
      />
      position: relative
    </ScrapButtonWrapper>
  ))
  .add('compact', () => (
    <ScrapButtonWrapper>
      <ScrapButton
        scraped={boolean('scraped', false)}
        onScrapedChange={action('scraped changed')}
        resource={{ a: 'test' }}
        compact
      />
      position: relative
    </ScrapButtonWrapper>
  ))
