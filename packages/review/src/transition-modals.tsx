import * as React from 'react'
import { TransitionModal as TransitionModalElement } from '@titicaca/modals'
export const HASH_REVIEW_TRANSITION_MODAL = 'poi.modal.review-transition'
export const HASH_REVIEW_WRITE_TRANSITION_MODAL =
  'poi.modal.review-write-transition'

const HASHES = [
  HASH_REVIEW_TRANSITION_MODAL,
  HASH_REVIEW_WRITE_TRANSITION_MODAL,
]

const TYPES_BY_HASH = {
  [HASH_REVIEW_TRANSITION_MODAL]: 'review',
  [HASH_REVIEW_WRITE_TRANSITION_MODAL]: 'reviewWrite',
}

export function TransitionModal({
  historyActions,
  regionId,
  resourceId,
}: {
  historyActions: any
  regionId: string
  resourceId: string
}) {
  const { uriHash, back } = historyActions
  const href = generateDeepLink({ regionId, resourceId }) //@TODO
  return (
    <TransitionModalElement
      open={HASHES.includes(uriHash)}
      messageType={TYPES_BY_HASH[uriHash]}
      onClose={back}
      onConfirm={() => {
        window.location.href = href
      }}
    />
  )
}

function generateDeepLink({ regionId, resourceId }) {
  //@TODO 링크 만들어야함
  return regionId + resourceId
}
