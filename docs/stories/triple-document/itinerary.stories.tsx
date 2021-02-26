import React from 'react'
import { ELEMENTS } from '@titicaca/triple-document'
import { action } from '@storybook/addon-actions'

import mock from '../__mocks__/triple-document.itinerary.json'
import { sessionContextProviderDecorator } from '../../decorators'

const { itinerary: Itinerary } = ELEMENTS

export default {
  title: 'triple-document / 추천코스',
  decorators: [sessionContextProviderDecorator],
}

export function DocumentItinerary() {
  return (
    <Itinerary
      value={mock.article.source.body[1].value}
      onClickSaveToItinerary={action('onClickSaveToItinerary')}
    />
  )
}

DocumentItinerary.storyName = '추천코스 기본'
