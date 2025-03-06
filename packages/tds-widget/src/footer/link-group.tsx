import { Fragment } from 'react'
import { styled } from 'styled-components'
import { Container } from '@titicaca/tds-ui'

import { FooterLink } from './type'

const LinksContainer = styled(Container)`
  font-size: 11px;
  font-weight: bold;
  line-height: 20px;
  color: var(--color-gray);

  a {
    color: var(--color-gray);
    text-decoration: none;
    margin: 6px;
  }

  a:first-child {
    margin-left: 0;
  }
`
export function LinkGroup({ links }: { links: FooterLink[] }) {
  return (
    <LinksContainer>
      {links.map((link, index) => (
        <Fragment key={`link-${index}`}>
          <a
            key={`link-${index}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
          {index < links.length - 1 && '|'}
        </Fragment>
      ))}
    </LinksContainer>
  )
}
