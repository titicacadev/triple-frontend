import { useEventTrackingContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

import { Link } from './type'

const Link = styled.a`
  display: block;
  color: var(--color-gray500);
  font-size: 10px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-top: 20px;
`

export function ExtraLink({ label, url, faEventAction }: Link) {
  const { trackEvent } = useEventTrackingContext()

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
