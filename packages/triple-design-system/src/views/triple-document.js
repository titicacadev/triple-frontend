import React from 'react'
import styled from 'styled-components'

import {
  ImageCarouselElementContainer,
  ImageBlockElementContainer,
  ImageCaption,
  SimpleLink,
} from '../elements/content-elements'
import { HR1, HR2, HR3, HR4, HR5, HR6 } from '../elements/hr'
import Segment from '../elements/segment'
import Button from '../elements/button'
import Text from '../elements/text'
import Image from '../elements/image'
import List from '../elements/list'
import Carousel from '../elements/carousel'
import Container from '../elements/container'
import { H1, H2, H3, H4, Paragraph } from './text'
import { RegionListElement } from './region'
import { PoiListElement, PoiCarouselElement } from './poi'
import { TnaProductsList } from './tna'

const MH1 = ({ children, ...props }) => (
  <H1 margin={{ top: 25, bottom: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H1>
)

const MH2 = ({ children, ...props }) => (
  <H2 margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H2>
)

const MH3 = ({ compact, children, ...props }) => (
  <H3
    margin={compact ? { top: 13 } : { top: 20, left: 30, right: 30 }}
    compact={compact}
    {...props}
  >
    {children}
  </H3>
)

const MH4 = ({ children, ...props }) => (
  <H4 margin={{ top: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H4>
)

const DocumentTnaProducts = ({ onTNAProductClick, value, ...props }) => (
  <TnaProductsList
    margin={{ top: 30, left: 30, right: 30 }}
    onProductClick={onTNAProductClick}
    {...value}
    {...props}
  />
)

export const ELEMENTS = {
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
  regions: Regions,
  video: Video,
  tnaProducts: DocumentTnaProducts,
}

const EMBEDDED_ELEMENTS = {
  heading2: Compact(Heading(MH3)), // POI의 featuredContent에서 embedded entry의 제목이 heading2로 옵니다.
  heading3: Compact(Heading(MH3)),
  text: Compact(TextElement),
  links: Compact(Links),
  images: EmbeddedImages,
}

export function TripleDocument({
  children,
  onResourceClick,
  onResourceScrapedChange,
  onImageClick,
  onLinkClick,
  onTNAProductClick,
  onTNAProductsFetch,
  imageSourceComponent,
  resourceScraps,
  customElements,
}) {
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
            />
          )
        )
      })}
    </>
  )
}

function Heading(Component) {
  return ({ value: { text, href, emphasize, headline }, ...props }) => (
    <Component href={href} emphasize={emphasize} headline={headline} {...props}>
      {text}
    </Component>
  )
}

function TextElement({ value: { text, rawHTML }, compact, ...props }) {
  if (rawHTML) {
    return (
      <Text.Html
        margin={compact ? { top: 4 } : { top: 10, left: 30, right: 30 }}
        alpha={0.9}
        dangerouslySetInnerHTML={{ __html: rawHTML }}
        {...props}
      />
    )
  }

  return (
    <Paragraph
      margin={compact ? { top: 4 } : { top: 10, left: 30, right: 30 }}
      {...props}
    >
      {text}
    </Paragraph>
  )
}

function Compact(Component) {
  return (props) => <Component compact {...props} />
}

function Images({
  value: { images, display },
  onImageClick,
  onLinkClick,
  ImageSource,
}) {
  const ImagesContainer = display === 'block' ? Container : DocumentCarousel
  const ElementContainer =
    display === 'block'
      ? ImageBlockElementContainer
      : ImageCarouselElementContainer

  const onClick = (e, image) =>
    (image.link || {}).href
      ? onLinkClick(e, image.link)
      : onImageClick(e, image)

  return (
    <ImagesContainer
      margin={{ top: 40, bottom: images.some(({ title }) => title) ? 10 : 30 }}
    >
      {images.map((image, i) => {
        const { frame, sizes, sourceUrl } = image

        return (
          <ElementContainer key={i}>
            <Image
              src={sizes.large.url}
              sourceUrl={sourceUrl}
              frame={frame}
              onClick={(e) => onClick(e, image)}
              ImageSource={ImageSource}
            />
            {image.title ? <ImageCaption>{image.title}</ImageCaption> : null}
          </ElementContainer>
        )
      })}
    </ImagesContainer>
  )
}

