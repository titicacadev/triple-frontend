import React from 'react'
import styled from 'styled-components'

import {
  HR1,
  HR2,
  HR3,
  Carousel,
  CarouselElementContainer,
  ImageCarousel,
  ImageCarouselElementContainer,
  ImageCaption,
  SimpleLink,
  RegionElement,
} from '../elements/content-elements'
import Segment from '../elements/segment'
import Button from '../elements/button'
import Text from '../elements/text'
import Image from '../elements/image'
import List from '../elements/list'
import { H1, H2, H3, H4, Paragraph } from './text'
import { PoiListElement, PoiCarouselElement } from './poi'

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

const ELEMENTS = {
  heading1: Heading(MH1),
  heading2: Heading(MH2),
  heading3: Heading(MH3),
  heading4: Heading(MH4),
  text: TextElement,
  images: Images,
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  pois: Pois,
  links: Links,
  embedded: Embedded,
  note: Note,
  regions: Regions,
}

const EMBEDDED_ELEMENTS = {
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
  imageSourceComponent,
}) {
  return (
    <>
      {children.map(({ type, value }, i) => {
        const Element = ELEMENTS[type]

        return (
          Element && (
            <Element
              key={i}
              value={value}
              onResourceClick={onResourceClick}
              onImageClick={onImageClick}
              onLinkClick={onLinkClick}
              onResourceScrapedChange={onResourceScrapedChange}
              ImageSource={imageSourceComponent}
            />
          )
        )
      })}
    </>
  )
}

function Heading(Component) {
  return ({ value: { text, emphasize, headline }, ...props }) => (
    <Component emphasize={emphasize} headline={headline} {...props}>
      {text}
    </Component>
  )
}

