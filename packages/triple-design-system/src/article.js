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
  SourceUrl,
  ImageFrame,
  ImageCarousel,
  ImageCarouselElementContainer,
  ImageCaption,
  ListContainer,
  PoiListElement,
  PoiCarouselElement,
  SimpleLink,
  SimpleButton,
  NoteTitle,
  NoteDescription,
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
  regions: Regions,
}

const EMBEDDED_ELEMENTS = {
  heading3: Compact(Heading(H3)),
  text: Compact(Text),
  links: Compact(Links),
  images: EmbeddedImages,
}

export function Article ({
  children,
  onResourceClick,
  onResourceScrapedChange,
  onImageClick,
  onLinkClick,
  imageSourceComponent,
}) {
  return <>
    {
      children.map(({ type, value }, i) => {
        const Element = ELEMENTS[type]

        return Element && (
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

export function Images ({ value: { images }, onImageClick, ImageSource }) {
  return (
    <ImageCarousel>
      {
        images.map((image, i) => (
          <ImageCarouselElementContainer
            key={i}
            onClick={onImageClick && ((e) => onImageClick(e, image))}
          >
            <ImageFrame frame={image.frame}>
              <Image src={image.sizes.large.url} />
              {image.sourceUrl && (
                <SourceUrl>
                  {
                    ImageSource
                      ? <ImageSource>{image.sourceUrl}</ImageSource>
                      : image.sourceUrl
                  }
                </SourceUrl>
              )}
            </ImageFrame>
            <ImageCaption>{image.title}</ImageCaption>
          </ImageCarouselElementContainer>
        ))
      }
    </ImageCarousel>
  )
}

function EmbeddedImages ({ value: { images: [image] }, onImageClick, ImageSource }) {
  if (image) {
    return (
      <ImageFrame
        ratio={1.35}
        onClick={onImageClick && ((e) => onImageClick(e, image))}
      >
        <Image src={image.sizes.large.url} />
        {image.sourceUrl && (
          <SourceUrl>
            {
              ImageSource
                ? <ImageSource>{image.sourceUrl}</ImageSource>
                : image.sourceUrl
            }
          </SourceUrl>
        )}
      </ImageFrame>
    )
  }

  return null
}

export function Pois ({ value: { display, pois }, onResourceClick, onResourceScrapedChange }) {
  const Container = display === 'list' ? ListContainer : Carousel
  const Element = display === 'list' ? PoiListElement : PoiCarouselElement

  return (
    <Container>
      {
        pois.map((poi) => (
          <Element
            key={poi.id}
            value={poi}
            onClick={onResourceClick && ((e) => onResourceClick(e, poi))}
            onScrapedChange={onResourceScrapedChange}
          />
        ))
      }
    </Container>
  )
}

const LinksContainer = styled.div`
  margin: ${({ compact }) => compact ? '0' : '0 30px'};

  a {
    display: inline-block;
    margin-top: ${({ compact }) => compact ? '10px' : '20px'};
    margin-right: ${({ compact }) => compact ? '10px' : '20px'};
  }
`

const ButtonsContainer = styled.div`
  margin: ${({ compact }) => compact ? '0' : '50px auto'};
  text-align: center;
`

export function Links ({ value: { display, links }, onLinkClick, ...props }) {
  const Container = display === 'button' ? ButtonsContainer : LinksContainer
  const Element = display === 'button' ? SimpleButton : SimpleLink

  return (
    <Container {...props}>
      {
        links.map(({ label, href }, i) => <Element key={i} href={href} onClick={onLinkClick && ((e) => onLinkClick(e))}>{label}</Element>)
      }
    </Container>
  )
}

export function Embedded ({ value: { entries }, onImageClick, ImageSource }) {
  return (
    <Carousel>
      {
        entries.map((elements, i) => (
          <CarouselElementContainer key={i} size='medium'>
            {
              elements.map(({ type, value }, j) => {
                const Element = EMBEDDED_ELEMENTS[type]

                return Element && (
                  <Element
                    key={j}
                    value={value}
                    onImageClick={onImageClick}
                    ImageSource={ImageSource}
                  />
                )
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

export function Regions ({ value: { regions }, onResourceClick }) {
  return (
    <ListContainer>
      {regions.map((region, index) => (
        <RegionElement key={index} value={region} onClick={onResourceClick && ((e) => onResourceClick(e, region))} />)
      )}
    </ListContainer>
  )
}
