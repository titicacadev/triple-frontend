import React from 'react'
import DefaultFooter, { LogoFooter } from '@titicaca/footer'

import { sessionContextProviderDecorator } from '../../decorators'

export default {
  title: 'footer / Footer',
  decorators: [sessionContextProviderDecorator],
}

export function BaseFooter() {
  return <DefaultFooter />
}

BaseFooter.storyName = '기본 푸터'

export function BaseLogoFooter() {
  return <LogoFooter />
}

BaseLogoFooter.storyName = '로고 푸터'
