import styled from 'styled-components'
import { Container, FlexBox, Text } from '@titicaca/core-elements'
import { Fragment, useState } from 'react'

import { LinkGroup as LinkGroupBase } from './link-group'
import {
  DefaultFooterProps as AwardFooterProps,
  FooterFrame,
} from './default-footer'
import { CompanyInfo } from './company-info'

const AWARD_INFO = [
  {
    id: 1,
    imageUrl:
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/1060b728-6ef3-477d-a64a-0a38f5c3250e.jpeg',
    alt: '국제표준 정보보호 인증마크 ISO27001, ISO 27701',
    text: '국제표준 정보보호 인증 취득\nISO 27001, ISO 27701',
  },
]

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
  width: 135px;
  border: 1px solid var(--color-brightGray);
  border-radius: 6px;
  padding: 8px 11px;
  background-color: var(--color-white);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-gray800);
  line-height: 14px;
  word-spacing: -0.5px;
  white-space: pre-line;
`

const AwardFlexBox = styled(FlexBox).attrs({
  position: 'relative',
  flex: true,
  gap: 7,
})`
  ${AwardImg}:hover + ${Tooltip} {
    position: absolute;
    bottom: calc(100% + 4px);
    right: 0;
    display: block;
  }
`

export function AwardFooter({
  hideAppDownloadButton = false,
  ...props
}: AwardFooterProps) {
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
          &#12828;인터파크트리플은 통신판매중개로서 통신판매의 당사자가 아니며
          <br /> 상품 거래정보 및 거래등에 대해 책임을 지지 않습니다.
        </Text>
        <Info />
      </Container>
    </FooterFrame>
  )
}

function Info() {
  return (
    <InfoFlexBox>
      <LinkGroupBase />
      <AwardGroup />
    </InfoFlexBox>
  )
}

function AwardGroup() {
  return (
    <AwardFlexBox>
      {AWARD_INFO.map(({ id, imageUrl, alt, text }) => (
        <Fragment key={id}>
          <AwardImg src={imageUrl} alt={alt} />
          <Tooltip>{text}</Tooltip>
        </Fragment>
      ))}
    </AwardFlexBox>
  )
}

export default AwardFooter
