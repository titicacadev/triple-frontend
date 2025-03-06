import { styled } from 'styled-components'
import { useTrackEvent } from '@titicaca/triple-web'

import { FooterLink } from './type'

const Link = styled.a`
  display: block;
  color: var(--color-gray500);
  font-size: 10px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-top: 20px;
`

export function ExtraLink({ label, url, faEventAction }: FooterLink) {
  const trackEvent = useTrackEvent()

  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent({ fa: { action: faEventAction } })}
    >
      {label}
    </Link>
  )
}
