import { Metadata } from 'next'

/**
 * AppleSmartBannerMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function generateAppleSmartBannerMeta({
  appId = '1225499481',
  appPath = '/',
}: {
  appId?: string
  appPath?: string
} = {}): Metadata {
  const appUrlScheme = process.env.NEXT_PUBLIC_APP_URL_SCHEME || ''

  return {
    itunes: {
      appId,
      appArgument: `${appUrlScheme}://${appPath}`,
    },
  }
}
