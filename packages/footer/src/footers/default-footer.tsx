import { useState } from 'react'
import styled from 'styled-components'
import { Text, Container } from '@titicaca/core-elements'

import { LinkGroup } from '../elements/link-group'
import { CompanyInfo } from '../elements/company-info'
import { ExtraLinkGroup } from '../elements/extra-link-group'
import { useFooterInfo } from '../utils/use-footer-info'
import { DEFAULT_FOOTER_MIN_HEIGHT } from '../utils/constants'
import { AwardGroup } from '../elements/awards'

export const FooterFrame = styled.footer`
  background-color: rgba(250, 250, 250, 1);
`

export interface DefaultFooterProps {
  hideAppDownloadButton?: boolean
  extraLinkVisible?: boolean
  awardsVisible?: boolean
}

function DefaultFooter({
  hideAppDownloadButton = false,
  extraLinkVisible = false,
  awardsVisible = false,
  ...props
}: DefaultFooterProps) {
  const footerInfo = useFooterInfo()
  const [businessExpanded, setBusinessExpanded] = useState<boolean>(false)

  if (!footerInfo) {
    return (
      <FooterFrame
        {...props}
        css={{ minHeight: DEFAULT_FOOTER_MIN_HEIGHT, width: '100%' }}
      />
    )
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
          margin={{ top: businessExpanded ? 10 : 20, bottom: 20 }}
        >
          {footerInfo.disclaimer}
        </Text>

        <Container
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <LinkGroup links={footerInfo.links} />
          {awardsVisible ? <AwardGroup awards={footerInfo.awards} /> : null}
        </Container>

        {extraLinkVisible ? (
          <ExtraLinkGroup extraLinks={footerInfo.extraLinks} />
        ) : null}
      </Container>
    </FooterFrame>
  )
}

export default DefaultFooter
