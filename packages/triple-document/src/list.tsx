import React from 'react'
import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'

import TextElement from './text-element'
import { TripleElementData, Link, LinkEventHandler } from './types'
import Links from './links'

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

type TextElementData = TripleElementData<'text', string>
type LinksElementData = TripleElementData<'links', { links: Link[] }>

export default function List({
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
