import qs from 'qs'
import { createRoot } from 'react-dom/client'
import { Modal } from '@titicaca/modals'

import { WebActionParams } from './types'

export default async function converse({
  url: { path, query } = {},
}: WebActionParams) {
  if (path === '/web-action/converse' && query) {
    const { path: url } = qs.parse(query) as { path: string }

    // 예시 코드
    const { title, body: description } = (await fetch(url).then((response) => {
      return response.json()
    })) as { title: string; body: string }

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
