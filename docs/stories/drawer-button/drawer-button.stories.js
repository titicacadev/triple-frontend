import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import DrawerButton from '@titicaca/drawer-button'

const LongPage = styled.div`
  height: 4000px;
`

storiesOf('drawer-button | DrawerButton', module).add('기본', () => {
  const [active, setActive] = useState(true)

  return (
    <LongPage>
      {!active && <button onClick={() => setActive(true)}>열기</button>}
      <br />
      아이폰 X으로 접속한 다음 우측 상단 새창으로 열기를 사용하여
      safe-area-inset을 테스트 할 수 있습니다.
      <DrawerButton
        active={active}
        onClick={() => {
          action('클릭')()
          setActive(false)
        }}
      >
        선택 완료
      </DrawerButton>
    </LongPage>
  )
})
