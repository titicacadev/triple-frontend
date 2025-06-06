import { styled } from 'styled-components'
import { Container, FlexBox, Text } from '@titicaca/tds-ui'
import { Fragment, useState } from 'react'

import { LinkGroup as LinkGroupBase } from './link-group'
import {
  DefaultFooterProps as AwardFooterProps,
  FooterFrame,
} from './default-footer'
import { CompanyInfo } from './company-info'
import { ExtraLinkGroup } from './extra-link-group'
import { useFooterInfo } from './use-footer-info'
import { FooterAward } from './type'
import { AWARD_FOOTER_MIN_HEIGHT } from './constants'

const InfoFlexBox = styled(FlexBox).attrs({
  flex: true,
  justifyContent: 'space-between',
  alignItems: 'flex-end',
})`
  > div {
    line-height: inherit;
  }
`

const AwardImg = styled.img`
  width: 26px;
  height: 28px;
`

const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  border: 1px solid var(--color-brightGray);
  border-radius: 6px;
  padding: 8px 11px;
  background-color: var(--color-white);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-gray800);
  line-height: 14px;
  white-space: pre;
`

const AwardFlexBox = styled(FlexBox).attrs({
  position: 'relative',
  flex: true,
  gap: '7px',
  flexShrink: 0,
})`
  ${AwardImg}:hover + ${Tooltip} {
    display: block;
  }
`

export function AwardFooter({
  hideAppDownloadButton = false,
  ...props
}: AwardFooterProps) {
  const footerInfo = useFooterInfo()
  const [businessExpanded, setBusinessExpanded] = useState<boolean>(false)

  if (!footerInfo) {
    return (
      <FooterFrame
        {...props}
        css={{ minHeight: AWARD_FOOTER_MIN_HEIGHT, width: '100%' }}
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
          margin={{ top: businessExpanded ? 15 : 20, bottom: 5 }}
          css={{ wordBreak: 'break-word' }}
        >
          {footerInfo.disclaimer}
        </Text>

        <InfoFlexBox>
          <Container>
            <LinkGroupBase links={footerInfo.links} />
            <ExtraLinkGroup extraLinks={footerInfo.extraLinks} />
          </Container>

          <AwardGroup awards={footerInfo.awards} />
        </InfoFlexBox>
      </Container>
    </FooterFrame>
  )
}

function AwardGroup({ awards }: { awards: FooterAward[] }) {
  return (
    <AwardFlexBox>
      {awards.map(({ imageUrl, alt, text }, index) => (
        <Fragment key={`award-${index}`}>
          <AwardImg src={imageUrl} alt={alt} />
          <Tooltip>{text}</Tooltip>
        </Fragment>
      ))}
    </AwardFlexBox>
  )
}
