import type { Meta, StoryObj } from '@storybook/react'

import { List } from '../list'

import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'tds-ui / Input',
  component: Input,
}

export default meta

export const Default: StoryObj<typeof Input> = {
  args: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
    help: '고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다.',
  },
}

export const Required: StoryObj<typeof Input> = {
  args: {
    ...Default.args,
    required: true,
  },
}

export const Error: StoryObj<typeof Input> = {
  args: {
    ...Default.args,
    error: '이름은 필수 입력 사항입니다.',
  },
}

export const Mask: StoryObj<typeof Input> = {
  args: {
    ...Default.args,
    mask: '99/99',
    value: 1230,
  },
}

export const MultilineHelp: StoryObj<typeof Input> = {
  args: {
    ...Default.args,
    help: (
      <List marker verticalGap={4}>
        <List.Item>연락 가능한 전화번호를 입력해주세요.</List.Item>
        <List.Item>
          예약 변경, 이슈가 있는 경우 입력한 번호로 연락드립니다.
        </List.Item>
        <List.Item>
          {`카카오톡 ID는 카카오 프로필 > 설정 > 프로필 관리에서 확인가능합니다.`}
        </List.Item>
      </List>
    ),
  },
}
