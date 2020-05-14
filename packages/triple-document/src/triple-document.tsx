import * as React from 'react'
import styled from 'styled-components'
import * as CSS from 'csstype'
import {
  ImageCarouselElementContainer,
  ImageBlockElementContainer,
  ImageCaption,
  HR1,
  HR2,
  HR3,
  HR4,
  HR5,
  HR6,
  Segment,
  Text,
  Table,
  Container,
  ContainerProps,
  TableProps,
  ImageSourceType,
} from '@titicaca/core-elements'
import {
  PoiListElement,
  PoiCarouselElement,
  PoiListElementProps,
} from '@titicaca/poi-list-elements'
import TripleMedia, { MediaMeta } from '@titicaca/triple-media'
import { ListingPOI } from '@titicaca/type-definitions'

import { RegionListElement } from './region'
import { TnaProductsList } from './tna'
import Coupon from './coupon'
import {
  RegionData,
  TripleElementData,
  Link,
  ImageEventHandler,
  LinkEventHandler,
  ElementSet,
} from './types'
import DocumentCarousel from './document-carousel'
import Heading from './heading-hoc'
import generateClickHandler from './generate-click-handler'
import TextElement from './text-element'
import ResourceList from './resource-list'
import Links from './links'
import { MH1, MH2, MH3, MH4 } from './margin-headings'
import Embedded from './embedded'

type ExtendedPOIListElementData = ListingPOI & {
  source: ListingPOI['source'] & {
    pricing?: {
      nightlyPrice?: number | null
    } | null
  }
}

type TextElementData = TripleElementData<'text', string>
type LinksElementData = TripleElementData<'links', { links: Link[] }>

type Display = 'list' | string
type MediaDisplayProperty = CSS.DisplayProperty | 'gapless-block'

interface TripleDocumentProps {
  customElements?: ElementSet
  children: TripleElementData[]

  // merged...
  onResourceClick?: (e: React.SyntheticEvent, resource: unknown) => void
  onResourceScrapedChange?: unknown
  onImageClick?: ImageEventHandler
  onLinkClick?: LinkEventHandler
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: unknown,
    slotId?: number,
    index?: number,
  ) => void
  onTNAProductsFetch?: (slotId: number) => Promise<unknown>
  imageSourceComponent?: ImageSourceType
  resourceScraps?: { [resourceId: string]: boolean }
  webUrlBase?: string
  deepLink?: string
  videoAutoPlay?: boolean
}

export const ELEMENTS: ElementSet = {
  heading1: Heading(MH1),
  heading2: Heading(MH2),
  heading3: Heading(MH3),
  heading4: Heading(MH4),
  text: TextElement,
  images: Images,
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  hr4: HR4,
  hr5: HR5,
  hr6: HR6,
  pois: Pois,
  links: Links,
  embedded: Embedded,
  note: Note,
  list: ListElement,
  regions: Regions,
  video: ExternalVideo,
  tnaProducts: TnaProductsList,
  table: TableElement,
  coupon: Coupon,
}

export function TripleDocument({
  children,
  customElements,
  onResourceClick,
  onResourceScrapedChange,
  onImageClick,
  onLinkClick,
  onTNAProductClick,
  onTNAProductsFetch,
  imageSourceComponent,
  resourceScraps,
  webUrlBase,
  deepLink,
  videoAutoPlay,
}: TripleDocumentProps) {
  return (
    <>
      {children.map(({ type, value }, i) => {
        const Element = (customElements || {})[type] || ELEMENTS[type]

        return (
          Element && (
            <Element
              key={i}
              value={value}
              onResourceClick={onResourceClick}
              onImageClick={onImageClick}
              onLinkClick={onLinkClick}
              onResourceScrapedChange={onResourceScrapedChange}
              onTNAProductClick={onTNAProductClick}
              onTNAProductsFetch={onTNAProductsFetch}
              ImageSource={imageSourceComponent}
              resourceScraps={resourceScraps || {}}
              deepLink={deepLink}
              webUrlBase={webUrlBase}
              videoAutoPlay={videoAutoPlay}
            />
          )
        )
      })}
    </>
  )
}

function Images({
  value: { images, display },
  onImageClick,
  onLinkClick,
  ImageSource,
  videoAutoPlay,
}: {
  value: {
    images: MediaMeta[]
    display: MediaDisplayProperty
  }
  onImageClick: ImageEventHandler
  onLinkClick: LinkEventHandler
  ImageSource: ImageSourceType
  videoAutoPlay?: boolean
}) {
  const ImagesContainer = ['block', 'gapless-block'].includes(display)
    ? Container
    : DocumentCarousel
  const ElementContainer =
    display === 'gapless-block'
      ? Container
      : display === 'block'
      ? ImageBlockElementContainer
      : ImageCarouselElementContainer

  const handleClick = generateClickHandler(onLinkClick, onImageClick)

  return (
    <ImagesContainer
      margin={{ top: 40, bottom: images.some(({ title }) => title) ? 10 : 30 }}
    >
      {images.map((image, i) => {
        return (
          <ElementContainer key={i}>
            {display === 'gapless-block' ? (
              <TripleMedia
                borderRadius={0}
                autoPlay={videoAutoPlay}
                media={image}
                onClick={handleClick}
                ImageSource={ImageSource}
              />
            ) : (
              <>
                <TripleMedia
                  autoPlay={videoAutoPlay}
                  media={image}
                  onClick={handleClick}
                  ImageSource={ImageSource}
                />
                {image.title ? (
                  <ImageCaption>{image.title}</ImageCaption>
                ) : null}
              </>
            )}
          </ElementContainer>
        )
      })}
    </ImagesContainer>
  )
}

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

