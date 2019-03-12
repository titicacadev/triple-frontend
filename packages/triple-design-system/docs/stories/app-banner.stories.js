import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { AppBanner } from '@titicaca/triple-design-system'

storiesOf('AppBanner', module)
  .addDecorator(withKnobs)
  .add('일반', () => (
    <AppBanner
      fixed={boolean('상단고정', false)}
      title={text('제목', '트리플 - 해외여행 가이드')}
      description={text('설명', '가이드북, 일정짜기, 길찾기, 맛집')}
      cta={text('버튼 레이블', '앱에서 보기')}
    />
  ))
