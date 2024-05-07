import { useMemo, useCallback, ElementType } from 'react'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'
import { useNavigate, useExternalRouter } from '@titicaca/kint5-router'
import { ContextOptions } from '@titicaca/standard-action-handler/src/types'

import {
  TripleElementData,
  TripleDocumentContext,
  LinkEventHandler,
} from './types'
import {
  ResourceClickHandler,
  ResourceClickHandlerProvider,
} from './prop-context/resource-click-handler'
import { ImageClickHandlerProvider } from './prop-context/image-click-handler'
import { LinkClickHandlerProvider } from './prop-context/link-click-handler'
import { ImageSourceProvider } from './prop-context/image-source'
import { DeepLinkProvider } from './prop-context/deep-link'
import { MediaConfigProvider } from './prop-context/media-config'
import ELEMENTS, { ElementSet } from './elements'
import useEventResourceTracker from './use-resource-event-tracker'
import { AddItinerariesToTripHandlerProvider } from './prop-context/add-itineraries-to-trip-handler'

export function TripleDocument({
  children,
  customElements,
  onResourceClick,
  onImageClick,
  onLinkClick,
  imageSourceComponent,
  onAddItinerariesToTrip,
  deepLink,
  cta,
  videoAutoPlay,
  hideVideoControls,
  showNativeControls,
  optimized = false,
  articleId,
}: {
  articleId?: string
  customElements?: ElementSet
  children: TripleElementData[]
  cta?: string
} & TripleDocumentContext) {
  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const trackResourceEvent = useEventResourceTracker()
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()

  const handleAction = useMemo(
    () =>
      initialize({
        cta,
        navigate: navigate as ContextOptions['navigate'],
        routeExternally,
      }),
    [cta, navigate, routeExternally],
  )

  const defaultHandleLinkClick: LinkEventHandler = useCallback(
    (e, { href, target }) => {
      if (!href) {
        // TODO: triple-document 에러 처리 방법 설계
        return
      }
      trackEventWithMetadata({
        fa: {
          action: '링크선택',
          url: href,
        },
        ga: ['링크선택', href],
      })
      handleAction(href, { target })
    },
    [handleAction, trackEventWithMetadata],
  )

  const defaultHandleResourceClick: ResourceClickHandler = useCallback(
    (e, { id, type, source }) => {
      const url = composeResourceUrl({ id, type, source })

      trackResourceEvent({ id, type, source })

      url && handleAction(url)
    },
    [handleAction, trackResourceEvent],
  )

  const resourceClickHandler = onResourceClick || defaultHandleResourceClick
  const linkClickHandler = onLinkClick || defaultHandleLinkClick

  const itineraryDays = children.reduce<{
    [itineraryElementIndex: string]: number
  }>((acc, { type }, index) => {
    if (type !== 'itinerary') {
      return acc
    }

    acc[index] = Object.keys(acc).length + 1
    return acc
  }, {})

  return (
    <ResourceClickHandlerProvider value={resourceClickHandler}>
      <ImageClickHandlerProvider value={onImageClick}>
        <LinkClickHandlerProvider value={linkClickHandler}>
          <ImageSourceProvider value={imageSourceComponent}>
            <AddItinerariesToTripHandlerProvider value={onAddItinerariesToTrip}>
              <DeepLinkProvider value={deepLink}>
                <MediaConfigProvider
                  videoAutoPlay={videoAutoPlay}
                  hideVideoControls={hideVideoControls}
                  showNativeControls={showNativeControls}
                  optimized={optimized}
                >
                  {children.map(({ type, value }, i) => {
                    if (!isTripleGlobalDocumentType(type)) {
                      return null
                    }

                    const RegularElement = ELEMENTS[type]
                    const CustomElement = customElements?.[type] ?? null

                    const Element = (CustomElement ||
                      RegularElement) as ElementType

                    const itineraryDay =
                      type === 'itinerary' ? itineraryDays[i] : undefined

                    return (
                      Element && (
                        <Element
                          key={i}
                          value={value}
                          articleId={articleId}
                          itineraryDay={itineraryDay}
                          {...(CustomElement
                            ? {
                                onResourceClick: resourceClickHandler,
                                onImageClick,
                                onLinkClick: linkClickHandler,
                                ImageSource: imageSourceComponent,
                                onAddItinerariesToTrip,
                                deepLink,
                                videoAutoPlay,
                                hideVideoControls,
                                optimized,
                              }
                            : {})}
                        />
                      )
                    )
                  })}
                </MediaConfigProvider>
              </DeepLinkProvider>
            </AddItinerariesToTripHandlerProvider>
          </ImageSourceProvider>
        </LinkClickHandlerProvider>
      </ImageClickHandlerProvider>
    </ResourceClickHandlerProvider>
  )
}

function composeResourceUrl(resource: Parameters<ResourceClickHandler>[1]) {
  switch (resource.type) {
    case 'attraction':
      return `/inlink?path=${encodeURIComponent(
        `/attractions/${resource.id}?_triple_no_navbar`,
      )}`
    case 'restaurant':
      return `/inlink?path=${encodeURIComponent(
        `/restaurants/${resource.id}?_triple_no_navbar`,
      )}`
    case 'hotel':
      return `/inlink?path=${encodeURIComponent(
        `/hotels/${resource.id}?_triple_no_navbar`,
      )}`
    case 'article':
      return `/inlink?path=${encodeURIComponent(
        `/articles/${resource.id}?_triple_no_navbar`,
      )}`
    case 'region':
      return `/regions/${resource.id}`
    default:
      return null
  }
}

function isTripleGlobalDocumentType(type: string): type is keyof ElementSet {
  return type in ELEMENTS
}
