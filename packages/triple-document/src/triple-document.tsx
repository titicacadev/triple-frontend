import React, { useMemo, useCallback } from 'react'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'
import { get } from '@titicaca/fetcher'

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
import { TNAProductClickHandlerProvider } from './prop-context/tna-product-click-handler'
import { TNAProductsFetcherProvider } from './prop-context/tna-products-fetcher'
import { ImageSourceProvider } from './prop-context/image-source'
import { DeepLinkProvider } from './prop-context/deep-link'
import { MediaConfigProvider } from './prop-context/media-config'
import ELEMENTS from './elements'
import { TNAProductsResponse } from './elements/tna/types'

export function TripleDocument({
  children,
  customElements = {},
  onResourceClick,
  onImageClick,
  onLinkClick,
  onTNAProductClick,
  onTNAProductsFetch,
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

  const handleTNAProductsFetch = useCallback((slotId) => {
    return get<TNAProductsResponse>(`/api/tna-v2/slots/${slotId}`)
  }, [])

  const resourceClickHandler = onResourceClick || defaultHandleResourceClick
  const linkClickHandler = onLinkClick || defaultHandleLinkClick

  return (
    <ResourceClickHandlerProvider value={resourceClickHandler}>
      <ImageClickHandlerProvider value={onImageClick}>
        <LinkClickHandlerProvider value={linkClickHandler}>
          <TNAProductClickHandlerProvider value={onTNAProductClick}>
            <TNAProductsFetcherProvider
              value={onTNAProductsFetch || handleTNAProductsFetch}
            >
              <ImageSourceProvider value={imageSourceComponent}>
                <DeepLinkProvider value={deepLink}>
                  <MediaConfigProvider
                    videoAutoPlay={videoAutoPlay}
                    hideVideoControls={hideVideoControls}
                    optimized={optimized}
                  >
                    {children.map(({ type, value }, i) => {
                      const Element = { ...ELEMENTS, ...customElements }[type]

                      return (
                        Element && (
                          <Element
                            key={i}
                            value={value}
                            {...(customElements
                              ? {
                                  onResourceClick: resourceClickHandler,
                                  onImageClick,
                                  onLinkClick: linkClickHandler,
                                  onTNAProductClick,
                                  onTNAProductsFetch,
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
            </TNAProductsFetcherProvider>
          </TNAProductClickHandlerProvider>
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
