import { styled } from 'styled-components'
import { Text } from '@titicaca/tds-ui'
import {
  PoiListElement,
  PoiCarouselElement,
  type PoiListElementProps,
  type PoiListElementType,
} from '@titicaca/tds-widget'
import { useTranslation } from '@titicaca/triple-web'

import { useResourceClickHandler } from '../prop-context/resource-click-handler'
import { useGuestMode } from '../prop-context/guest-mode'

import ResourceList from './shared/resource-list'
import DocumentCarousel from './shared/document-carousel'

const PoiPrice = styled.div`
  position: absolute;
  top: 3px;
  right: 0;
  width: 80px;
  padding-top: 8px;
  padding-bottom: 7px;
  text-align: center;
  border-radius: 17px;
  background-color: #fafafa;
`

type ExtendedPoiListElementData = PoiListElementType & {
  source: PoiListElementType['source'] & {
    pricing?: {
      nightlyPrice?: number | null
    } | null
  }
}

type PoisDisplay = 'list' | string

export default function Pois<T extends ExtendedPoiListElementData>({
  value: { display, pois },
}: {
  value: {
    display: PoisDisplay
    pois: T[]
  }
}) {
  const guestMode = useGuestMode()
  const t = useTranslation()
  const onResourceClick = useResourceClickHandler()

  const Container = display === 'list' ? ResourceList : DocumentCarousel
  const margin =
    display === 'list' ? { top: 20, left: 30, right: 30 } : { top: 20 }
  const Element =
    display === 'list'
      ? function WrappedPoiListElement(
          props: Omit<PoiListElementProps<T>, 'compact'>,
        ) {
          return <PoiListElement compact {...props} />
        }
      : PoiCarouselElement

  function renderPoiListActionButton({
    display,
    poi,
  }: {
    display: PoisDisplay
    poi: ExtendedPoiListElementData
  }) {
    const {
      source: { pricing },
    } = poi

    if (display === 'list' && pricing) {
      const { nightlyPrice } = pricing

      return (
        <PoiPrice>
          <Text bold size="mini">
            {nightlyPrice ? `₩${nightlyPrice.toLocaleString()}` : t('보기')}
          </Text>
        </PoiPrice>
      )
    }

    return null
  }

  return (
    <Container margin={margin}>
      {pois.map((poi) => (
        <Element
          key={poi.id}
          poi={poi}
          onClick={(e) => {
            if (!onResourceClick) {
              // TODO: triple-document 에러 처리 방법 설계
              return null
            }
            onResourceClick(e, poi)
          }}
          actionButtonElement={renderPoiListActionButton({
            display,
            poi,
          })}
          guestMode={guestMode}
        />
      ))}
    </Container>
  )
}
