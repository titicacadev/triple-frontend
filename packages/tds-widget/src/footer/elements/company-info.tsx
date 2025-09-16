import { styled } from 'styled-components'
import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  Container,
} from '@titicaca/tds-ui'
import { useTrackEvent } from '@titicaca/triple-web'
import { Dispatch, SetStateAction, Fragment } from 'react'

import { FooterInfo, FooterText } from '../utils/type'
import { DESKTOP_MIN_WIDTH } from '../utils/constants'

import { ButtonArea } from './button-area'
import { Divider } from './divider'

const AccordionHeader = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${DESKTOP_MIN_WIDTH - 1}px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const Title = styled(AccordionTitle)`
  display: flex;
  align-items: center;
  flex: 1;
  color: #1b1c1f !important;
  font-size: 14px !important;
  font-weight: 700;
  line-height: 17px;
  margin-top: 12px;

  &::after {
    display: none;
  }

  @media (max-width: ${DESKTOP_MIN_WIDTH - 1}px) {
    margin-top: 20px;
  }
`

const TextList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;

  li {
    display: flex;
    align-items: center;
    color: #6e6f73;
    font-size: 12px;
    line-height: 14px;
  }
`

const LinkContainer = styled.a`
  text-decoration: underline;
`

interface CompanyInfoProps {
  companyTexts: Array<FooterText[]>
  buttons?: FooterInfo['buttons']
  hideAppDownloadButton?: boolean
  businessExpanded: boolean
  setBusinessExpanded: Dispatch<SetStateAction<boolean>>
}

export function CompanyInfo({
  companyTexts: rowTexts,
  buttons,
  hideAppDownloadButton = false,
  businessExpanded,
  setBusinessExpanded,
}: CompanyInfoProps) {
  const trackEvent = useTrackEvent()

  return (
    <Accordion
      active={businessExpanded}
      onActiveChange={() =>
        setBusinessExpanded((businessExpanded) => !businessExpanded)
      }
    >
      <AccordionHeader>
        <Title css={{ marginTop: hideAppDownloadButton ? 0 : undefined }}>
          트리플 사업자정보
          <ArrowIcon businessExpanded={businessExpanded} />
        </Title>

        {!hideAppDownloadButton && !!buttons?.length ? (
          <ButtonArea buttons={buttons} />
        ) : null}
      </AccordionHeader>

      <AccordionContent>
        <TextList>
          {rowTexts.map((columnTexts, index) => (
            <li key={`company-text-line-${index}`}>
              {columnTexts.map(({ text, url, faEventAction }, index) => (
                <Fragment key={`company-text-${index}`}>
                  {url ? (
                    <LinkContainer
                      onClick={
                        faEventAction
                          ? () => trackEvent({ fa: { action: faEventAction } })
                          : undefined
                      }
                    >
                      {text}
                    </LinkContainer>
                  ) : (
                    text
                  )}
                  {index !== columnTexts.length - 1 ? <Divider /> : null}
                </Fragment>
              ))}
              {index !== rowTexts.length - 1 ? <br /> : null}
            </li>
          ))}
        </TextList>
      </AccordionContent>
    </Accordion>
  )
}

function ArrowIcon({ businessExpanded }: { businessExpanded: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        marginLeft: '2px',
        transform: businessExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <path
        d="M10 8L6 4L2 8"
        stroke="#1B1C1F"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
