import React from 'react'
import styled from 'styled-components'

import {
  H1,
  H2,
  H3,
  H4,
  HR1,
  HR2,
  HR3,
  Paragraph,
  Image,
  Carousel,
  CarouselElementContainer,
  ListContainer,
  PoiListElement,
  PoiCarousel,
  PoiCarouselElement,
  SimpleLink,
  SquareImage,
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
      {headline && <small>{headline}</small>}
      {text}
    </Component>
  )
}

function Text ({ value: { text }, ...props }) {
  return (
    <Paragraph {...props}>
      {text}
    </Paragraph>
  )
}

function Compact (Component) {
  return (props) => <Component compact {...props} />
}

function Images ({ value: { images } }) {
  return (
    <Carousel>
      {
        images.map((image, i) => <Image key={i} src={image.sizes.large.url} />)
      }
    </Carousel>
  )
}

function EmbeddedImages ({ value: { images: [image] } }) {
  if (image) {
    return <SquareImage size='medium' src={image.sizes.large.url} />
  }

  return null
}

function Pois ({ value: { display, pois } }) {
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
  margin: 20px 30px 0 30px;

  a {
    display: inline-block;
    margin-top: 20px;
    margin-right: 20px;
  }
`

function Links ({ value: { links }, ...props }) {
  return (
    <LinksContainer {...props}>
      {
        links.map(({ label, href }, i) => <SimpleLink key={i} href={href}>{label}</SimpleLink>)
      }
    </LinksContainer>
  )
}

function Embedded ({ value: { entries } }) {
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
