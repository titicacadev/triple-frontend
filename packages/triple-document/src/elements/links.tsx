import React from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'
import {
  ButtonProps,
  Button,
  ResourceListItem,
  SquareImage,
  SimpleLink,
  Text,
} from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import { Link, LinkEventHandler } from '../types'
import ResourceList from './shared/resource-list'

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
  level,
  ...props
}: React.PropsWithChildren<ButtonProps & Link>) {
  return (
    <Button
      basic={level !== 'primary'}
      fluid
      size="small"
      compact={!(level === 'primary' || level === 'secondary')}
      color={level === 'primary' ? 'blue' : 'gray'}
      borderRadius={4}
      margin={{ top: 10 }}
      {...props}
    >
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
  image?: ImageMeta
  onClick?: React.MouseEventHandler
}) {
  return (
    <ResourceListItem onClick={onClick}>
      <ImageLinkItem href={href}>
        <SquareImage
          floated="left"
          size="small"
          src={getDefaultImageUrl(image) || IMAGE_PLACEHOLDER}
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

function getDefaultImageUrl(image: ImageMeta | undefined) {
  if (!image) {
    return null
  }

  const sizes = image.sizes as {
    // eslint-disable-next-line @typescript-eslint/camelcase
    small_square?: { url: string }
    smallSquare?: { url: string }
  }

  if (sizes.small_square) {
    return sizes.small_square.url
  } else if (sizes.smallSquare) {
    return sizes.smallSquare.url
  } else {
    return null
  }
}

const LINK_CONTAINERS = {
  button: ButtonContainer,
  block: BlockContainer,
  list: ListLinkContainer,
  default: LinksContainer,
  image: ResourceList,
}

const LINK_ELEMENTS = {
  button: ButtonLink,
  block: BlockLink,
  list: ListLink,
  default: SimpleLink,
  image: ImageLink,
}

export default function Links({
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
