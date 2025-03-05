import { useState } from 'react'
import styled from 'styled-components'
import { Text, Container } from '@titicaca/core-elements'

import { LinkGroup } from './link-group'
import { CompanyInfo } from './company-info'
import { ExtraLink } from './extra-link'
import { useFooterInfo } from './use-footer-info'

export const FooterFrame = styled.footer`
  background-color: rgba(250, 250, 250, 1);
`

export interface DefaultFooterProps {
  hideAppDownloadButton?: boolean
  extraLinkVisible?: boolean
}

function DefaultFooter({
  hideAppDownloadButton = false,
  extraLinkVisible = false,
  ...props
}: DefaultFooterProps) {
  const footerInfo = useFooterInfo()
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
          company={footerInfo.company}
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
          {footerInfo.disclaimer.replace('\n', '')}
        </Text>

        <LinkGroup links={footerInfo.links} />

        {extraLinkVisible && !!footerInfo.extraLinks.length
          ? footerInfo.extraLinks.map((link, index) => (
              <ExtraLink key={`extra-link-${index}`} {...link} />
            ))
          : null}
      </Container>
    </FooterFrame>
  )
}

export default DefaultFooter
