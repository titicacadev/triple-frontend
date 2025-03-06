import styled from 'styled-components'
import {
  Accordion,
  AccordionContent,
  Text,
  FlexBox,
  AccordionTitle,
} from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useSessionAvailability,
  useSessionControllers,
} from '@titicaca/react-contexts'
import { Dispatch, Fragment, SetStateAction } from 'react'

import { FooterText } from './type'

const MAX_PHONE_WIDTH = 360

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

  &:first-child {
    margin-right: 6px;
  }

  img {
    width: 16px;
    margin-left: 6px;
    vertical-align: middle;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    width: 100%;
  }
`

const Title = styled(AccordionTitle)`
  display: inline-block;
  color: var(--color-gray500) !important;
  font-size: 12px !important;
  font-weight: 700;
  width: auto;

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

const ButtonContainer = styled(FlexBox)`
  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

const LinkContainer = styled.a`
  text-decoration: underline;
`

interface CompanyInfoProps {
  companyTexts: Array<FooterText[]>
  hideAppDownloadButton?: boolean
  businessExpanded: boolean
  setBusinessExpanded: Dispatch<SetStateAction<boolean>>
}

export function CompanyInfo({
  companyTexts,
  hideAppDownloadButton = false,
  businessExpanded,
  setBusinessExpanded,
}: CompanyInfoProps) {
  const sessionAvailable = useSessionAvailability()
  const { login, logout } = useSessionControllers()
  const { trackEvent } = useEventTrackingContext()

  return (
    <Accordion
      active={businessExpanded}
      onActiveChange={() =>
        setBusinessExpanded((businessExpanded) => !businessExpanded)
      }
    >
      <AccordionHeader flex alignItems="center" justifyContent="space-between">
        <Title>
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
              as="button"
              type="button"
              onClick={() => {
                if (sessionAvailable) {
                  logout()
                  return
                }

                trackEvent({
                  ga: ['푸터_로그인'],
                  fa: {
                    action: '푸터_로그인',
                  },
                })
                login()
              }}
            >
              {sessionAvailable === true ? '로그아웃' : '로그인'}
            </Button>

            <Button
              href="https://triple.onelink.me/aZP6?pid=intro_web&af_dp=triple%3A%2F%2F%2Fmain"
              onClick={() => {
                trackEvent({
                  ga: ['푸터_트리플앱설치'],
                  fa: {
                    action: '푸터_트리플앱설치',
                  },
                })
              }}
            >
              <span>트리플 앱</span>
              <img
                src="https://assets.triple.guide/images/ico_download@3x.png"
                alt="app download"
              />
            </Button>
          </ButtonContainer>
        ) : null}
      </AccordionHeader>

      <AccordionContent>
        <Text size={11} lineHeight="17px" color="gray500" padding={{ top: 20 }}>
          {companyTexts.map((texts, index) => (
            <Fragment key={`company-text-line-${index}`}>
              {texts.map(({ text, url, faEventAction }, index) => (
                <Fragment key={`company-text-${index}`}>
                  {url ? (
                    <LinkContainer
                      onClick={() =>
                        trackEvent({ fa: { action: faEventAction } })
                      }
                    >
                      {text}
                    </LinkContainer>
                  ) : (
                    text
                  )}
                  {index !== texts.length - 1 ? ' ' : null}
                </Fragment>
              ))}
              {index !== companyTexts.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </Text>
      </AccordionContent>
    </Accordion>
  )
}
