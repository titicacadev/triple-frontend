import { getApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

export function getFirebaseAnalytics() {
  try {
    const app = getApp()
    const analytics = getAnalytics(app)

    return analytics
  } catch (error) {}
}
