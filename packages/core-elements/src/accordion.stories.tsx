import { Text, Accordion } from '@titicaca/core-elements'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Core-Elements / Accordion',
  components: Accordion,
} as Meta

interface BusinessHoursCustomArgs {
  active: boolean
  title: string
}

export const BusinessHours: Story<BusinessHoursCustomArgs> = ({
  active,
  title,
}) => {
  return (
    <Accordion>
      <Accordion.Title active={active}>
        <Text bold>{title}</Text>
      </Accordion.Title>
      <Accordion.Folded active={active}>
        <Text bold color="blue">
          오늘 09:00 - 18:00
        </Text>
      </Accordion.Folded>
      <Accordion.Content active={active}>
        <Text>
          월<br />화<br />수<br />목<br />금<br />토<br />일
        </Text>
      </Accordion.Content>
    </Accordion>
  )
}
BusinessHours.storyName = '영업시간'
BusinessHours.args = {
  active: false,
  title: '이용가능시간, 휴무일',
}