function renderPoiListActionButton({
  actionButtonElement,
  display,
  poi,
}: {
  actionButtonElement: JSX.Element | null
  display: Display
  poi: ExtendedPOIListElementData
}) {
  if (actionButtonElement === null) {
    return <span />
  } else if (actionButtonElement) {
    return actionButtonElement
  }

  const {
    source: { pricing },
  } = poi

  if (display === 'list' && pricing) {
    const { nightlyPrice } = pricing

    return (
      <PoiPrice>
        <Text bold size="mini">
          {nightlyPrice ? `₩${nightlyPrice.toLocaleString()}` : '보기'}
        </Text>
      </PoiPrice>
    )
  }

  return null
}

export function Pois<T extends ExtendedPOIListElementData>({
  value: { display, pois },
  actionButtonElement,
  onResourceClick,
  onResourceScrapedChange,
  resourceScraps,
}: {
  value: {
    display: Display
    pois: T[]
  }
  actionButtonElement: JSX.Element | null
  onResourceClick?: (e: React.SyntheticEvent, poi: T) => void
  onResourceScrapedChange: PoiListElementProps<T>['onScrapedChange']
  resourceScraps: PoiListElementProps<T>['resourceScraps']
}) {
  const Container = display === 'list' ? ResourceList : DocumentCarousel
  const margin =
    display === 'list' ? { top: 20, left: 30, right: 30 } : { top: 20 }
  const Element =
    display === 'list'
      ? function WrappedPoiListElment(
          props: Omit<PoiListElementProps<T>, 'compact'>,
        ) {
          return <PoiListElement compact {...props} />
        }
      : PoiCarouselElement

  return (
    <Container margin={margin}>
      {pois.map((poi) => (
        <Element
          key={poi.id}
          poi={poi}
          resourceScraps={resourceScraps}
          onClick={
            onResourceClick &&
            ((e: React.SyntheticEvent) => onResourceClick(e, poi))
          }
          onScrapedChange={onResourceScrapedChange}
          actionButtonElement={renderPoiListActionButton({
            actionButtonElement,
            display,
            poi,
          })}
        />
      ))}
    </Container>
  )
}

function Note({
  value: { title, body },
}: {
  value: { title: string; body: string }
}) {
  return (
    <Segment margin={{ top: 30, bottom: 30, left: 30, right: 30 }}>
      <Text bold size="small" color="gray" lineHeight={1.57}>
        {title}
      </Text>
      <Text size="small" color="gray" alpha={0.8} lineHeight={1.57}>
        {body}
      </Text>
    </Segment>
  )
}

function Regions({
  value: { regions },
  onResourceClick,
}: {
  value: { regions: RegionData[] }
  onResourceClick?: (e: React.SyntheticEvent, region: RegionData) => void
}) {
  return (
    <ResourceList>
      {regions.map((region, index) => (
        <RegionListElement
          key={index}
          value={region}
          onClick={onResourceClick && ((e) => onResourceClick(e, region))}
        />
      ))}
    </ResourceList>
  )
}

const VideoContainer = styled.div`
  position: relative;
  margin: 30px 30px 0 30px;
  height: 0;
  padding-bottom: 56.25%;
  border-radius: 6px;
  overflow: hidden;
  mask-image: radial-gradient(white, black);
`

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

function ExternalVideo({
  value: { provider, identifier },
}: {
  value: { provider: string; identifier: string }
}) {
  return provider === 'youtube' ? (
    <VideoContainer>
      <VideoPlayer
        src={`https://www.youtube.com/embed/${identifier}?rel=0&amp;showinfo=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </VideoContainer>
  ) : null
}

const BULLET_ICON_URLS: { [key: string]: string } = {
  oval: 'https://assets.triple.guide/images/img-bullet-oval@3x.png',
  check: 'https://assets.triple.guide/images/img-bullet-check@3x.png',
}

const ListItemContainer = styled.li<{ bulletType?: string }>`
  padding-left: 18px;
  text-indent: -18px;
  &:before {
    display: inline-block;
    width: 10px;
    height: 10px;
    ${({ bulletType: name }) =>
      `background-image: url(${BULLET_ICON_URLS[name || 'oval']});`}
    background-size: 10px 10px;
    background-position: center center;
    background-repeat: no-repeat;
    content: '';
  }
`

const ListTextElement = styled(TextElement)`
  font-size: 16px;
  margin-left: 8px;
  display: inline;
  div,
  p,
  pre {
    display: inline;
  }
`

function ListElement({
  value: { bulletType, items },
  onLinkClick,
  ...props
}: {
  value: {
    bulletType?: string
    items: (TextElementData | LinksElementData)[]
  }
  onLinkClick: LinkEventHandler
}) {
  return (
    <Container margin={{ top: 10, left: 30, right: 30 }} {...props}>
      <ul>
        {items.map((item, index) => (
          <ListItemContainer bulletType={bulletType} key={index}>
            {item.type === 'text' ? (
              <ListTextElement value={item.value} compact={true} />
            ) : null}
            {item.type === 'links' ? (
              <Links
                value={{ display: 'list', links: item.value.links }}
                onLinkClick={onLinkClick}
              />
            ) : null}
          </ListItemContainer>
        ))}
      </ul>
    </Container>
  )
}

function TableElement({
  value,
  ...props
}: {
  value: TableProps
} & ContainerProps) {
  return (
    <Container margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
      <Table {...value} />
    </Container>
  )
}
