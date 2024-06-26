import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { Container, FlexBox, Text } from '@titicaca/tds-ui'

import { TimeIcon, RightArrowIcon } from './business-hours-icons'

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`

export function BusinessHoursNote({
  todayBusinessHours,
  onClick,
}: {
  todayBusinessHours?: string
  onClick: () => void
}) {
  const { t } = useTranslation('triple-frontend')

  return (
    <Container
      css={{
        margin: '10px 0 0',
      }}
    >
      <FlexBox flex alignItems="center">
        <IconBox>
          <TimeIcon />
        </IconBox>

        <Text
          size={15}
          bold
          lineHeight="16px"
          color="red"
          margin={{ left: 4 }}
          ellipsis
          onClick={onClick}
        >
          {todayBusinessHours
            ? t('영업준비중 {{todayBusinessHours}}', { todayBusinessHours })
            : t('휴무일')}
        </Text>

        <IconBox>
          <RightArrowIcon />
        </IconBox>

        <Container />
      </FlexBox>
    </Container>
  )
}
