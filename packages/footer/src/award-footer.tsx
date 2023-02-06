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
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/c22c15f7-a48a-49da-b8f6-e784724441d1.jpeg',
    alt: 'ISO27001',
    text: '국제표준 정보보호 관리체계 (ISO27001) 인증 취득',
  },
  {
    id: 2,
    imageUrl:
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/a6a01895-e719-4829-9009-3ed111637826.jpeg',
    alt: 'ISO27701',
    text: '국제표준 정보보호 관리체계 (ISO27701) 인증 취득',
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
  width: 132px;
  border: 1px solid var(--color-brightGray);
  border-radius: 6px;
  padding: 8px 11px;
  background-color: var(--color-white);
  font-size: 10px;
  line-height: 14px;
`

const AwardFlexBox = styled(FlexBox).attrs({
  position: 'relative',
  flex: true,
  gap: 7,
})`
  ${AwardImg}:hover + ${Tooltip} {
    position: absolute;
    bottom: calc(100% + 3px);
    right: 0;
    display: block;
  }
`

export function AwardFooter({
  hideAppDownloadButton = false,
}: AwardFooterProps) {
  const [businessExpanded, setBusinessExpanded] = useState<boolean>(false)

  return (
    <FooterFrame>
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
          주식회사 인터파크는 통신판매중개로서 통신판매의 당사자가 아니며
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
