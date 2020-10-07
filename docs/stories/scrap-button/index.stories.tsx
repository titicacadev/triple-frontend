import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { CompactScrapButton, RegularScrapButton } from '@titicaca/scrap-button'
import styled from 'styled-components'
import { StoryFn } from '@storybook/addons'
import { ScrapsProvider } from '@titicaca/react-contexts'

const ScrapButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
  border: solid 1px black;
  padding: 20px;
`

export default {
  title: 'ScrapButton',
  decorators: [
    (storyFn: StoryFn) => (
      <ScrapButtonWrapper>
        {storyFn()}
        position: relative
      </ScrapButtonWrapper>
    ),
    (storyFn: StoryFn<JSX.Element>) => (
      <ScrapsProvider>{storyFn()}</ScrapsProvider>
    ),
  ],
}

export function regularScrapButton() {
  return (
    <RegularScrapButton
      resource={{
        id: 'scrapable_id',
        type: 'scrapable_type',
        scraped: boolean('initial scraped', false),
      }}
    />
  )
}

export function compactScrapButton() {
  return (
    <CompactScrapButton
      resource={{
        id: 'scrapable_id',
        type: 'scrapable_type',
        scraped: boolean('initial scraped', false),
      }}
    />
  )
}
