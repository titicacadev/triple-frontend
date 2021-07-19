import React, { createContext, PropsWithChildren, useContext } from 'react'

import { useEventTrackingContext } from './event-tracking-context'
import { FAParams, GAParams, PixelParams } from './types'

interface EventMetaContext {
  [key: string]: string
}

const EventMetaContext = createContext<EventMetaContext | undefined>(undefined)

export function EventMetaProvider({
  children,
  eventMetaContext,
}: PropsWithChildren<{ eventMetaContext?: EventMetaContext }>) {
  const parentEventMetaContext = useContext(EventMetaContext)

  return (
    <EventMetaContext.Provider
      value={{ ...parentEventMetaContext, ...eventMetaContext }}
    >
      {children}
    </EventMetaContext.Provider>
  )
}

function useEventMetaContext() {
  return useContext(EventMetaContext)
}

export function useEventTrackerWithMetadata() {
  const { trackEvent } = useEventTrackingContext()
  const eventMetadata = useEventMetaContext()

  return (prams: {
    ga?: GAParams
    fa?: Partial<FAParams>
    pixel?: PixelParams
  }) => {
    trackEvent({
      ga: getGAWithMetadata(prams.ga, eventMetadata),
      fa: getFAWithMetadata(prams.fa, eventMetadata),
      pixel: prams.pixel,
    })
  }
}

function getFAWithMetadata(
  fa?: Partial<FAParams>,
  eventMetaContext?: EventMetaContext,
) {
  if (!fa) {
    return
  }

  return {
    ...eventMetaContext,
    ...fa,
  }
}

function getGAWithMetadata(ga?: GAParams, eventMetaContext?: EventMetaContext) {
  if (!ga) {
    return
  }

  if (eventMetaContext) {
    const arrayOfContext = Object.values(eventMetaContext)
    const [action, label] = ga

    if (label) {
      return [action, [...arrayOfContext, ...label.split('_')].join('_')]
    }
    return [action, [...arrayOfContext].join('_')]
  }

  return [...ga]
}