function EmbeddedImages({
  value: {
    images: [image],
  },
  onImageClick,
  onLinkClick,
  ImageSource,
}) {
  if (image) {
    const { sizes, sourceUrl, link } = image

    const onClick = (link || {}).href ? onLinkClick : onImageClick

    return (
      <Image
        size="medium"
        src={sizes.large.url}
        sourceUrl={sourceUrl}
        onClick={(e) => onClick(e, (link || {}).href || image)}
        ImageSource={ImageSource}
      />
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

function renderPoiListActionButton({ actionButtonElement, display, poi }) {
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

  return undefined
}

const ResourceList = ({ children }) => (
  <List margin={{ top: 20, left: 30, right: 30 }}>{children}</List>
)

const DocumentCarousel = ({ margin, children }) => (
  <Carousel margin={margin} containerPadding={{ left: 30, right: 30 }}>
    {children}
  </Carousel>
)

export function Pois({
  value: { display, pois },
  actionButtonElement,
  onResourceClick,
  onResourceScrapedChange,
  resourceScraps,
}) {
  const Container = display === 'list' ? ResourceList : DocumentCarousel
  const margin =
    display === 'list' ? { top: 20, left: 30, right: 30 } : { top: 20 }
  const Element =
    display === 'list'
      ? (props) => <PoiListElement compact {...props} />
      : PoiCarouselElement

  return (
    <Container margin={margin}>
      {pois.map((poi) => (
        <Element
          key={poi.id}
          poi={poi}
          resourceScraps={resourceScraps}
          onClick={onResourceClick && ((e) => onResourceClick(e, poi))}
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

const LinksContainer = styled.div`
  margin: ${({ compact }) => (compact ? '0' : '0 30px')};
  margin-top: ${({ compact }) => (compact ? '10px' : '20px')};
  margin-bottom: ${({ compact }) => (compact ? '-10px' : '-20px')};

  a {
    display: inline-block;
    margin-bottom: ${({ compact }) => (compact ? '10px' : '20px')};
    margin-right: ${({ compact }) => (compact ? '10px' : '20px')};
  }
`

const ButtonContainer = styled.div`
  padding: ${({ compact }) => (compact ? '12px 0 4px 0' : '50px 30px 0 30px')};
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

const BlockContainer = styled.div`
  padding: ${({ compact }) => (compact ? '7px 0 4px 0' : '45px 30px 0 30px')};
  text-align: center;
`

const LINK_CONTAINERS = {
  button: ButtonContainer,
  block: BlockContainer,
  default: LinksContainer,
}

function ButtonLink({ children, ...props }) {
  return (
    <Button bold color="blue" {...props}>
      {children}
    </Button>
  )
}

function BlockLink({ children, ...props }) {
  return (
    <Button basic fluid compact color="gray" {...props}>
      {children}
    </Button>
  )
}

const LINK_ELEMENTS = {
  button: ButtonLink,
  block: BlockLink,
  default: SimpleLink,
}

function Links({ value: { display, links }, onLinkClick, ...props }) {
  const Container = LINK_CONTAINERS[display] || LinksContainer
  const Element = LINK_ELEMENTS[display] || SimpleLink

  return (
    <Container {...props}>
      {links.map((link, i) => (
        <Element
          key={i}
          href={link.href}
          onClick={onLinkClick && ((e) => onLinkClick(e, link))}
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
                />
              )
            )
          })}
        </Carousel.Item>
      ))}
    </DocumentCarousel>
  )
}

function Note({ value: { title, body } }) {
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

function Regions({ value: { regions }, onResourceClick }) {
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
  -webkit-mask-image: -webkit-radial-gradient(white, black);
`

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

function Video({ value: { provider, identifier } }) {
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
