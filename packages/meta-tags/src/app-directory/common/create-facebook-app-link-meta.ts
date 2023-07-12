import { Metadata } from 'next'
// import { getTranslation } from '@titicaca/i18n/lib/app-directory/server'
// import { Language } from '@titicaca/i18n/lib/app-directory/types'

/**
 * FacebookAppLinkMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function createFacebookAppLinkMeta({
  // lang = 'ko',
  appName: appNameFromProps,
  iosAppStoreId = '1225499481',
  appPath = '/',
  appPackageName = 'com.titicacacorp.triple',
}: {
  // lang?: Language
  appName?: string
  iosAppStoreId?: string
  appPath?: string
  appPackageName?: string
} = {}): Metadata {
  // const t = getTranslation({ lang, namespace: 'common-web' })
  // const appName = appNameFromProps ?? t(['teuripeul', '트리플']) ?? undefined
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
