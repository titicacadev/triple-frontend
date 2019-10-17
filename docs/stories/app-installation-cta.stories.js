import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

import { ImageBanner } from '@titicaca/app-installation-cta'

storiesOf('AppInstallationCTA', module).add('이미지 배너', () => (
  <ImageBanner
    imgUrl={text('이미지 URL', '')}
    installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
    onDismiss={action('banner dismissed')}
  />
))
