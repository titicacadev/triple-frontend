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
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from '@titicaca/next-i18next'

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

interface CompanyInfoProps {
  hideAppDownloadButton?: boolean
  businessExpanded: boolean
  setBusinessExpanded: Dispatch<SetStateAction<boolean>>
}

export function CompanyInfo({
  hideAppDownloadButton = false,
  businessExpanded,
  setBusinessExpanded,
}: CompanyInfoProps) {
  const sessionAvailable = useSessionAvailability()
  const { login, logout } = useSessionControllers()
  const { trackEvent } = useEventTrackingContext()
  const { t } = useTranslation('common-web')

  return (
    <Accordion
      active={businessExpanded}
      onActiveChange={() =>
        setBusinessExpanded((businessExpanded) => !businessExpanded)
      }
    >
      <AccordionHeader flex alignItems="center" justifyContent="space-between">
        <Title>
          {t('트리플 코리아 사업자 정보')}
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
              {sessionAvailable === true ? t('로그아웃') : t('로그인')}
            </Button>
          </ButtonContainer>
        ) : null}
      </AccordionHeader>

      <AccordionContent>
        <Text size={11} lineHeight="17px" color="gray500" padding={{ top: 20 }}>
          {t('인터파크트리플 | 대표 최휘영')} <br />
          {t('사업자 등록번호 824-81-02515')}
          <br />
          {t('통신판매업 신고번호 2022-서울강남-02179')}
          <br />
          {t('서울특별시 강남구 삼성로 512 삼성동빌딩 10층')} <br />
        </Text>
      </AccordionContent>
    </Accordion>
  )
}
