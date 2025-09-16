import styled from 'styled-components'
import {
  Accordion,
  AccordionContent,
  Text,
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
          <AccordionArrow
            src={`https://assets.triple.guide/images/${
              businessExpanded
                ? 'ico_arrow_fold@3x.png'
                : 'ico_arrow_more@3x.png'
            }`}
          />
        </Title>

        {!hideAppDownloadButton && !!buttons?.length ? (
          <ButtonArea buttons={buttons} />
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
