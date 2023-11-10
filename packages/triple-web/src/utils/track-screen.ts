import { trackScreen as nativeTrackScreen } from '@titicaca/triple-web-to-native-interfaces'
import { logEvent as firebaseLogEvent } from 'firebase/analytics'

import { firebaseAnalytics } from '../libs'
import { EventTracking } from '../contexts'

export function trackScreen(
  path: string,
  label: string | undefined,
  additionalMetadata: { [key: string]: string } | undefined,
  context: EventTracking | undefined,
) {
  try {
    if (window.ga) {
      window.ga('set', 'page', path)
      window.ga('send', 'pageview')
    }

    if (window.fbq && label) {
      window.fbq('trackCustom', `PageView_${label}`, { path })
    }

    if (firebaseAnalytics) {
      firebaseLogEvent(firebaseAnalytics, 'page_view', {
        page_path: path,
        category: label,
      })
    }

    nativeTrackScreen(path, label, additionalMetadata)
  } catch (error) {
    if (error instanceof Error) {
      context?.onError?.(error)
    }
  }
}
