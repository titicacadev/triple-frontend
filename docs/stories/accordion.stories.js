import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { Text, Accordion } from '@titicaca/core-elements'

storiesOf('Accordion', module).add('영업시간', () => (
  <Accordion>
    <Accordion.Title active={boolean('펼침', false)}>
      <Text bold>{text('제목', '이용가능시간, 휴무일')}</Text>
    </Accordion.Title>
    <Accordion.Folded active={boolean('펼침', false)}>
      <Text bold color="blue">
        오늘 09:00 - 18:00
      </Text>
    </Accordion.Folded>
    <Accordion.Content active={boolean('펼침', false)}>
      <Text>
        월<br />화<br />수<br />목<br />금<br />토<br />일
      </Text>
    </Accordion.Content>
  </Accordion>
))
