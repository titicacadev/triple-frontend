import * as React from 'react'
import { TransitionModal as TransitionModalElement } from '@titicaca/modals'
import { useHistoryContext } from '@titicaca/react-contexts'

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

export function TransitionModals({ deepLink }: { deepLink: string }) {
  const { uriHash, back } = useHistoryContext()

  return (
    <TransitionModalElement
      open={HASHES.includes(uriHash)}
      messageType={TYPES_BY_HASH[uriHash]}
      onClose={back}
      onConfirm={() => {
        window.location.href = deepLink
      }}
    />
  )
}
