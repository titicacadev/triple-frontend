import { getApp } from 'firebase/app'
import { getAnalytics, initializeAnalytics } from 'firebase/analytics'

export function getFirebaseAnalytics() {
  try {
    const app = getApp()
    const analytics =
      getAnalytics(app) ??
      initializeAnalytics(app, {
        config: { send_page_view: false },
      })

    return analytics
  } catch (error) {}
}
