import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import FloatingInstallButton from '@titicaca/floating-install-button'

storiesOf('floating-install-button | FloatingInstallButton', module).add(
  '플로팅 버튼',
  () => (
    <FloatingInstallButton
      appInstallLink={'https://triple.onelink.me/aZP6/21d43a81'}
      fixed={boolean('화면 고정', true)}
      trackEvent={() => {}}
      description={text('설명', '설명 텍스트가 들어갑니다.')}
      trackEventParams={{
        onShow: { ga: ['플로팅_설치하기_노출'] },
        onSelect: { ga: ['플로팅_설치하기_선택'] },
        onClose: { ga: ['플로팅_설치하기_닫기'] },
      }}
    />
  ),
)
