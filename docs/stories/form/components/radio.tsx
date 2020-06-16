import React, { useState } from 'react'
import { Radio } from '@titicaca/form'

export default function RadioWrapper() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <Radio<string>
      value={value}
      name="지역_선택"
      options={[
        {
          key: '0',
          label: '전 지역',
          value: null,
        },
        {
          key: '1',
          label: '신주쿠',
          value: '2',
        },
        {
          key: '2',
          label: '우에노',
          value: '3',
        },
        {
          key: '3',
          label: '긴자',
          value: '4',
        },
        {
          key: '4',
          label:
            '아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 아주 긴 텍스트',
          value: '5',
        },
      ]}
      onChange={(value) => {
        setValue(value)
      }}
    />
  )
}
