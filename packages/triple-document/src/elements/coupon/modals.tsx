import { useTranslation, useHashRouter } from '@titicaca/triple-web'
import { Text, Modal, Alert } from '@titicaca/tds-ui'
import { styled } from 'styled-components'
import { useNavigate } from '@titicaca/router'

interface HashKeyValue {
  [hash: string]: string
}

export const HASH_COMPLETE_DOWNLOAD_COUPON = 'coupon.download-complete.modal'
export const HASH_COMPLETE_DOWNLOAD_COUPON_GROUP =
  'coupon.group-download-complete.modal'
export const HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP =
  'coupon.part-of-group-download-complete.modal'
export const HASH_ALREADY_DOWNLOAD_COUPON = 'coupon.download-already.modal'
export const HASH_ERROR_COUPON = 'coupon.error.modal'

const MODAL_HASHES = [
  HASH_COMPLETE_DOWNLOAD_COUPON,
  HASH_COMPLETE_DOWNLOAD_COUPON_GROUP,
  HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP,
  HASH_ALREADY_DOWNLOAD_COUPON,
]

const ICON_TYPES: HashKeyValue = {
  [HASH_COMPLETE_DOWNLOAD_COUPON]:
    'https://assets.triple.guide/images/img-popup-coupon@3x.png',
  [HASH_COMPLETE_DOWNLOAD_COUPON_GROUP]:
    'https://assets.triple.guide/images/img-popup-coupon@3x.png',
  [HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP]:
    'https://assets.triple.guide/images/img-popup-coupon@3x.png',
}

const CouponIcon = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: 40px auto 10px;
`

export function CouponModal({ identifier }: { identifier: string }) {
  const t = useTranslation()
  const { uriHash, removeUriHash } = useHashRouter()
  const { navigate } = useNavigate()

  const modalHash = uriHash.replace(`${identifier}.`, '')

  const titleTypes: HashKeyValue = {
    [HASH_ALREADY_DOWNLOAD_COUPON]: t('이미 받은 쿠폰입니다.'),
    [HASH_COMPLETE_DOWNLOAD_COUPON]: t('쿠폰 받기 완료'),
    [HASH_COMPLETE_DOWNLOAD_COUPON_GROUP]: t('쿠폰 받기 완료'),
    [HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP]: t('쿠폰 받기 완료'),
  }

  const messageTypes: HashKeyValue = {
    [HASH_COMPLETE_DOWNLOAD_COUPON]: t(
      '쿠폰을 받았습니다! 쿠폰함에서 확인할 수 있어요~!',
    ),

    [HASH_COMPLETE_DOWNLOAD_COUPON_GROUP]: t(
      '쿠폰을 모두 받았습니다. 쿠폰함에서 확인할 수 있어요~!',
    ),

    [HASH_ALREADY_DOWNLOAD_COUPON]: t('쿠폰함에서 쿠폰을 확인하세요.'),
    [HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP]: t(
      '쿠폰을 모두 받았습니다. (이미 받은 쿠폰 제외) 쿠폰함에서 확인할 수 있어요~!',
    ),
  }

  const confirmMessageTypes: HashKeyValue = {
    [HASH_ALREADY_DOWNLOAD_COUPON]: t('쿠폰함 가기'),
    [HASH_COMPLETE_DOWNLOAD_COUPON]: t('쿠폰 확인'),
    [HASH_COMPLETE_DOWNLOAD_COUPON_GROUP]: t('쿠폰 확인'),
    [HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP]: t('쿠폰 확인'),
  }

  return (
    <Modal
      open={uriHash.includes(identifier) && MODAL_HASHES.includes(modalHash)}
      onClose={removeUriHash}
    >
      {ICON_TYPES[modalHash] ? (
        <CouponIcon src={ICON_TYPES[modalHash]} />
      ) : null}
      <Text
        center
        bold
        size="big"
        lineHeight={1.38}
        color="gray"
        margin={{
          top: ICON_TYPES[modalHash] ? 0 : 40,
          left: 30,
          right: 30,
          bottom: 10,
        }}
      >
        {titleTypes[modalHash]}
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
        {messageTypes[modalHash]}
      </Text>

      <Modal.Actions>
        <Modal.Action color="gray" onClick={() => removeUriHash()}>
          {t('닫기')}
        </Modal.Action>
        <Modal.Action
          color="blue"
          onClick={() => {
            removeUriHash()
            navigate(
              `/inlink?path=${encodeURIComponent(
                '/benefit/coupons/my?_triple_no_navbar',
              )}`,
            )
          }}
        >
          {confirmMessageTypes[modalHash]}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

export function CouponAlertModal({
  identifier,
  errorMessage,
}: {
  identifier: string
  errorMessage?: string
}) {
  const t = useTranslation()
  const { hasUriHash, removeUriHash } = useHashRouter()
  return (
    <Alert
      title={t('쿠폰 다운로드 안내')}
      open={hasUriHash(`${identifier}.${HASH_ERROR_COUPON}`)}
      onConfirm={removeUriHash}
    >
      {errorMessage}
    </Alert>
  )
}
