import styled from 'styled-components'
import { CheckIcon, Container } from '@titicaca/kint5-core-elements'

import { TripleElementData, Link } from '../types'

import { Text } from './text'
import Links from './links'

function ListBullet({ bulletType }: { bulletType?: string }) {
  return (
    <div
      css={{
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
      }}
    >
      {bulletType === 'check' ? (
        <CheckIcon color="#000" css={{ width: 10, height: 10 }} />
      ) : (
        '•'
      )}
    </div>
  )
}

const ListTextElement = styled(Text)`
  font-size: 16px;
  margin: 0;
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
  ...props
}: {
  value: {
    bulletType?: string
    items: (TextElementData | LinksElementData)[]
  }
}) {
  return (
    <Container
      {...props}
      css={{
        margin: '10px 16px 0',
      }}
    >
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            css={{
              position: 'relative',
              paddingLeft: 16,
            }}
          >
            <ListBullet bulletType={bulletType} />
            {item.type === 'text' ? (
              <ListTextElement value={item.value} compact />
            ) : null}
            {item.type === 'links' ? (
              <Links
                value={{ display: 'list', links: item.value.links }}
                css={{
                  lineHeight: 1.63,
                  margin: 0,
                  '& > a': {
                    margin: 0,
                  },
                }}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </Container>
  )
}
