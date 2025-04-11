import qs from 'qs'
import { createRoot } from 'react-dom/client'
import { Modal } from '@titicaca/tds-ui'
import { authGuardedFetchers, NEED_LOGIN_IDENTIFIER } from '@titicaca/fetcher'

import { ContextOptions, WebActionParams } from './types'

const HASH_CONVERSE_MODAL = 'hash.converse-modal'

type ModalType = 'login' | 'error' | 'normal'

const NEED_LOGIN_CONTENT: {
  type: ModalType
  title: string
  description: string
} = {
  type: 'login',
  title: '로그인이 필요합니다.',
  description: '로그인하고 트리플을\n더 편하게 이용하세요🙂',
}

export default async function converse({
  url: { path, query } = {},
  options: { navigate } = {},
}: WebActionParams) {
  if (path === '/web-action/converse' && query && navigate) {
    const { path: pathFromQuery } = qs.parse(query) as { path: string }

    const { type, title, description } = await fetchApi(pathFromQuery)

    if (type && title && description) {
      window.history.pushState(null, '', `#${HASH_CONVERSE_MODAL}`)

      const container = document.createElement('div')
      const root = createRoot(container)

      const { onConfirm, onCancel } = getOnActions(type, navigate)

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
          onCancel,
          onConfirm,
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
): Promise<{ type: ModalType; title: string; description: string }> {
  const response = await authGuardedFetchers.post<
    { title: string; description: string },
    unknown
  >(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response === NEED_LOGIN_IDENTIFIER || !response.ok) {
    if (response === NEED_LOGIN_IDENTIFIER) {
      return NEED_LOGIN_CONTENT
    }
    return {
      type: 'error',
      title: '안내',
      description:
        '서비스 이용이 원활하지 않습니다.\n잠시 후 다시 이용해 주세요.',
    }
  } else {
    const { title, description } = response.parsedBody

    return { type: 'normal', title, description }
  }
}

function getOnActions(
  modalType: ModalType,
  navigate: NonNullable<ContextOptions['navigate']>,
) {
  const closeModal = () => window.history.back()
  if (modalType === 'login') {
    return {
      onConfirm: () => {
        const loginUrl = window.location.href.replace(
          `#${HASH_CONVERSE_MODAL}`,
          '',
        )
        window.history.back()
        navigate(`/login?returnUrl=${encodeURIComponent(loginUrl)}`)
      },
      onCancel: closeModal,
    }
  }

  return {
    onConfirm: closeModal,
  }
}
