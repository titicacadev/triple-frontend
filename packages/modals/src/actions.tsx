import React from 'react'
import Modal from './modal-base'

export default function ModalActions({
  negative: { text: negativeText, onClick: onNegativeClick },
  positive: { text: positiveText, onClick: onPositiveClick },
}: {
  negative: {
    text?: string
    onClick?: (e?: React.SyntheticEvent) => any
  }
  positive: {
    text?: string
    onClick?: (e?: React.SyntheticEvent) => any
  }
}) {
  return (
    <Modal.Actions>
      <Modal.Action color="gray" onClick={onNegativeClick}>
        {negativeText}
      </Modal.Action>
      <Modal.Action color="blue" onClick={onPositiveClick}>
        {positiveText}
      </Modal.Action>
    </Modal.Actions>
  )
}
