import { useMemo, useCallback } from 'react'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'
import { useNavigate, useExternalRouter } from '@titicaca/router'
import { ContextOptions } from '@titicaca/standard-action-handler/src/types'
import { useRouter } from 'next/router'

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
}: {
  customElements?: ElementSet
  children: TripleElementData[]
  cta?: string
} & TripleDocumentContext) {
  const { query } = useRouter()
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

      const linkParams = Object.keys(query || {})
        .filter((key) => key.match(/^triple_link_param_/i))
        .reduce(
          (params, key) => ({
            ...params,
            [key.replace(/^triple_link_param_/i, '')]: query[key],
          }),
          {},
        )

      trackEventWithMetadata({
        fa: {
          action: '링크선택',
          url: href,
        },
        ga: ['링크선택', href],
        additionalMetadata: linkParams,
      })
      handleAction(href, { target })
    },
    [handleAction, trackEventWithMetadata, query],
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
                              // eslint-disable-next-line @typescript-eslint/naming-convention
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
