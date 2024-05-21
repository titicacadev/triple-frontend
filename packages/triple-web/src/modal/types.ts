import { MutableRefObject } from 'react'

import type { EventTrackingValue } from '../event-tracking/types'

export interface LoginCtaModalRef {
  returnUrl?: string
  triggeredEventAction?: string
}

export interface AppInstallCtaModalRef {
  deepLink?: string
  onActionClick?: () => void
  triggeredEventAction?: string
}

export interface ModalValue {
  loginCtaModalRef: MutableRefObject<LoginCtaModalRef>
  appInstallCtaModalRef: MutableRefObject<AppInstallCtaModalRef>
  eventTrackingContextForkRef: MutableRefObject<EventTrackingValue | undefined>
}
