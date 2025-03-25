import { useState } from 'react'
import { styled } from 'styled-components'
import { Text, Container } from '@titicaca/tds-ui'

import { LinkGroup } from './link-group'
import { CompanyInfo } from './company-info'
import { ExtraLinkGroup } from './extra-link-group'
import { useFooterInfo } from './use-footer-info'

export const FooterFrame = styled.footer`
  background-color: rgba(250, 250, 250, 1);
`

export interface DefaultFooterProps {
  hideAppDownloadButton?: boolean
  extraLinkVisible?: boolean
}

export function DefaultFooter({
  hideAppDownloadButton = false,
  extraLinkVisible = false,
  ...props
}: DefaultFooterProps) {
  const footerInfo = useFooterInfo()
  const [businessExpanded, setBusinessExpanded] = useState<boolean>(false)

  if (!footerInfo) {
    return null
  }

  return (
    <FooterFrame {...props}>
      <Container
        centered
        css={{
          minWidth: 280,
          maxWidth: 768,
          padding: '30px 30px 40px',
        }}
      >
        <CompanyInfo
          companyTexts={footerInfo.companyTexts}
          hideAppDownloadButton={hideAppDownloadButton}
          businessExpanded={businessExpanded}
          setBusinessExpanded={setBusinessExpanded}
          buttons={footerInfo.buttons}
        />
        <Text
          size={11}
          lineHeight="17px"
          color="gray500"
          margin={{ top: businessExpanded ? 10 : 25, bottom: 20 }}
        >
          {footerInfo.disclaimer}
        </Text>

        <LinkGroup links={footerInfo.links} />

        {extraLinkVisible ? (
          <ExtraLinkGroup extraLinks={footerInfo.extraLinks} />
        ) : null}
      </Container>
    </FooterFrame>
  )
}
