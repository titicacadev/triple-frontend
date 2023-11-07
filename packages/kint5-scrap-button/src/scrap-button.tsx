import {
  useEventTrackerWithMetadata,
  useScrapsContext,
} from '@titicaca/react-contexts'
import { Attributes, ComponentType, MouseEventHandler } from 'react'
import styled from 'styled-components'
import {
  EmptyHeartIcon,
  FilledHeartIcon,
  LineFillHeartIcon,
} from '@titicaca/kint5-core-elements'

import { withMask } from './scrap-button-mask'

interface ScrapableResource {
  id: string
  type: string
  scraped?: boolean
}

const ScrapingButton = styled.button<{ size: number }>`
  display: block;
  outline: none;

  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
`

interface ScrapIconProps {
  pressed: boolean
  size: number
}

function OutlineHeart({ pressed, size }: ScrapIconProps) {
  return (
    <>
      {pressed ? (
        <FilledHeartIcon width={size} height={size} color="#EB147B" />
      ) : (
        <EmptyHeartIcon width={size} height={size} />
      )}
    </>
  )
}

function OverlayHeart({ pressed, size }: ScrapIconProps) {
  return (
    <>
      {pressed ? (
        <FilledHeartIcon width={size} height={size} />
      ) : (
        <LineFillHeartIcon width={size} height={size} />
      )}
    </>
  )
}

function useScraped<R extends ScrapableResource>({ id, type, scraped }: R) {
  const { scrape, unscrape, deriveCurrentStateAndCount, enableTrackEvent } =
    useScrapsContext()
  const trackEventWithMetadata = useEventTrackerWithMetadata()

  const { scraped: actualScraped } = deriveCurrentStateAndCount({ id, scraped })

  const handleToggleScrape = () => {
    const toggleScrape = actualScraped ? unscrape : scrape
    toggleScrape({ id, type })

    if (enableTrackEvent) {
      const action = actualScraped ? 'POI저장취소' : 'POI저장'

      trackEventWithMetadata({
        ga: [action, `${id}`],
        fa: {
          action,
          item_id: id,
          content_type: type,
        },
      })
    }
  }

  return [actualScraped, handleToggleScrape] as const
}

/**
 * 주어진 핸들러에 propagation을 막는 로직을 추가한 핸들러를 반환합니다.
 * TODO: 비슷한 역할을 하는 함수들 통합
 * @param handler
 */
function createIsolatedClickHandler(
  handler: MouseEventHandler<HTMLButtonElement>,
): MouseEventHandler<HTMLButtonElement> {
  return (e) => {
    e.stopPropagation()
    e.preventDefault()

    handler(e)
  }
}

interface ScrapButtonProps<R extends ScrapableResource> {
  resource: R
  size?: number
}

function OutlineScrapButton<R extends ScrapableResource>({
  resource,
  size = 34,
}: ScrapButtonProps<R>) {
  const [actualScraped, setScraped] = useScraped(resource)

  return (
    <ScrapingButton
      size={size}
      onClick={createIsolatedClickHandler(setScraped)}
    >
      <OutlineHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function OverlayScrapButton<R extends ScrapableResource>({
  resource,
  size = 36,
}: ScrapButtonProps<R>) {
  const [actualScraped, setScraped] = useScraped(resource)

  return (
    <ScrapingButton
      size={size}
      onClick={createIsolatedClickHandler(setScraped)}
    >
      <OverlayHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function composedHocs<P>(Component: ComponentType<P & Attributes>) {
  return withMask(Component)
}

const ComposedOutlineScrapButton = composedHocs(OutlineScrapButton)
const ComposedOverlayScrapButton = composedHocs(OverlayScrapButton)

export {
  ComposedOutlineScrapButton as OutlineScrapButton,
  ComposedOverlayScrapButton as OverlayScrapButton,
}
