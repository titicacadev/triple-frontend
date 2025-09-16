import { useState } from 'react'
import { styled } from 'styled-components'
import { Text, Container } from '@titicaca/tds-ui'

import { LinkGroup } from '../elements/link-group'
import { CompanyInfo } from '../elements/company-info'
import { ExtraLinkGroup } from '../elements/extra-link-group'
import { useFooterInfo } from '../utils/use-footer-info'
import {
  DEFAULT_FOOTER_MIN_HEIGHT,
  DESKTOP_MIN_WIDTH,
} from '../utils/constants'
import { AwardGroup } from '../elements/awards'

export const FooterFrame = styled.footer`
  background-color: #fafbfd;
`

export const FooterInnerContainer = styled(Container)`
  margin: 0 auto;
  padding: 30px 30px 60px;
  min-width: 280px;
  max-width: ${DESKTOP_MIN_WIDTH}px;
`

const Disclaimer = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: #8b8d92;
  margin-top: 12px;
  font-weight: 400;
`

const LinkGroupContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
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
        <Disclaimer>{footerInfo.disclaimer}</Disclaimer>

        <LinkGroupContainer>
          <LinkGroup links={footerInfo.links} />
          {awardsVisible ? <AwardGroup awards={footerInfo.awards} /> : null}
        </LinkGroupContainer>

        {extraLinkVisible ? (
          <ExtraLinkGroup extraLinks={footerInfo.extraLinks} />
        ) : null}
      </FooterInnerContainer>
    </FooterFrame>
  )
}
