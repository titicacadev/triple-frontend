import React, { useState } from 'react'
import styled from 'styled-components'
import { Accordion, Text, Container } from '@titicaca/core-elements'
import { useSessionContext } from '@titicaca/react-contexts'

import { FooterFrame } from './elements'

const LinksContainer = styled.div`
  font-size: 11px;
  font-weight: bold;
  line-height: 13.2px;
  color: #3a3a3a;
  a {
    color: rgba(58, 58, 58, 1);
    text-decoration: none;
    margin: 6px;
  }

  a:first-child {
    margin-left: 0;
  }

  margin-top: 20px;
`

const Button = styled.a`
  float: right;
  font-size: 12px;
  font-weight: bold;
  padding: 0 12px;
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid var(--color-gray200);
  border-radius: 4px;
  color: rgba(58, 58, 58, 0.6);
  cursor: pointer;
  margin-left: 8px;
  line-height: 32px;

  :hover {
    color: rgba(58, 58, 58, 0.6);
  }
  span {
    display: inline-block;
    width: 50px;
  }

  img {
    width: 16px;
    vertical-align: middle;
  }
`

const DisclaimerMsg = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: rgba(58, 58, 58, 0.5);
  line-height: 17px;
  margin-top: 16px;
`

const Title = styled(Accordion.Title)`
  display: inline-block;
  color: rgba(58, 58, 58, 0.5) !important;
  font-size: 12px !important;
  font-weight: 700;
  padding-top: 10px !important;

  ::after {
    display: none;
  }
`

const AccordionArrow = styled.img`
  transform: translateY(2px);
  margin-left: 3px;
  width: 15px;
  height: 15px;
`

export default function DefaultFooter() {
  const [businessExpanded, setBusinessExpanded] = useState(false)
  const { login, logout, hasSessionId } = useSessionContext()

  return (
    <FooterFrame>
      <Container
        minWidth={320}
        maxWidth={600}
        centered
        padding={{ top: 50, left: 30, right: 30, bottom: 50 }}
      >
        <Container>
          <Accordion style={{ width: '100%' }}>
            <Title
              active={businessExpanded}
              onClick={() => setBusinessExpanded(!businessExpanded)}
            >
              트리플 사업자 정보
              <AccordionArrow
                src={`https://assets.triple.guide/images/${
                  businessExpanded
                    ? 'ico_arrow_fold@3x.png'
                    : 'ico_arrow_more@3x.png'
                }`}
              />
            </Title>
            <Button href="https://triple.onelink.me/aZP6?pid=intro_web&af_dp=triple%3A%2F%2F%2Fmain">
              <span>트리플 앱</span>
              <img
                src="https://assets.triple.guide/images/ico_download@3x.png"
                alt="app download"
              />
            </Button>
            <Button onClick={() => (hasSessionId ? logout() : login())}>
              {hasSessionId ? '로그아웃' : '로그인'}
            </Button>
            <Accordion.Content active={businessExpanded}>
              <Text
                size={11}
                lineHeight="17px"
                color="gray500"
                padding={{ top: 14 }}
              >
                주식회사 트리플 | 대표 김연정, 최휘영 <br />
                사업자 등록번호 581-87-00266
                <br />
                통신판매업 신고번호 2017-성남분당-0275
                <br />
                경기도 성남시 분당구 판교역로 14번길 16, 3층 <br />
                항공, 숙소 및 투어·티켓 문의 1588-2539 <br />
                help@triple-corp.com
              </Text>
            </Accordion.Content>
          </Accordion>
        </Container>
        <DisclaimerMsg>
          (주) 트리플은 통신판매중개로서 통신판매의 당사자가 아니며 상품
          거래정보 및 거래등에 대해 책임을 지지 않습니다.
        </DisclaimerMsg>
        <LinksContainer>
          <a
            href="https://triple.guide/pages/tos.html"
            target="_blank"
            rel="noreferrer"
          >
            서비스 이용약관
          </a>
          |
          <a
            href="https://triple.guide/pages/privacy-policy.html"
            target="_blank"
            rel="noreferrer"
          >
            개인정보 처리방침
          </a>
          |
          <a href="https://triple-corp.com/" target="_blank" rel="noreferrer">
            회사 소개
          </a>
          |
          <a
            href="https://triple.oc.toast.com/triple/hc/article/"
            target="_blank"
            rel="noreferrer"
          >
            고객센터
          </a>
        </LinksContainer>
      </Container>
    </FooterFrame>
  )
}
