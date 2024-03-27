import { getApp } from 'firebase/app'
import { type Analytics, initializeAnalytics } from 'firebase/analytics'

export let firebaseAnalytics: Analytics

try {
  const app = getApp()
  const analytics = initializeAnalytics(app, {
    config: { send_page_view: false },
  })

  firebaseAnalytics = analytics
} catch (error) {}
