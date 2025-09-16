import { useState } from 'react'
import { styled } from 'styled-components'
import { Text, Container } from '@titicaca/tds-ui'

import { LinkGroup } from '../elements/link-group'
import { CompanyInfo } from '../elements/company-info'
import { ExtraLinkGroup } from '../elements/extra-link-group'
import { useFooterInfo } from '../utils/use-footer-info'
import { DEFAULT_FOOTER_MIN_HEIGHT } from '../utils/constants'
import { AwardGroup } from '../elements/awards'

export const FooterFrame = styled.footer`
  background-color: #fafbfd;
`

export const FooterInnerContainer = styled(Container)`
  margin: 0 auto;
  padding: 30px 30px 60px;
  min-width: 280px;
  max-width: 768px;
`

export interface DefaultFooterProps {
  hideAppDownloadButton?: boolean
  extraLinkVisible?: boolean
  awardsVisible?: boolean
}

export function DefaultFooter({
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
      <FooterInnerContainer>
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
      </FooterInnerContainer>
    </FooterFrame>
  )
}
