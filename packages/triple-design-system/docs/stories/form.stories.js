import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Input,
  ConfirmSelector,
  Textarea,
  Select,
  GenderSelector,
  Radio,
  Text,
} from '@titicaca/triple-design-system'

storiesOf('Form', module)
  .add('Input', () => <Input placeholder="이름을 입력해주세요" />)
  .add('Input(Error)', () => (
    <Input placeholder="이름을 입력해주세요" error="필수 값 입니다" />
  ))
  .add('Input(Label)', () => (
    <Input
      label="이름"
      placeholder="이름을 입력해주세요"
      help="고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다."
    />
  ))
  .add('Input(Label Error)', () => (
    <Input
      label="이름"
      placeholder="이름을 입력해주세요"
      error="필수 값 입니다"
    />
  ))
  .add('ConfirmSelector', () => (
    <ConfirmSelector
      value={false}
      textAlign="left"
      padding={{ top: 16, left: 16, bottom: 16 }}
    >
      <Text>예약자 정보를 업데이트 합니다.</Text>
    </ConfirmSelector>
  ))
  .add('ConfirmSelector(Check)', () => (
    <ConfirmSelector
      value={true}
      textAlign="right"
      padding={{ top: 16, right: 50, left: 16, bottom: 16 }}
    >
      <Text>예약자 정보를 업데이트 합니다.</Text>
    </ConfirmSelector>
  ))
  .add('ConfirmSelector(Borderless)', () => (
    <ConfirmSelector
      value={true}
      textAlign="right"
      borderless
      padding={{ top: 16, right: 50, left: 16, bottom: 16 }}
    >
      <Text>예약자 정보를 업데이트 합니다.</Text>
    </ConfirmSelector>
  ))
  .add('Radio', () => (
    <Radio value={'item1'} options={['item1', 'item2', 'item3']} />
  ))
  .add('Textarea', () => <Textarea placeholder="추가정보를 입력해주세요" />)
  .add('Select', () => (
    <Select
      placeholder="시간을 선택해주세요"
      value="12:00"
      options={[
        {
          label: '12:00',
          value: '12:00',
        },
        {
          label: '12:10',
          value: '12:10',
        },
        {
          label: '12:20',
          value: '12:20',
        },
      ]}
    />
  ))
  .add('GenderSelector', () => <GenderSelector value="MALE" />)
