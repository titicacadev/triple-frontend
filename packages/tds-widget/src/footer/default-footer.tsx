import { useState } from 'react'
import { styled } from 'styled-components'
import { Text, Container } from '@titicaca/tds-ui'

import { LinkGroup } from './link-group'
import { CompanyInfo } from './company-info'
import { ExtraLink } from './extra-link'
import { useCompanyInfo } from './use-company-info'

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
  const companyInfo = useCompanyInfo()
  const [businessExpanded, setBusinessExpanded] = useState<boolean>(false)

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
          company={companyInfo.company}
          hideAppDownloadButton={hideAppDownloadButton}
          businessExpanded={businessExpanded}
          setBusinessExpanded={setBusinessExpanded}
        />
        <Text
          size={11}
          lineHeight="17px"
          color="gray500"
          margin={{ top: businessExpanded ? 10 : 25, bottom: 20 }}
        >
          {companyInfo.disclaimer.replace(/\\n/g, '')}
        </Text>

        <LinkGroup links={companyInfo.links} />

        {extraLinkVisible && companyInfo.extraLinks.length
          ? companyInfo.extraLinks.map((link, index) => (
              <ExtraLink key={`extra-link-${index}`} {...link} />
            ))
          : null}
      </Container>
    </FooterFrame>
  )
}
