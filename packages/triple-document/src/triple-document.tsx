import * as React from 'react'
import styled from 'styled-components'
import * as CSS from 'csstype'
import {
  ImageCarouselElementContainer,
  ImageBlockElementContainer,
  ImageCaption,
  SimpleLink,
  HR1,
  HR2,
  HR3,
  HR4,
  HR5,
  HR6,
  Segment,
  Button,
  Text,
  Table,
  Carousel,
  Container,
  ResourceListItem,
  SquareImage,
  ContainerProps,
  TableProps,
  ButtonProps,
  ImageSourceType,
} from '@titicaca/core-elements'
import {
  PoiListElement,
  PoiCarouselElement,
  PoiListElementProps,
} from '@titicaca/poi-list-elements'
import TripleMedia, { MediaMeta } from '@titicaca/triple-media'
import { ListingPOI } from '@titicaca/type-definitions'
import { getColor } from '@titicaca/color-palette'

import { H1, H2, H3, H4, H2Props, H3Props, H4Props, H1Props } from './text'
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

const MH1 = ({ children, ...props }: H1Props) => (
  <H1 margin={{ top: 25, bottom: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H1>
)

const MH2 = ({ children, ...props }: H2Props) => (
  <H2 margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H2>
)

const MH3 = ({
  compact,
  children,
  ...props
}: H3Props & {
  compact: boolean
}) => (
  <H3
    margin={compact ? { top: 13 } : { top: 20, left: 30, right: 30 }}
    {...props}
  >
    {children}
  </H3>
)

const MH4 = ({ children, ...props }: H4Props) => (
  <H4 margin={{ top: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H4>
)

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

const EMBEDDED_ELEMENTS: ElementSet = {
  heading2: Compact(Heading(MH3)), // POI의 featuredContent에서 embedded entry의 제목이 heading2로 옵니다.
  heading3: Compact(Heading(MH3)),
  text: Compact(TextElement),
  links: Compact(Links),
  images: EmbeddedImage,
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

function Compact<P extends { compact?: boolean }>(
  Component: React.ComponentType<P>,
) {
  return function CompactedComponent(props: P) {
    return <Component compact {...props} />
  }
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

function EmbeddedImage({
  value: {
    images: [image],
  },
  onImageClick,
  onLinkClick,
  ImageSource,
  ...props
}: {
  value: {
    images: MediaMeta[]
  }
  onImageClick: ImageEventHandler
  onLinkClick: LinkEventHandler
  ImageSource: ImageSourceType
} & Parameters<typeof Container>[0]) {
  if (image) {
    const handleClick = generateClickHandler(onLinkClick, onImageClick)

    return (
      <Container margin={{ top: 10 }} {...props}>
        <TripleMedia
          media={image}
          ImageSource={ImageSource}
          onClick={handleClick}
        />
      </Container>
    )
  }

  return null
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

const LinksContainer = styled.div<{ compact?: boolean }>`
  margin: ${({ compact }) => (compact ? '0' : '0 30px')};
  margin-top: ${({ compact }) => (compact ? '10px' : '20px')};
  margin-bottom: ${({ compact }) => (compact ? '-10px' : '-20px')};

  a {
    display: inline-block;
    margin-bottom: ${({ compact }) => (compact ? '10px' : '20px')};
    margin-right: ${({ compact }) => (compact ? '10px' : '20px')};
  }
`

const ListLinkContainer = styled.div`
  display: inline;
  margin-left: 8px;
  line-height: 1.63;
`

const ListLink = styled.a`
  text-decoration: underline;
  color: rgba(${getColor('gray900')});
  font-weight: 500;
`

const ButtonContainer = styled.div<{ compact?: boolean }>`
  margin: ${({ compact }) => (compact ? '12px 0 4px 0' : '50px 30px 0 30px')};
  text-align: center;

  a {
    margin-top: 5px;
  }

  a:not(:first-child) {
    margin-left: 5px;
  }

  @media (max-width: 360px) {
    a:not(:first-child) {
      margin-left: 0;
    }
  }
`

const BlockContainer = styled.div<{ compact?: boolean }>`
  margin: ${({ compact }) => (compact ? '7px 0 4px 0' : '30px 30px 0 30px')};
  text-align: center;
`

const LINK_CONTAINERS = {
  button: ButtonContainer,
  block: BlockContainer,
  list: ListLinkContainer,
  default: LinksContainer,
  image: ResourceList,
}

function ButtonLink({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button bold color="blue" {...props}>
      {children}
    </Button>
  )
}

function BlockLink({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button basic fluid compact color="gray" {...props}>
      {children}
    </Button>
  )
}

const ImageLinkItem = styled.a`
  text-decoration: none;
`

const IMAGE_PLACEHOLDER =
  'https://assets.triple.guide/images/ico-blank-see@2x.png'

function ImageLink({
  href,
  label,
  description,
  image,
  onClick,
}: {
  href: string
  label?: string
  description?: string
  image?: MediaMeta
  onClick?: React.MouseEventHandler
}) {
  return (
    <ResourceListItem onClick={onClick}>
      <ImageLinkItem href={href}>
        <SquareImage
          floated="left"
          size="small"
          src={(image && image.sizes.small_square.url) || IMAGE_PLACEHOLDER}
          alt={label}
        />
        <Text bold ellipsis alpha={1} margin={{ left: 50 }}>
          {label}
        </Text>
        <Text size="tiny" alpha={0.7} margin={{ top: 4, left: 50 }}>
          {description}
        </Text>
      </ImageLinkItem>
    </ResourceListItem>
  )
}

const LINK_ELEMENTS = {
  button: ButtonLink,
  block: BlockLink,
  list: ListLink,
  default: SimpleLink,
  image: ImageLink,
}

function Links({
  value: { display, links },
  onLinkClick,
  ...props
}: {
  value: {
    display:
      | (keyof typeof LINK_CONTAINERS & keyof typeof LINK_ELEMENTS)
      | string
    links: Link[]
  }
  onLinkClick?: LinkEventHandler
  compact?: boolean
}) {
  const Container =
    LINK_CONTAINERS[display as keyof typeof LINK_CONTAINERS] || LinksContainer
  const Element =
    LINK_ELEMENTS[display as keyof typeof LINK_ELEMENTS] || SimpleLink

  return (
    <Container {...props}>
      {links.map((link, i) => (
        <Element
          key={i}
          onClick={
            onLinkClick && ((e: React.SyntheticEvent) => onLinkClick(e, link))
          }
          {...link}
          href={link.href || '#'}
        >
          {link.label}
        </Element>
      ))}
    </Container>
  )
}

function Embedded({
  value: { entries },
  onLinkClick,
  onImageClick,
  ImageSource,
}: {
  value: {
    entries: TripleElementData[][]
  }
  onLinkClick: LinkEventHandler
  onImageClick: ImageEventHandler
  ImageSource: ImageSourceType
}) {
  return (
    <DocumentCarousel margin={{ top: 20 }}>
      {entries.map((elements, i) => (
        <Carousel.Item key={i} size="large">
          {elements.map(({ type, value }, j) => {
            const Element = EMBEDDED_ELEMENTS[type]

            return (
              Element && (
                <Element
                  key={j}
                  value={value}
                  onLinkClick={onLinkClick}
                  onImageClick={onImageClick}
                  ImageSource={ImageSource}
                  {...(j === 0 ? { margin: { top: 0 } } : {})}
                />
              )
            )
          })}
        </Carousel.Item>
      ))}
    </DocumentCarousel>
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
    background-image: url(${({ bulletType: name }) =>
      BULLET_ICON_URLS[name || 'oval']});
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
