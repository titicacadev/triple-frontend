import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import { showToast as nativeShowToast } from '@titicaca/triple-web-to-native-interfaces'

export default async function showToast({ path, query }: UrlElements) {
  if (path === '/web-action/show-toast' && query) {
    const { text } = qs.parse(query, { ignoreQueryPrefix: true })

    nativeShowToast(text as string)

    return true
  }

  return false
}
