import { styled } from 'styled-components'
import { useTrackEvent } from '@titicaca/triple-web'

const Link = styled.a`
  display: block;
  color: var(--color-gray500);
  font-size: 10px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-top: 20px;
`

export function TripleKoreaLink() {
  const trackEvent = useTrackEvent()

  return (
    <Link
      href="https://triple.global"
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent({ fa: { action: '푸터_트리플코리아링크' } })}
    >
      TRIPLE Korea for Foreign Travelers
    </Link>
  )
}
