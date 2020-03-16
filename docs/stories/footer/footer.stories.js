import React from 'react'
import { storiesOf } from '@storybook/react'
import DefaultFooter, { LogoFooter, CSFooter } from '@titicaca/footer'
import { select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('footer | Footer', module).add('기본', () => <DefaultFooter />)
storiesOf('footer | Footer', module).add('CS', () => (
  <CSFooter
    serviceType={select('서비스', ['AIR', 'TNA', 'HOTEL'], 'AIR')}
    csTime={'오전 9시 - 오후 6시 (한국시간 기준, 연중무휴)'}
    csMessage={
      '현지사용 긴급문의 카카오톡 @트리플서비스\n(오전 9시 - 오후 10시)'
    }
    showCSButton={boolean('1:1 문의 버튼 표시 여부', true)}
    onFAQButtonClick={action('자주묻는 질문 버튼 클릭')}
    onCSButtonClick={action('1:1 문의 버튼 클릭')}
  />
))
storiesOf('footer | Footer', module).add('Logo', () => <LogoFooter />)
