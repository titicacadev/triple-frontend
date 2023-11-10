import { Confirm } from '@titicaca/tds-ui'

import { useModal } from '../hooks/modal/use-modal'

// TODO: i18n 연결
function t(keys: string[]) {
  return keys[keys.length - 1]
}

// TODO: hash-router-context 사용
function removeUriHash() {}

export const LOGIN_CTA_MODAL_HASH = 'login-cta-modal'

export function LoginCtaModal() {
  const { loginCtaModalRef } = useModal()

  // TODO: hash-router-context와 연결
  const uriHash: string = ''
  const open = uriHash === LOGIN_CTA_MODAL_HASH

  return (
    <Confirm
      open={open}
      title={t(['rogeuini-pilyohabnida.', '로그인이 필요합니다.'])}
      onClose={removeUriHash}
      onCancel={removeUriHash}
      onConfirm={() => {
        // TODO: event-tracking context와 연결
        // trackEvent({
        //   ga: ['로그인유도팝업_로그인선택'],
        //   fa: {
        //     action: '로그인유도팝업_로그인선택',
        //   },
        // })

        // TODO: router와 연결
        // navigate(
        //   `/login?returnUrl=${encodeURIComponent(
        //     loginCtaModalRef.current.returnUrl || document.location.href,
        //   )}`,
        // )

        return true
      }}
    >
      {t([
        'rogeuinhago-teuripeuleul-deo-pyeonhage-iyonghaseyo',
        '로그인하고 트리플을\n더 편하게 이용하세요🙂',
      ])}
    </Confirm>
  )
}
