import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-design-system'

const { links: Links } = ELEMENTS

storiesOf('TripleDocument.링크', module)
  .add('일반', () => (
    <Links
      value={{
        links: [
          {
            label: '방콕 3박 4일 가이드',
          },
          {
            label: '도쿄 타워',
          },
        ],
      }}
    />
  ))
  .add('강조', () => (
    <Links
      value={{
        links: [
          {
            label: '다낭 바로 가기',
          },
        ],
        display: 'button',
      }}
    />
  ))
  .add('강조 (2개)', () => (
    <Links
      value={{
        links: [
          {
            label: '다낭 바로 가기',
          },
          {
            label: '도쿄 바로 가기',
          },
        ],
        display: 'button',
      }}
    />
  ))
  .add('확장', () => (
    <Links
      value={{
        links: [
          {
            label: '장소 보기',
          },
        ],
        display: 'block',
      }}
    />
  ))
