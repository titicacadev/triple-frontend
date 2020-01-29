import React from 'react'
import { Text } from '@titicaca/core-elements'
import { Modal, Alert } from '@titicaca/modals'
import styled from 'styled-components'
import { useHistoryContext } from '@titicaca/react-contexts'

type HashKeyValue = {
  [hash: string]: string
}

export const HASH_COMPLETE_DOWNLOAD_COUPON = 'coupon.download-complete.modal'
export const HASH_ALREADY_DOWNLOAD_COUPON = 'coupon.download-already.modal'
export const HASH_ERROR_COUPON = 'coupon.error.modal'
export const HASH_COUPON_APP_TRANSITION_MODAL = 'coupon.app-transition.modal'

const MODAL_HASHES = [
  HASH_COMPLETE_DOWNLOAD_COUPON,
  HASH_ALREADY_DOWNLOAD_COUPON,
]

const TITLE_TYPES: HashKeyValue = {
  [HASH_ALREADY_DOWNLOAD_COUPON]: '이미 받은 쿠폰입니다.',
  [HASH_COMPLETE_DOWNLOAD_COUPON]: '쿠폰 받기 완료',
}

const MESSAGE_TYPES: HashKeyValue = {
  [HASH_COMPLETE_DOWNLOAD_COUPON]:
    '쿠폰을 받았습니다!\n쿠폰함에서 확인 할 수 있어요~!',
  [HASH_ALREADY_DOWNLOAD_COUPON]: '쿠폰함에서 쿠폰을 확인하세요.',
}

const ICON_TYPES: HashKeyValue = {
  [HASH_COMPLETE_DOWNLOAD_COUPON]:
    'https://assets.triple.guide/images/img-popup-coupon@3x.png',
}

const CONFIRM_MESSAGE_TYPES: HashKeyValue = {
  [HASH_ALREADY_DOWNLOAD_COUPON]: '쿠폰함 가기',
  [HASH_COMPLETE_DOWNLOAD_COUPON]: '쿠폰 확인',
}

const CouponIcon = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: 40px auto 10px auto;
`

export function CouponModal({ webUrlBase }: { webUrlBase: string }) {
  const { uriHash, back, navigate } = useHistoryContext()

  return (
    <Modal open={MODAL_HASHES.includes(uriHash)} onClose={back}>
      {ICON_TYPES[uriHash] ? <CouponIcon src={ICON_TYPES[uriHash]} /> : null}
      <Text
        center
        bold
        size="big"
        lineHeight={1.38}
        color="gray"
        margin={{
          top: ICON_TYPES[uriHash] ? 0 : 40,
          left: 30,
          right: 30,
          bottom: 10,
        }}
      >
        {TITLE_TYPES[uriHash]}
      </Text>
      <Text
        center
        size="small"
        lineHeight={1.43}
        color="gray"
        padding={{
          bottom: 40,
          left: 30,
          right: 30,
        }}
        alpha={0.7}
      >
        {MESSAGE_TYPES[uriHash]}
      </Text>

      <Modal.Actions>
        <Modal.Action color="gray" onClick={back}>
          취소
        </Modal.Action>
        <Modal.Action
          color="blue"
          onClick={() => {
            back()
            navigate(`${webUrlBase}/benefit/coupons/my?_triple_no_navbar`)
          }}
        >
          {CONFIRM_MESSAGE_TYPES[uriHash]}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

export function CouponAlertModal({ errorMessage }: { errorMessage?: string }) {
  const { uriHash, back } = useHistoryContext()

  return (
    <Alert
      title="쿠폰 다운로드 오류"
      open={uriHash === HASH_ERROR_COUPON}
      onConfirm={back}
    >
      {errorMessage}
    </Alert>
  )
}

const IconImage = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  margin: 32px auto 10px auto;
`

export function CouponTransitionModal({ deepLink }: { deepLink: string }) {
  const { uriHash, back } = useHistoryContext()

  return (
    <Modal open={uriHash === HASH_COUPON_APP_TRANSITION_MODAL} onClose={back}>
      <IconImage src="https://assets.triple.guide/images/img-popup-coupon@3x.png" />
      <Text
        center
        size="small"
        lineHeight={1.43}
        color="gray"
        alpha={0.7}
        padding={{ bottom: 30, left: 30, right: 30 }}
      >
        {'쿠폰 저장을 위해\n트리플에 로그인해주세요!'}
      </Text>

      <Modal.Actions>
        <Modal.Action color="gray" onClick={back}>
          취소
        </Modal.Action>
        <Modal.Action
          color="blue"
          onClick={() => {
            window.location.href = deepLink
          }}
        >
          트리플가기
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
