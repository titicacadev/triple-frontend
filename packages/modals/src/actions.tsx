import { SyntheticEvent } from 'react'

import { ModalBase as Modal, silenceEvent } from './modal-base'

export default function ModalActions({
  negative: { text: negativeText, onClick: onNegativeClick },
  positive: { text: positiveText, onClick: onPositiveClick },
}: {
  negative: {
    text?: string
    onClick?: (e?: SyntheticEvent) => unknown
  }
  positive: {
    text?: string
    onClick?: (e?: SyntheticEvent) => unknown
  }
}) {
  return (
    <Modal.Actions>
      <Modal.Action
        color="gray"
        onClick={(e) => {
          silenceEvent(e)
          onNegativeClick && onNegativeClick(e)
        }}
      >
        {negativeText}
      </Modal.Action>
      <Modal.Action
        color="blue"
        onClick={(e) => {
          silenceEvent(e)
          onPositiveClick && onPositiveClick(e)
        }}
      >
        {positiveText}
      </Modal.Action>
    </Modal.Actions>
  )
}
