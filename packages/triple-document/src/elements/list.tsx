import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import { Color } from '@titicaca/color-palette'

import { TripleElementData, Link } from '../types'

import { Text } from './text'
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

const ListTextElement = styled(Text)`
  font-size: 16px;
  margin-left: 8px;
  display: inline;
  div,
  p,
  pre {
    display: inline;
  }
`

type TextElementData = TripleElementData<
  'text',
  { text: string; rawHTML: string }
>
type LinksElementData = TripleElementData<'links', { links: Link[] }>

export default function List({
  value: { bulletType, items },
  textColor,
  ...props
}: {
  value: {
    bulletType?: string
    items: (TextElementData | LinksElementData)[]
  }
  textColor?: Color
}) {
  return (
    <Container margin={{ top: 10, left: 30, right: 30 }} {...props}>
      <ul>
        {items.map((item, index) => (
          <ListItemContainer bulletType={bulletType} key={index}>
            {item.type === 'text' ? (
              <ListTextElement value={item.value} compact color={textColor} />
            ) : null}
            {item.type === 'links' ? (
              <Links value={{ display: 'list', links: item.value.links }} />
            ) : null}
          </ListItemContainer>
        ))}
      </ul>
    </Container>
  )
}
