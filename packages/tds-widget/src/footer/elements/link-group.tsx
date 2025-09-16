import { Fragment } from 'react'
import { styled } from 'styled-components'
import { Container } from '@titicaca/tds-ui'
import { useTrackEvent } from '@titicaca/triple-web'

import { FooterLink } from '../utils/type'

import { Divider } from './divider'

const LinksContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-top: 20px;

  a {
    font-size: 12px;
    line-height: 14px;
    color: #3c3d40;
    text-decoration: none;
    word-break: keep-all;
    flex-shrink: 0;
  }
`

export function LinkGroup({ links }: { links: FooterLink[] }) {
  const trackEvent = useTrackEvent()

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
            css={{ fontWeight: link.bold ? 700 : 400 }}
          >
            {link.label}
          </a>
          {index < links.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </LinksContainer>
  )
}
