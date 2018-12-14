import React from 'react'
import Container from './container'
import styled from 'styled-components'

const FooterFrame = styled.div`
  color: rgba(46, 46, 46, 0.5);
  font-size: 11px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.55;
  font-family: sans-serif;
  background-color: #fafafa;
`

const LinksContainer = styled.div`
  font-weight: bold;
  color: #3a3a3a;

  a {
    font-weight: bold;
    font-style: normal;
    line-height: 2;
    color: #3a3a3a;
    text-decoration: none;
  }

  margin: 10px 0;
`

const Footer = () => (
  <FooterFrame>
    <Container
      whiteSpace="nowrap"
      minWidth={320}
      maxWidth={600}
      centered
      padding={{ top: 50, left: 30, right: 30, bottom: 50 }}
    >
      주식회사 트리플 ｜ 대표 김연정, 최휘영
      <br />
      사업자 등록번호 581-87-00266
      <br />
      통신판매업 신고번호 2017-성남분당-0275
      <br />
      경기도 성남시 분당구 판교역로 14번길 16, 3층
      <br />
      호텔 예약 및 투어/티켓 문의 1588-2539
      <br />
      help@triple-corp.com
      <LinksContainer>
        <a href="/pages/tos.html" target="_blank">
          서비스 이용약관
        </a>
        {' | '}
        <a href="/pages/privacy-policy.html" target="_blank">
          개인정보 처리방침
        </a>
      </LinksContainer>
      (주)트리플은 통신판매중개자로서 통신판매의 당사자가 아니며
      <br />
      상품 거래정보 및 거래 등에 대해 책임을 지지 않습니다.
    </Container>
  </FooterFrame>
)

export default Footer
