import React from 'react'
import { storiesOf } from '@storybook/react'
import { Text } from '@titicaca/core-elements'
import { Modal, Confirm, Alert } from '@titicaca/modals'
import styled from 'styled-components'
import { boolean } from '@storybook/addon-knobs/dist'

const Empty = styled.div`
  height: 200vh;
`

storiesOf('modals | Modal', module)
  .add('Basic', () => (
    <>
      ss
      <Empty />
      <Modal open={boolean('모달 오픈', false)}>
        <Text
          center
          size="large"
          lineHeight={1.38}
          color="gray"
          padding={{ top: 40, bottom: 40, left: 30, right: 30 }}
        >
          안녕
        </Text>
      </Modal>
    </>
  ))
  .add('Confirm', () => (
    <Confirm open>
      삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
    </Confirm>
  ))
  .add('Alert', () => (
    <Alert
      title="장애공지
    타이틀이 두줄일수도"
      open={boolean('알럿 오픈', true)}
    >
      실시간 객실정보가 변경되어 안내드려요.
    </Alert>
  ))
