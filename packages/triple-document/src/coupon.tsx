import * as React from 'react'
import styled, { css } from 'styled-components'
import { Modal, Alert } from '@titicaca/modals'
import {
  Button,
  GetGlobalColor,
  Text,
  Container,
} from '@titicaca/triple-design-system'
import { useHistoryContext } from '@titicaca/react-contexts'
import Cookies from 'universal-cookie'
import fetch from 'isomorphic-fetch'

const ModalCouponDownloadDescription = styled(Text)`
  color: rgb(${GetGlobalColor('gray')}, 0.7);
`

const CouponIcon = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: 40px auto 0 auto;
`

function DownloadedCouponModal({
  onConfirm,
  onClose,
  open,
}: {
  onConfirm?: (e: React.SyntheticEvent) => any
  onClose?: (e: React.SyntheticEvent) => any
  open: boolean
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <CouponIcon src="https://assets.triple.guide/images/img-popup-coupon%403x.png" />

      <Text
        center
        font
        bold
        size="big"
        lineHeight={1.38}
        color="gray"
        padding={{ top: 10, left: 30, right: 30, bottom: 10 }}
      >
        쿠폰 받기 완료
      </Text>
      <ModalCouponDownloadDescription
        center
        size="small"
        lineHeight={1.43}
        color="gray"
        padding={{ bottom: 40, left: 30, right: 30 }}
      >
        {'쿠폰을 받았습니다!\n쿠폰함에서 확인 할 수 있어요~!'}
      </ModalCouponDownloadDescription>

      <Modal.Actions>
        <Modal.Action color="gray" onClick={onClose}>
          취소
        </Modal.Action>
        <Modal.Action color="blue" onClick={onConfirm}>
          쿠폰 확인
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

const CouponDescriptionContainer = styled(Text)`
  color: rgba(${GetGlobalColor('gray')}, 0.5);
`

// eslint-disable-next-line no-unexpected-multiline
const CouponDownloadButton = styled(Button)<{
  isDownloaded?: boolean
}>`
  border-radius: 6px;
  width: 100%;
  ${({ isDownloaded }) =>
    isDownloaded &&
    css`
      background-color: #efefef;
      color: rgba(${GetGlobalColor('gray')}, 0.3);
    `};
`

export default function Coupon({ value: { identifier: slugId, description } }) {
  const [modalVisibility, changeModalVisibility] = React.useState(false)
  const [isDownloaded, changeDownloadStatus] = React.useState(true)
  const [alertMessage, changeAlertMessage] = React.useState(undefined)

  React.useState(async () => {
    try {
      const sessionId = new Cookies(document.cookie).get('x-soto-session')
      const response = await fetch(`/api/benefit/coupons/${slugId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(sessionId ? { 'X-Soto-Session': sessionId } : {}),
        },
        credentials: 'same-origin',
      })

      if (response.ok) {
        const {
          downloaded,
          publicationPeriod: { startAt, endAt },
        } = response
        changeDownloadStatus(downloaded)
      }
    } catch (e) {}
  })

  async function onDownloadButtonClick(e) {
    if (!isDownloaded) {
      try {
        const sessionId = new Cookies(document.cookie).get('x-soto-session')
        const response = await fetch(
          `/api/benefit/coupons/${slugId}/download`,
          {
            headers: {
              'Content-Type': 'application/json',
              ...(sessionId ? { 'X-Soto-Session': sessionId } : {}),
            },
            credentials: 'same-origin',
          },
        )

        if (response.ok) {
          const { downloaded } = response.json()
          changeDownloadStatus(downloaded)
        } else {
          changeAlertMessage(response.statusText)
        }
      } catch (e) {}
    }
  }

  return (
    <Container margin={{ top: 44, right: 30, left: 30, bottom: 42 }}>
      <CouponDownloadButton
        onClick={(e) => onDownloadButtonClick}
        isDownloaded={isDownloaded}
      >
        {isDownloaded ? '받기 완료' : '쿠폰 받기'}
      </CouponDownloadButton>

      <CouponDescriptionContainer
        margin={{ top: 13 }}
        lineHeight={1.46}
        size="tiny"
      >
        {description ||
          '본 쿠폰은 결제액에 대한 제한 없이 현금처럼 사용할 수 있는 쿠폰이며, 트리플 내 호텔 예약에 이용 가능합니다.'}
      </CouponDescriptionContainer>

      <DownloadedCouponModal
        open={modalVisibility}
        onClose={() => changeModalVisibility(false)}
        onConfirm={() => {
          const { navigate } = useHistoryContext()
          navigate(`${window.location.host}/benefit/coupons/my`)
        }}
      />

      <Alert
        title={alertMessage}
        open={!!alertMessage}
        onConfirm={() => changeAlertMessage(undefined)}
      >
        {'오류가 발생했습니다\n잠시 후에 다시 시도해주세요.'}
      </Alert>
    </Container>
  )
}
