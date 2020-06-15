import React, { useState } from 'react'
import { Radio } from '@titicaca/form'

export default function RadioWrapper() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <Radio
      value={value}
      name="지역_선택"
      options={[
        {
          label: '전 지역',
          value: null,
        },
        {
          label: '신주쿠',
          value: '2',
        },
        {
          label: '우에노',
          value: '3',
        },
        {
          label: '긴자',
          value: '4',
        },
        {
          label:
            '아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 긴 텍스트',
          value: '5',
        },
      ]}
      onChange={(e, value) => {
        setValue(value)
      }}
    />
  )
}
