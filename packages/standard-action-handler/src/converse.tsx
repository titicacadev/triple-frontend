import qs from 'qs'
import { createRoot } from 'react-dom/client'
import { Modal } from '@titicaca/modals'

import { WebActionParams } from './types'

const HASH_CONVERSE_MODAL = 'hash.converse-modal'

export default async function converse({
  url: { path, query } = {},
}: WebActionParams) {
  if (path === '/web-action/converse' && query) {
    const { path: pathFromQuery } = qs.parse(query) as { path: string }

    const { title, description } = await fetchApi(pathFromQuery)

    if (title && description) {
      window.history.pushState(null, '', `#${HASH_CONVERSE_MODAL}`)

      const container = document.createElement('div')
      const root = createRoot(container)

      const closeModal = () => {
        window.history.back()
      }

      const handlePopstate = () => {
        root.unmount()
        container.remove()

        window.removeEventListener('popstate', handlePopstate)
      }

      window.addEventListener('popstate', handlePopstate)

      root.render(
        OpenModal({
          title,
          description,
          onClose: closeModal,
        }),
      )

      return true
    }

    return false
  }

  return false
}

export function OpenModal({
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
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Description>{description}</Modal.Description>
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="blue" onClick={onClose}>
          확인
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

async function fetchApi(
  url: string,
): Promise<{ title: string; description: string }> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return {
      title: '안내',
      description:
        '서비스 이용이 원활하지 않습니다.\n잠시후 다시 이용해주세요.',
    }
  } else {
    const { title, description } = (await response.json()) as {
      title: string
      description: string
    }

    return { title, description }
  }
}
