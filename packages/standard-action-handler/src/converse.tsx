import qs from 'qs'
import { createRoot } from 'react-dom/client'
import { Modal } from '@titicaca/modals'

import { WebActionParams } from './types'

const HASH_CONVERSE_MODAL = 'hash.converse-modal'

const NEED_LOGIN_CONTENT = {
  title: '로그인이 필요합니다.',
  description: '로그인하고 트리플을\n더 편하게 이용하세요🙂',
}

export default async function converse({
  url: { path, query } = {},
  options: { navigate } = {},
}: WebActionParams) {
  if (path === '/web-action/converse' && query) {
    const { path: pathFromQuery } = qs.parse(query) as { path: string }

    const { title, description } = await fetchApi(pathFromQuery)

    if (title && description) {
      const isLoginModal = title === NEED_LOGIN_CONTENT.title

      window.history.pushState(null, '', `#${HASH_CONVERSE_MODAL}`)

      const container = document.createElement('div')
      const root = createRoot(container)

      const closeModal = () => {
        window.history.back()
      }

      const onClickLogin = () => {
        const loginUrl = window.location.href.replace(
          `#${HASH_CONVERSE_MODAL}`,
          '',
        )
        closeModal()
        if (navigate) {
          navigate(`/login?returnUrl=${encodeURIComponent(loginUrl)}`)
        }
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
          onCancel: isLoginModal ? closeModal : undefined,
          onConfirm: isLoginModal ? onClickLogin : closeModal,
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
  onCancel,
  onConfirm,
}: {
  title: string
  description: string
  onCancel?: () => void
  onConfirm: () => void
}) {
  return (
    <Modal open onClose={onCancel}>
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Description>{description}</Modal.Description>
      </Modal.Body>
      <Modal.Actions>
        {onCancel && <Modal.Action onClick={onCancel}>취소</Modal.Action>}
        <Modal.Action color="blue" onClick={onConfirm}>
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
    if (response.status === 400 || response.status === 401) {
      return NEED_LOGIN_CONTENT
    }
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
