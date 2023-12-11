import { MutableRefObject } from 'react'

import { EventTrackingValue } from './event-tracking'

export interface LoginCtaModalRef {
  returnUrl?: string
  triggeredEventAction?: string
}

export interface TransitionModalRef {
  deepLink?: string
  onActionClick?: () => void
}

export interface ModalValue {
  loginCtaModalRef: MutableRefObject<LoginCtaModalRef>
  transitionModalRef: MutableRefObject<TransitionModalRef>
  eventTrackingContextForkRef: MutableRefObject<EventTrackingValue | undefined>
}
