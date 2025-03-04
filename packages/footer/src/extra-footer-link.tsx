import { useEventTrackingContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

const Link = styled.a`
  display: block;
  color: var(--color-gray500);
  font-size: 10px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-top: 20px;
`

interface ExtraFooterLinkProps {
  href: string
  text: string
  faEventAction: string
}

export function ExtraFooterLink({
  href,
  text,
  faEventAction,
}: ExtraFooterLinkProps) {
  const { trackEvent } = useEventTrackingContext()

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent({ fa: { action: faEventAction } })}
    >
      {text}
    </Link>
  )
}
