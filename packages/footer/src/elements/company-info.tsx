import styled from 'styled-components'
import {
  Accordion,
  AccordionContent,
  FlexBox,
  AccordionTitle,
} from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { Dispatch, Fragment, SetStateAction } from 'react'

import { FooterInfo, FooterText } from '../utils/type'
import { MAX_PHONE_WIDTH } from '../utils/constants'

import { ButtonArea } from './button-area'

const AccordionHeader = styled(FlexBox)`
  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const Title = styled(AccordionTitle)`
  display: inline-block;
  color: #1b1c1f !important;
  font-size: 14px !important;
  font-weight: 700;
  line-height: 17px;

  &::after {
    display: none;
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

const Divider = styled.div`
  width: 1px;
  height: 8px;
  background: #dadbdf;
  margin: 0 8px;
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
  companyTexts,
  buttons,
  hideAppDownloadButton = false,
  businessExpanded,
  setBusinessExpanded,
}: CompanyInfoProps) {
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
          트리플 사업자정보
          <ArrowIcon businessExpanded={businessExpanded} />
        </Title>

        {!hideAppDownloadButton && !!buttons?.length ? (
          <ButtonArea buttons={buttons} />
        ) : null}
      </AccordionHeader>

      <AccordionContent>
        <TextList>
          {companyTexts.map((texts, index) => (
            <li key={`company-text-line-${index}`}>
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
                  {index !== texts.length - 1 ? <Divider /> : null}
                </Fragment>
              ))}
              {index !== companyTexts.length - 1 ? <br /> : null}
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
