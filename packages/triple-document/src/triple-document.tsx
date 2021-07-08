import React, { useMemo, useCallback } from 'react'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'

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
import { EventTypeEnum, EventLog } from './use-event-tracker'

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
  type: eventType,
  event,
}: {
  customElements?: ElementSet
  children: TripleElementData[]
  cta?: string
  type?: EventTypeEnum
  event?: EventLog
} & TripleDocumentContext) {
  const { navigate } = useHistoryFunctions()
  const handleAction = useMemo(() => initialize({ cta, navigate }), [
    cta,
    navigate,
  ])

  const defaultHandleLinkClick: LinkEventHandler = useCallback(
    (e, { href, target }) => {
      if (!href) {
        // TODO: triple-document 에러 처리 방법 설계
        return
      }
      handleAction(href, { target })
    },
    [handleAction],
  )

  const defaultHandleResourceClick: ResourceClickHandler = useCallback(
    (e, resource) => {
      const url = composeResourceUrl(resource)

      url && handleAction(url)
    },
    [handleAction],
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
                {children.map(({ type, value }, i) => {
                  const RegularElement = ELEMENTS[type]
                  const CustomElement = customElements[type]

                  const Element = CustomElement || RegularElement

                  return (
                    Element && (
                      <Element
                        key={i}
                        type={eventType}
                        event={event}
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
                            }
                          : {})}
                      />
                    )
                  )
                })}
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
