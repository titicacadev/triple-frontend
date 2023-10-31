import { MouseEventHandler, PropsWithChildren, SyntheticEvent } from 'react'
import styled from 'styled-components'
import {
  ButtonProps,
  Button,
  SquareImage,
  SimpleLink,
  Text,
  Container,
  FlexBox,
  List,
} from '@titicaca/kint5-core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import { Link } from '../types'
import { useLinkClickHandler } from '../prop-context/link-click-handler'

import ResourceList from './shared/resource-list'

const LinksContainer = styled.div<{ compact?: boolean; embedded?: boolean }>`
  margin: ${({ compact, embedded }) =>
    embedded
      ? '10px 0 -10px'
      : compact
      ? '10px 16px -10px'
      : '20px 16px -20px'};

  a,
  button {
    display: inline-block;
    margin-bottom: ${({ compact }) => (compact ? '10px' : '20px')};
    margin-right: ${({ compact }) => (compact ? '10px' : '20px')};
  }
`

const ButtonContainer = styled.div<{ compact?: boolean; embedded?: boolean }>`
  margin: ${({ compact, embedded }) =>
    embedded ? '12px 0 4px' : compact ? '12px 16px 4px' : '30px 16px 0'};
  text-align: center;

  a,
  button {
    margin-top: 5px;
  }

  a:not(:first-child),
  button:not(:first-child) {
    margin-top: 12px;
  }

  @media (max-width: 360px) {
    a:not(:first-child),
    button:not(:first-child) {
      margin-left: 0;
    }
  }
`

const BlockContainer = styled.div<{ compact?: boolean; embedded?: boolean }>`
  margin: ${({ compact, embedded }) =>
    embedded ? '7px 0 4px' : compact ? '7px 16px 4px' : '30px 16px 0'};
  text-align: center;
`

function ButtonLink({ children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <Button
      css={{
        width: '100%',
        backgroundColor: 'var(--color-kint5-brand1)',
        borderRadius: 12,
        fontSize: 14,
        color: 'var(--color-kint5-gray0)',
        textAlign: 'center',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

function BlockLink({
  children,
  level,
  ...props
}: PropsWithChildren<ButtonProps & Link>) {
  return (
    <Button
      fluid
      css={{
        fontSize: 14,
        backgroundColor:
          level === 'primary'
            ? 'var(--color-kint5-brand1)'
            : 'var(--color-kint5-gray20)',
        color:
          level === 'primary'
            ? 'var(--color-kint5-gray0)'
            : 'var(--color-kint5-gray100)',
        borderRadius: 12,
        marginTop: 12,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

const ImageLinkItem = styled.a`
  display: flex;
  gap: 12px;
  text-decoration: none;

  & + & {
    margin-top: 20px;
  }
`

const IMAGE_PLACEHOLDER =
  'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-flag-line-24.svg'

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
  onClick?: MouseEventHandler
}) {
  const defaultImageUrl = getDefaultImageUrl(image)

  return (
    <List.Item onClick={onClick} css={{ cursor: 'pointer', margin: '20px 0' }}>
      <ImageLinkItem href={href}>
        {defaultImageUrl ? (
          <SquareImage
            size="small"
            src={defaultImageUrl}
            alt={label}
            borderRadius={12}
          />
        ) : (
          <Container
            css={{
              width: 60,
              height: 60,
              position: 'relative',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: 12,
              backgroundColor: 'var(--color-kint5-gray10)',
            }}
          >
            <img
              src={IMAGE_PLACEHOLDER}
              alt={label}
              width={36}
              height={36}
              css={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Container>
        )}
        <FlexBox
          flex
          css={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Text ellipsis css={{ fontWeight: 700 }}>
            {label}
          </Text>
          <Text
            css={{
              marginTop: 4,
              color: 'var(--color-kint5-gray60)',
              fontSize: 13,
            }}
          >
            {description}
          </Text>
        </FlexBox>
      </ImageLinkItem>
    </List.Item>
  )
}

function getDefaultImageUrl(image: ImageMeta | undefined) {
  if (!image) {
    return null
  }

  const sizes = image.sizes as {
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
  /**
   * @deprecated 어드민에서 만들 수 없어서 기본 타입으로 fallback합니다.
   */
  list: LinksContainer,
  default: LinksContainer,
  image: ResourceList,
}

const LINK_ELEMENTS = {
  button: ButtonLink,
  block: BlockLink,
  /**
   * @deprecated 어드민에서 만들 수 없어서 기본 타입으로 fallback합니다.
   */
  list: SimpleLink,
  default: SimpleLink,
  image: ImageLink,
}

export default function Links({
  value: { display, links },
  ...props
}: {
  value: {
    display:
      | (keyof typeof LINK_CONTAINERS & keyof typeof LINK_ELEMENTS)
      | string
    links: Link[]
  }
  compact?: boolean
  embedded?: boolean
}) {
  const onLinkClick = useLinkClickHandler()

  const Container =
    LINK_CONTAINERS[display as keyof typeof LINK_CONTAINERS] || LinksContainer
  const Element =
    LINK_ELEMENTS[display as keyof typeof LINK_ELEMENTS] || SimpleLink

  return (
    <Container {...props}>
      {links.map((link, i) => (
        <Element
          key={i}
          onClick={onLinkClick && ((e: SyntheticEvent) => onLinkClick(e, link))}
          {...link}
          href={link.href || '#'}
        >
          {link.label}
        </Element>
      ))}
    </Container>
  )
}
