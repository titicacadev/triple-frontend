import { Meta, Story } from '@storybook/react'

import { Accordion } from './elements/accordion'
import Text from './elements/text'

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
    <Accordion active={active}>
      <Accordion.Title>
        <Text bold>{title}</Text>
      </Accordion.Title>
      <Accordion.Folded>
        <Text bold color="blue">
          오늘 09:00 - 18:00
        </Text>
      </Accordion.Folded>
      <Accordion.Content>
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
