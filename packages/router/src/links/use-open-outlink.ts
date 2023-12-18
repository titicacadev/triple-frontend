import { useEnv } from '@titicaca/triple-web'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

function useOpenOutlink(url: string, params?: OutlinkOptions) {
  const { appUrlScheme } = useEnv()

  window.location.href = generateUrl({
    scheme: appUrlScheme,
    path: '/outlink',
    query: qs.stringify({
      url,
      ...params,
    }),
  })
}
