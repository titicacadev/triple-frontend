import { Fragment } from 'react'
import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { FooterLink } from '../utils/type'

const LinksContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  font-size: 11px;
  font-weight: bold;
  line-height: 20px;
  color: var(--color-gray);

  a {
    color: var(--color-gray);
    text-decoration: none;
    word-break: keep-all;
    flex-shrink: 0;
  }
`

const Divider = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 6px;
  background: var(--color-gray);
`

export function LinkGroup({ links }: { links: FooterLink[] }) {
  const { trackEvent } = useEventTrackingContext()

  return (
    <LinksContainer>
      {links.map((link, index) => (
        <Fragment key={`link-${index}`}>
          <a
            key={`link-${index}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            onClick={
              link.faEventAction
                ? () => trackEvent({ fa: { action: link.faEventAction } })
                : undefined
            }
          >
            {link.label}
          </a>
          {index < links.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </LinksContainer>
  )
}
