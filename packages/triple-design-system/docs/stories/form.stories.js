import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Input,
  ConfirmSelector,
  Textarea,
  Select,
  GenderSelector,
  Radio,
} from '@titicaca/triple-design-system'

storiesOf('Form', module)
  .add('Input', () => <Input placeholder="이름을 입력해주세요" />)
  .add('Input(Error)', () => (
    <Input placeholder="이름을 입력해주세요" error="필수 값 입니다" />
  ))
  .add('Input(Label)', () => (
    <Input label="이름" placeholder="이름을 입력해주세요" />
  ))
  .add('Input(Label Error)', () => (
    <Input
      label="이름"
      placeholder="이름을 입력해주세요"
      error="필수 값 입니다"
    />
  ))
  .add('ConfirmSelector', () => (
    <ConfirmSelector value={false} placeholder="예약자와 투숙자가 다릅니다" />
  ))
  .add('ConfirmSelector(Check)', () => (
    <ConfirmSelector value={true} placeholder="예약자와 투숙자가 다릅니다" />
  ))
  .add('Radio', () => (
    <Radio value={'item1'} options={['item1', 'item2', 'item3']} />
  ))
  .add('Textarea', () => <Textarea placeholder="추가정보를 입력해주세요" />)
  .add('Select', () => (
    <Select
      placeholder="시간을 선택해주세요"
      options={['12:00', '12:10', '12:20']}
    />
  ))
  .add('GenderSelector', () => <GenderSelector value="MALE" />)
