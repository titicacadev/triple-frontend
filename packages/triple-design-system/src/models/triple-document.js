import React from 'react'
import styled from 'styled-components'

import {
  LineBreak,
  H1,
  H2,
  H3,
  H4,
  HR1,
  HR2,
  HR3,
  Paragraph,
  Carousel,
  CarouselElementContainer,
  ImageFrame,
  ImageCarousel,
  ImageCarouselElementContainer,
  ImageCaption,
  ResourceList,
  PoiListElement,
  PoiCarouselElement,
  SimpleLink,
  Segment,
  RegionElement,
} from '../elements/content-elements'
import Button from '../elements/button'

const ELEMENTS = {
  heading1: Heading(H1),
  heading2: Heading(H2),
  heading3: Heading(H3),
  heading4: Heading(H4),
  text: Text,
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
  heading3: Compact(Heading(H3)),
  text: Compact(Text),
  links: Compact(Links),
  images: EmbeddedImages,
}

function TripleDocument({
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
    <Component emphasize={emphasize} {...props}>
      {headline && (
        <small>
          <LineBreak>{headline}</LineBreak>
        </small>
      )}
      <LineBreak>{text}</LineBreak>
    </Component>
  )
}

function Text({ value: { text }, ...props }) {
  return (
    <Paragraph {...props}>
      <LineBreak>{text}</LineBreak>
    </Paragraph>
  )
}

function Compact(Component) {
  return (props) => <Component compact {...props} />
}

function Images({ value: { images }, onImageClick, ImageSource }) {
  return (
    <ImageCarousel>
      {images.map((image, i) => (
        <ImageCarouselElementContainer key={i}>
          <ImageFrame
            image={image}
            onClick={onImageClick && ((e) => onImageClick(e, image))}
            ImageSource={ImageSource}
          />
          <ImageCaption>{image.title}</ImageCaption>
        </ImageCarouselElementContainer>
      ))}
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
  return (
    image && (
      <ImageFrame
        ratio={1.35}
        onClick={onImageClick && ((e) => onImageClick(e, image))}
        image={image}
        ImageSource={ImageSource}
      />
    )
  )
}

function Pois({
  value: { display, pois },
  onResourceClick,
  onResourceScrapedChange,
}) {
  const Container = display === 'list' ? ResourceList : Carousel
  const Element = display === 'list' ? PoiListElement : PoiCarouselElement

  return (
    <Container>
      {pois.map((poi) => (
        <Element
          key={poi.id}
          value={poi}
          onClick={onResourceClick && ((e) => onResourceClick(e, poi))}
          onScrapedChange={onResourceScrapedChange}
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

const DocumentButtonContainer = styled(Button.Container)`
  padding: 50px 0;
`

function Links({ value: { display, links }, onLinkClick, ...props }) {
  const Container =
    display === 'button' ? DocumentButtonContainer : LinksContainer
  const Element = display === 'button' ? Button : SimpleLink

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

const NoteTitle = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  color: #3a3a3a;
`

const NoteDescription = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  color: rgba(58, 58, 58, 0.7);
`

function Note({ value: { title, body } }) {
  return (
    <Segment>
      <NoteTitle>{title}</NoteTitle>
      <NoteDescription>
        <LineBreak>{body}</LineBreak>
      </NoteDescription>
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

TripleDocument.Pois = Pois
TripleDocument.Images = Images
TripleDocument.Regions = Regions
TripleDocument.Links = Links
TripleDocument.Embedded = Embedded
TripleDocument.Note = Note

export default TripleDocument
