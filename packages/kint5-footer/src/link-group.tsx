import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import { useTranslation } from '@titicaca/next-i18next'

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
  const { t } = useTranslation('common-web')

  return (
    <LinksContainer>
      <a href="/pages/tos.html" target="_blank" rel="noreferrer">
        {t('서비스 이용약관')}
      </a>
      |
      <a href="/pages/privacy-policy.html" target="_blank" rel="noreferrer">
        {t('개인정보 처리방침')}
      </a>
    </LinksContainer>
  )
}
