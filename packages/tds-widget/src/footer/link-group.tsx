import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'

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
export function LinkGroup() {
  return (
    <LinksContainer>
      <a href="/pages/tos.html" target="_blank" rel="noreferrer">
        서비스 이용약관
      </a>
      |
      <a href="/pages/privacy-policy.html" target="_blank" rel="noreferrer">
        개인정보 처리방침
      </a>
      |
      <a href="/cs-bridge/entry" target="_blank" rel="noreferrer">
        고객센터
      </a>
    </LinksContainer>
  )
}
