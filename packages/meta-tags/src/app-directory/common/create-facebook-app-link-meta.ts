import { Metadata } from 'next'

/**
 * FacebookAppLinkMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function createFacebookAppLinkMeta({
  appName: appNameFromProps,
  iosAppStoreId = '1225499481',
  appPath = '/',
  appPackageName = 'com.titicacacorp.triple',
}: {
  appName?: string
  iosAppStoreId?: string
  appPath?: string
  appPackageName?: string
} = {}): Metadata {
  /* TODO next13 app-directory ver 국제화 적용 */
  const appName = appNameFromProps ?? '트리플'
  const appUrlScheme = process.env.NEXT_PUBLIC_APP_URL_SCHEME || ''
  const url = `${appUrlScheme}://${appPath}`

  return {
    appLinks: {
      ios: {
        app_name: appName,
        url,
        app_store_id: iosAppStoreId,
      },
      android: {
        app_name: appName,
        url,
        package: appPackageName,
      },
    },
  }
}
