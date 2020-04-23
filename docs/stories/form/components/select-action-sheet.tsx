import React, { useState } from 'react'
import { text, boolean } from '@storybook/addon-knobs'
import { ActionSheetSelector } from '@titicaca/form'

type Option = {
  key: string
  label: string
  value: string | null
}

export default function SelectActionSheetWraaper() {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Option['value']>(null)

  return (
    <ActionSheetSelector
      onOpen={() => {
        setOpen(true)
      }}
      title="투어티켓 시간"
      label="투어티켓 시간"
      error={text('에러 메세지', '')}
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      required={boolean('required', false)}
      onChange={(value) => setSelectedValue(value)}
      help={text(
        'placeholder',
        '고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다.',
      )}
      value={selectedValue}
      options={[
        {
          key: '12:00',
          label: '12:00',
          value: '12:00',
        },
        {
          key: '12:10',
          label: '12:10',
          value: '12:10',
        },
        {
          key: '12:20',
          label: '12:20',
          value: '12:20',
        },
      ]}
    />
  )
}