function TextElement({ value: { text, rawHTML }, compact, ...props }) {
  if (rawHTML) {
    return (
      <Text.Html
        margin={compact ? { top: 4 } : { top: 10, left: 30, right: 30 }}
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

function Images({ value: { images }, onImageClick, ImageSource }) {
  return (
    <ImageCarousel>
      {images.map((image, i) => {
        const { frame, sizes, sourceUrl } = image

        return (
          <ImageCarouselElementContainer key={i}>
            <Image
              src={sizes.large.url}
              sourceUrl={sourceUrl}
              frame={frame}
              onClick={onImageClick && ((e) => onImageClick(e, image))}
              ImageSource={ImageSource}
            />
            <ImageCaption>{image.title}</ImageCaption>
          </ImageCarouselElementContainer>
        )
      })}
    </ImageCarousel>
  )
}

function EmbeddedImages({
  value: {
    images: [image],
  },
  onImageClick,
  ImageSource,
}) {
  if (image) {
    const { sizes, sourceUrl } = image

    return (
      <Image
        size="small"
        src={sizes.large.url}
        sourceUrl={sourceUrl}
        onClick={onImageClick && ((e) => onImageClick(e, image))}
        ImageSource={ImageSource}
      />
    )
  }

  return null
}

const PoiListScrapButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 34px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-list-on@2x.png' : 'btn-content-scrap-list-off@2x.png')});
  background-size: 34px 34px;
`

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

function PoiListActionButton({ poi, onScrapedChange }) {
  const {
    source: { pricing },
    scraped,
  } = poi

  if (pricing) {
    const { nightlyPrice } = pricing

    return (
      <PoiPrice>
        <Text bold size="mini" alpha={1}>
          {nightlyPrice ? `₩${nightlyPrice.toLocaleString()}` : '보기'}
        </Text>
      </PoiPrice>
    )
  }

  return (
    <PoiListScrapButton
      pressed={scraped}
      onClick={
        onScrapedChange &&
        ((e) => {
          e.stopPropagation()
          onScrapedChange(e, { ...poi, scraped: !scraped })
        })
      }
    />
  )
}

const PoiCarouselScrapButton = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 36px;
  height: 36px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-overlay-on@2x.png' : 'btn-content-scrap-overlay-off@2x.png')});
  background-size: 36px 36px;
`

function PoiCarouselActionButton({
  poi: { scraped, ...poi },
  onScrapedChange,
}) {
  return (
    <PoiCarouselScrapButton
      pressed={scraped}
      onClick={
        onScrapedChange &&
        ((e) => {
          e.stopPropagation()
          onScrapedChange(e, { ...poi, scraped: !scraped })
        })
      }
    />
  )
}

const ResourceList = ({ children }) => (
  <List margin={{ top: 20, left: 30, right: 30 }}>{children}</List>
)

export function Pois({
  value: { display, pois },
  actionButtonElement,
  onResourceClick,
  onResourceScrapedChange,
}) {
  const Container = display === 'list' ? ResourceList : Carousel
  const Element = display === 'list' ? PoiListElement : PoiCarouselElement
  const ActionButton =
    display === 'list' ? PoiListActionButton : PoiCarouselActionButton

  return (
    <Container>
      {pois.map((poi) => (
        <Element
          key={poi.id}
          poi={poi}
          onClick={onResourceClick && ((e) => onResourceClick(e, poi))}
          actionButtonElement={
            actionButtonElement || actionButtonElement === null ? (
              actionButtonElement
            ) : (
              <ActionButton
                poi={poi}
                onScrapedChange={onResourceScrapedChange}
              />
            )
          }
        />
      ))}
    </Container>
  )
}

const LinksContainer = styled.div`
  margin: ${({ compact }) => (compact ? '0' : '0 30px')};

  a {
    display: inline-block;
    margin-top: ${({ compact }) => (compact ? '10px' : '20px')};
    margin-right: ${({ compact }) => (compact ? '10px' : '20px')};
  }
`

const ButtonContainer = styled.div`
  padding: ${({ compact }) => (compact ? '12px 0 4px 0' : '50px 30px 0 30px')};
  text-align: center;
`

const LINK_CONTAINERS = {
  button: ButtonContainer,
  block: ButtonContainer,
  default: LinksContainer,
}

function ButtonLink({ children, ...props }) {
  return (
    <Button bold color="blue" alpha={1} {...props}>
      {children}
    </Button>
  )
}

function BlockLink({ children, ...props }) {
  return (
    <Button basic fluid bold color="gray" alpha={0.2} {...props}>
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
      {links.map(({ label, href }, i) => (
        <Element
          key={i}
          href={href}
          onClick={onLinkClick && ((e) => onLinkClick(e))}
        >
          {label}
        </Element>
      ))}
    </Container>
  )
}

function Embedded({ value: { entries }, onImageClick, ImageSource }) {
  return (
    <Carousel>
      {entries.map((elements, i) => (
        <CarouselElementContainer key={i} size="medium">
          {elements.map(({ type, value }, j) => {
            const Element = EMBEDDED_ELEMENTS[type]

            return (
              Element && (
                <Element
                  key={j}
                  value={value}
                  onImageClick={onImageClick}
                  ImageSource={ImageSource}
                />
              )
            )
          })}
        </CarouselElementContainer>
      ))}
    </Carousel>
  )
}

function Note({ value: { title, body } }) {
  return (
    <Segment margin={{ top: 20, left: 30, right: 30 }}>
      <Text bold size="small" color="gray" alpha={1} lineHeight={1.43}>
        {title}
      </Text>
      <Text size="small" color="gray" alpha={0.7} lineHeight={1.43}>
        {body}
      </Text>
    </Segment>
  )
}

function Regions({ value: { regions }, onResourceClick }) {
  return (
    <ResourceList>
      {regions.map((region, index) => (
        <RegionElement
          key={index}
          value={region}
          onClick={onResourceClick && ((e) => onResourceClick(e, region))}
        />
      ))}
    </ResourceList>
  )
}
