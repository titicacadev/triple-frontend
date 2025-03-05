import { styled } from 'styled-components'
import { Container, FlexBox, Text } from '@titicaca/tds-ui'
import { Fragment, useState } from 'react'

import { LinkGroup as LinkGroupBase } from './link-group'
import {
  DefaultFooterProps as AwardFooterProps,
  FooterFrame,
} from './default-footer'
import { CompanyInfo } from './company-info'
import { ExtraLink } from './extra-link'
import { useFooterInfo } from './use-footer-info'
import { Award } from './type'

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
          margin={{ top: businessExpanded ? 15 : 18, bottom: 5 }}
        >
          {footerInfo.disclaimer}
        </Text>

        <InfoFlexBox>
          <Container>
            <LinkGroupBase links={footerInfo.links} />
            {footerInfo.extraLinks.length
              ? footerInfo.extraLinks.map((link, index) => (
                  <ExtraLink key={`extra-link-${index}`} {...link} />
                ))
              : null}
          </Container>

          <AwardGroup awards={footerInfo.awards} />
        </InfoFlexBox>
      </Container>
    </FooterFrame>
  )
}

function AwardGroup({ awards }: { awards: Award[] }) {
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
