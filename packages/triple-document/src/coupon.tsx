import * as React from 'react'
import styled, { css } from 'styled-components'
import { Modal } from '@titicaca/modals'
import {
  Button,
  GetGlobalColor,
  Image,
  Text,
} from '@titicaca/triple-design-system'

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

export default function DownloadCoupon({
  onCouponDownload,
  onCouponModalConfirm,
  downloadMessage,
  downloadCompleteMessage,
  downloadDescription,
  isDownloaded,
}: {
  onCouponDownload?: (e: React.SyntheticEvent) => any
  onCouponModalConfirm?: (e: React.SyntheticEvent) => any
  downloadMessage?: string
  downloadCompleteMessage?: string
  downloadDescription?: string
  isDownloaded: boolean
}) {
  const [modalVisibility, changeModalVisibility] = React.useState(false)
  const onDownloadButtonClick = (e) => {
    if (!isDownloaded) {
      onCouponDownload && onCouponDownload(e)
      changeModalVisibility(true)
    }
  }
  const onCouponDownloadConfirmClick = (e) => {
    onCouponModalConfirm && onCouponModalConfirm(e)
    changeModalVisibility(false)
  }

  return (
    <>
      <CouponDownloadButton
        onClick={onDownloadButtonClick}
        isDownloaded={isDownloaded}
      >
        {isDownloaded
          ? downloadCompleteMessage || '받기 완료'
          : downloadMessage || '쿠폰 받기'}
      </CouponDownloadButton>

      <CouponDescriptionContainer
        margin={{ top: 13 }}
        lineHeight={1.46}
        size="tiny"
      >
        {downloadDescription ||
          '본 쿠폰은 결제액에 대한 제한 없이 현금처럼 사용할 수 있는 쿠폰이며, 트리플 내 호텔 예약에 이용 가능합니다.'}
      </CouponDescriptionContainer>

      <DownloadedCouponModal
        open={modalVisibility}
        onClose={() => changeModalVisibility(false)}
        onConfirm={onCouponDownloadConfirmClick}
      />
    </>
  )
}
