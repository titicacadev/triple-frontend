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
  Image,
  ImageFrame,
  ImageCarousel,
  ImageCarouselElementContainer,
  ImageCaption,
  ListContainer,
  PoiListElement,
  PoiCarousel,
  PoiCarouselElement,
  SimpleLink,
  SquareImage,
  NoteTitle,
  NoteDescription,
  Button,
  RegionElement,
} from './content-elements'

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
  buttons: Buttons,
  regions: Regions,
}

const EMBEDDED_ELEMENTS = {
  heading3: Compact(Heading(H3)),
  text: Compact(Text),
  links: Compact(Links),
  images: EmbeddedImages,
}

export function Article ({ children }) {
  return <>
    {
      children.map(({ type, value }, i) => {
        const Element = ELEMENTS[type]

        return Element && <Element key={i} value={value} />
      })
    }
  </>
}

function Heading (Component) {
  return ({ value: { text, emphasize, headline }, ...props }) => (
    <Component emphasize={emphasize} {...props}>
      {headline && <small><LineBreak>{headline}</LineBreak></small>}
      <LineBreak>
        {text}
      </LineBreak>
    </Component>
  )
}

function Text ({ value: { text }, ...props }) {
  return (
    <Paragraph {...props}>
      <LineBreak>
        {text}
      </LineBreak>
    </Paragraph>
  )
}

function Compact (Component) {
  return (props) => <Component compact {...props} />
}

export function Images ({ value: { images } }) {
  return (
    <ImageCarousel>
      {
        images.map(({ frame, title, sourceUrl, sizes }, i) => (
          <ImageCarouselElementContainer key={i}>
            <ImageFrame frame={frame} sourceUrl={sourceUrl}>
              <Image src={sizes.large.url} />
            </ImageFrame>
            <ImageCaption>{title}</ImageCaption>
          </ImageCarouselElementContainer>
        ))
      }
    </ImageCarousel>
  )
}

function EmbeddedImages ({ value: { images: [image] } }) {
  if (image) {
    return <SquareImage size='medium' src={image.sizes.large.url} />
  }

  return null
}

export function Pois ({ value: { display, pois } }) {
  const Container = display === 'list' ? ListContainer : PoiCarousel
  const Element = display === 'list' ? PoiListElement : PoiCarouselElement

  return (
    <Container>
      {
        pois.map(({ id, type, source }) => (
          <Element key={id} value={{ id, type, source }} />
        ))
      }
    </Container>
  )
}

const LinksContainer = styled.div`
  margin: 0px 30px 0 30px;

  a {
    display: inline-block;
    margin-top: 20px;
    margin-right: 20px;
  }
`

export function Links ({ value: { links }, ...props }) {
  return (
    <LinksContainer {...props}>
      {
        links.map(({ label, href }, i) => <SimpleLink key={i} href={href}>{label}</SimpleLink>)
      }
    </LinksContainer>
  )
}

export function Embedded ({ value: { entries } }) {
  return (
    <Carousel>
      {
        entries.map((elements, i) => (
          <CarouselElementContainer key={i}>
            {
              elements.map(({ type, value }, j) => {
                const Element = EMBEDDED_ELEMENTS[type]

                return Element ? <Element key={j} value={value} /> : null
              })
            }
          </CarouselElementContainer>
        ))
      }
    </Carousel>
  )
}

const NoteContainer = styled.div`
  margin: 20px 30px 0 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fafafa;
`

export function Note ({ value: { title, body } }) {
  return (
    <NoteContainer>
      <NoteTitle>{title}</NoteTitle>
      <NoteDescription><LineBreak>{body}</LineBreak></NoteDescription>
    </NoteContainer>
  )
}

const ButtonsContainer = styled.div`
  margin: 50px auto;
  text-align: center;
`

export function Buttons ({ value: { buttons } }) {
  return (
    <ButtonsContainer>
      {buttons.map(({ label, href }, index) => (
        <Button key={index} href={href} >
          {label}
        </Button>
      ))}
    </ButtonsContainer>
  )
}

export function Regions ({ value: { regions } }) {
  return (
    <ListContainer>
      {regions.map((region, index) => <RegionElement key={index} value={region} />)}
    </ListContainer>
  )
}
