import { PropsWithChildren } from 'react'
import { getTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  PoiListElement,
  PoiCarouselElement,
  PoiListElementProps,
  PoiListElementType,
} from '@titicaca/kint5-poi-list-elements'
import { List, Text } from '@titicaca/kint5-core-elements'

import { useResourceClickHandler } from '../prop-context/resource-click-handler'

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
  const onResourceClick = useResourceClickHandler()

  const Element =
    display === 'list'
      ? function WrappedPoiListElement(
          props: Omit<PoiListElementProps<T>, 'compact'>,
        ) {
          return <PoiListElement compact {...props} />
        }
      : PoiCarouselElement

  return (
    <PoisContainer
      display={display}
      css={{
        margin: `20px ${display === 'list' ? 16 : 0}px 0 0`,
        paddingLeft: 16,
      }}
    >
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
        />
      ))}
    </PoisContainer>
  )
}

function PoisContainer({
  display,
  children,
  ...props
}: PropsWithChildren<{ display: string }>) {
  if (display === 'list') {
    return <List {...props}>{children}</List>
  }

  return <DocumentCarousel {...props}>{children}</DocumentCarousel>
}

function renderPoiListActionButton({
  display,
  poi,
}: {
  display: PoisDisplay
  poi: ExtendedPoiListElementData
}) {
  const t = getTranslation('common-web')
  const {
    source: { pricing },
  } = poi

  if (display === 'list' && pricing) {
    const { nightlyPrice } = pricing

    return (
      <PoiPrice>
        <Text bold size="mini">
          {nightlyPrice
            ? `₩${nightlyPrice.toLocaleString()}`
            : t(['bogi', '보기'])}
        </Text>
      </PoiPrice>
    )
  }

  return null
}
