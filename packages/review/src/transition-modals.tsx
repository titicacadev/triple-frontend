import * as React from 'react'
import styled from 'styled-components'
import { Text } from '@titicaca/triple-design-system'
import { Modal } from '@titicaca/modals'
import { useReviewContext } from './review-context'

export const HASH_REVIEW_TRANSITION_MODAL = 'poi.modal.review-transition'
export const HASH_REVIEW_WRITE_TRANSITION_MODAL =
  'poi.modal.review-write-transition'
export const HASH_REVIEW_THUMBNAIL_TRANSITION_MODAL =
  'poi.modal.review-thumbnail-transition'

const HASHES = [
  HASH_REVIEW_TRANSITION_MODAL,
  HASH_REVIEW_WRITE_TRANSITION_MODAL,
  HASH_REVIEW_THUMBNAIL_TRANSITION_MODAL,
]

const MESSAGES_BY_TYPES = {
  review: '리뷰는 앱에서 더 편리하게\n확인할 수 있어요.',
  reviewWrite: '리뷰는 앱에서 작성할 수 있어요.',
}

const ICON_NAMES_BY_TYPE = {
  review: 'ico-popup-review@4x.png',
  reviewWrite: 'ico-popup-review@4x.png',
}

const TYPES_BY_HASH = {
  [HASH_REVIEW_TRANSITION_MODAL]: 'review',
  [HASH_REVIEW_WRITE_TRANSITION_MODAL]: 'reviewWrite',
}

const EVENT_LABELS_BY_HASH = {
  [HASH_REVIEW_TRANSITION_MODAL]: '리뷰_리뷰글더보기',
  [HASH_REVIEW_WRITE_TRANSITION_MODAL]: '리뷰_리뷰쓰기',
  [HASH_REVIEW_THUMBNAIL_TRANSITION_MODAL]: '리뷰_리뷰사진썸네일',
}

const IconImage = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  margin: 32px auto 10px auto;
`

export function TransitionModal({ source }: { source: any }) {

  const href = generateDeepLink({ source }) //
  const { popup, setPopup }: any = useReviewContext()
  const type = TYPES_BY_HASH[popup]
  const closePopup = () => setPopup(undefined)
  return (
    <Modal open={HASHES.includes(popup)} onClose={closePopup}>
      <IconImage
        src={`https://assets.triple.guide/images/${ICON_NAMES_BY_TYPE[type]}`}
      />
      <Text
        center
        size="small"
        lineHeight={1.43}
        color="gray"
        alpha={0.7}
        padding={{ bottom: 30, left: 30, right: 30 }}
      >
        {MESSAGES_BY_TYPES[type]}
      </Text>

      <Modal.Actions>
        <Modal.Action color="gray" onClick={closePopup}>
          취소
        </Modal.Action>
        <Modal.Action
          color="blue"
          onClick={() => {
            location.href = href

            closePopup()
          }}
        >
          트리플가기
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

function generateDeepLink({ source }: { source: any }) {
  //@TODO 링크 만들어야함
  return source
}
