import { createRoot } from 'react-dom/client'
import { Modal } from '@titicaca/modals'

import { WebActionParams } from './types'

const title = 'TEST'
const description = '성공입니다.'

export default async function converse({
  url: { path } = {},
}: WebActionParams) {
  if (path === '/web-action/converse') {
    if (title && description) {
      const container = document.createElement('div')
      const root = createRoot(container)

      root.render(
        OpenModal({ title, description, onClose: () => root.unmount() }),
      )

      return true
    }
  }

  return false
}

function OpenModal({
  title,
  description,
  onClose,
}: {
  title: string
  description: string
  onClose: () => void
}) {
  return (
    <Modal open onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Description>{description}</Modal.Description>
      <Modal.Actions>
        <Modal.Action color="blue" onClick={onClose}>
          확인
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
