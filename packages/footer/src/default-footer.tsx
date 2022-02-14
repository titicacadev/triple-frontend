import { useState } from 'react'
import styled from 'styled-components'
import { Accordion, Text, Container, FlexBox } from '@titicaca/core-elements'
import {
  useSessionAvailability,
  useSessionControllers,
} from '@titicaca/react-contexts'

const MAX_PHONE_WIDTH = 360

const FooterFrame = styled.footer`
  background-color: rgba(250, 250, 250, 1);
`

const AccordionHeader = styled(FlexBox)`
  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const Button = styled.a`
  height: 32px;
  padding: 9px 12px;
  font-size: 11px;
  font-weight: bold;
  line-height: 13px;
  color: var(--color-gray600);
  text-align: center;
  border: 1px solid var(--color-gray200);
  border-radius: 4px;
  background-color: rgba(250, 250, 250, 1);

  img {
    width: 16px;
    margin-left: 6px;
    vertical-align: middle;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    width: 100%;
  }
`

const Title = styled(Accordion.Title)`
  display: inline-block;
  color: var(--color-gray500) !important;
  font-size: 12px !important;
  font-weight: 700;

  ::after {
    display: none;
  }
`

const AccordionArrow = styled.img`
  transform: translateY(-2px);
  margin-left: 3px;
  width: 15px;
  height: 15px;
`

const LinksContainer = styled(Container)`
  font-size: 11px;
  font-weight: bold;
  line-height: 20px;
  color: var(--color-gray);

  a {
    color: var(--color-gray);
    text-decoration: none;
    margin: 6px;
  }

  a:first-child {
    margin-left: 0;
  }
`

const ButtonContainer = styled(FlexBox)`
  a:first-child {
    margin-right: 6px;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

interface DefaultFooterProps {
  hideAppDownloadButton?: boolean
}

function DefaultFooter({ hideAppDownloadButton }: DefaultFooterProps) {
  const sessionAvailable = useSessionAvailability()
  const { login, logout } = useSessionControllers()

  const [businessExpanded, setBusinessExpanded] = useState(false)

  return (
    <FooterFrame>
      <Container
        centered
        css={{
          minWidth: 280,
          maxWidth: 768,
          padding: '30px 30px 40px 30px',
        }}
      >
        <Accordion>
          <AccordionHeader
            flex
            alignItems="center"
            justifyContent="space-between"
          >
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

            {!hideAppDownloadButton ? (
              <ButtonContainer flex>
                <Button
                  onClick={() =>
                    sessionAvailable === true ? logout() : login()
                  }
                >
                  {sessionAvailable === true ? '로그아웃' : '로그인'}
                </Button>

                <Button href="https://triple.onelink.me/aZP6?pid=intro_web&af_dp=triple%3A%2F%2F%2Fmain">
                  <span>트리플 앱</span>
                  <img
                    src="https://assets.triple.guide/images/ico_download@3x.png"
                    alt="app download"
                  />
                </Button>
              </ButtonContainer>
            ) : null}
          </AccordionHeader>

          <Accordion.Content active={businessExpanded}>
            <Text
              size={11}
              lineHeight="17px"
              color="gray500"
              padding={{ top: 20 }}
            >
              주식회사 인터파크 | 대표 최휘영 <br />
              사업자 등록번호 824-81-02515
              <br />
              통신판매업 신고번호 2022-서울강남-02179
              <br />
              서울특별시 강남구 삼성로 512 삼성동빌딩 10층 <br />
              항공, 숙소 및 투어·티켓 문의 1588-2539 <br />
              help@triple-corp.com
            </Text>
          </Accordion.Content>
        </Accordion>

        <Text
          size={11}
          lineHeight="17px"
          color="gray500"
          margin={{ top: businessExpanded ? 10 : 25, bottom: 20 }}
        >
          주식회사 인터파크는 통신판매중개로서 통신판매의 당사자가 아니며 상품
          거래정보 및 거래등에 대해 책임을 지지 않습니다.
        </Text>

        <LinksContainer>
          <a href="/pages/tos.html" target="_blank" rel="noreferrer">
            서비스 이용약관
          </a>
          |
          <a href="/pages/privacy-policy.html" target="_blank" rel="noreferrer">
            개인정보 처리방침
          </a>
          |
          <a href="/cs-bridge/entry" target="_blank" rel="noreferrer">
            고객센터
          </a>
        </LinksContainer>
      </Container>
    </FooterFrame>
  )
}

export default DefaultFooter
