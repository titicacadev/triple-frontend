import { useCallback } from 'react'
import { useTrackEventWithMetadata } from '@titicaca/triple-web'
import { useStandardActionHandler } from '@titicaca/standard-action-handler'

import {
  TripleElementData,
  ElementSet,
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
import ELEMENTS from './elements'
import useEventResourceTracker from './use-resource-event-tracker'
import { GuestModeProvider } from './prop-context/guest-mode'

export function TripleDocument({
  children,
  customElements = {},
  onResourceClick,
  onImageClick,
  onLinkClick,
  imageSourceComponent,
  deepLink,
  cta,
  videoAutoPlay,
  hideVideoControls,
  optimized = false,
  guestMode,
}: {
  customElements?: ElementSet
  children: TripleElementData[]
  cta?: string
} & TripleDocumentContext) {
  const trackEventWithMetadata = useTrackEventWithMetadata()
  const trackResourceEvent = useEventResourceTracker()

  const handleAction = useStandardActionHandler({ cta })

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

  return (
    <ResourceClickHandlerProvider value={resourceClickHandler}>
      <ImageClickHandlerProvider value={onImageClick}>
        <LinkClickHandlerProvider value={linkClickHandler}>
          <ImageSourceProvider value={imageSourceComponent}>
            <DeepLinkProvider value={deepLink}>
              <MediaConfigProvider
                videoAutoPlay={videoAutoPlay}
                hideVideoControls={hideVideoControls}
                optimized={optimized}
              >
                <GuestModeProvider value={guestMode}>
                  {children.map(({ type, value }, i) => {
                    const RegularElement = ELEMENTS[type]
                    const CustomElement = customElements[type]

                    const Element = CustomElement || RegularElement

                    return (
                      Element && (
                        <Element
                          key={i}
                          value={value}
                          {...(CustomElement
                            ? {
                                onResourceClick: resourceClickHandler,
                                onImageClick,
                                onLinkClick: linkClickHandler,
                                ImageSource: imageSourceComponent,
                                deepLink,
                                videoAutoPlay,
                                hideVideoControls,
                                optimized,
                                guestMode,
                              }
                            : {})}
                        />
                      )
                    )
                  })}
                </GuestModeProvider>
              </MediaConfigProvider>
            </DeepLinkProvider>
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
