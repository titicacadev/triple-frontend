import { useEffect } from 'react'
import { captureException } from '@sentry/nextjs'
import { Navbar, Text, FlexBox } from '@titicaca/kint5-core-elements'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { useRouter } from 'next/router'
import { useTranslation } from '@titicaca/next-i18next'

export function Page404() {
  const { t } = useTranslation('common-web')

  const { back } = useRouter()
  const { closeWindow } = useTripleClientActions()

  const handleButtonClick = closeWindow ?? back

  useEffect(() => {
    captureException(new Error(`404 - ${window.location.href}`))
  }, [])

  return (
    <>
      {closeWindow ? <Navbar onLeftButtonClick={closeWindow} /> : null}
      <FlexBox
        flex
        css={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          width: '100%',
          height: closeWindow ? 'calc(100dvh - 44px)' : '100dvh',
        }}
      >
        <FlexBox flex css={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text css={{ fontSize: 20, fontWeight: 700, textAlign: 'center' }}>
            {t('페이지를 찾을 수 없습니다')}
          </Text>
          <button
            onClick={handleButtonClick}
            css={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-kint5-brand1)',
              color: 'var(--color-kint5-gray0)',
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 40,
              marginTop: 32,
            }}
          >
            {t('돌아가기')}
          </button>
        </FlexBox>
      </FlexBox>
    </>
  )
}
