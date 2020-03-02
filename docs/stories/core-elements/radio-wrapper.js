import React, { useState } from 'react'
import { Radio } from '@titicaca/core-elements'

export default function RadioWrapper() {
  const [value, setValue] = useState(undefined)

  return (
    <Radio
      value={value}
      name="지역_선택"
      options={[
        {
          text: '전 지역',
          value: null,
        },
        {
          text: '신주쿠',
          value: '2',
        },
        {
          text: '우에노',
          value: '3',
        },
        {
          text: '긴자',
          value: '4',
        },
      ]}
      onChange={(e, value) => setValue(value)}
    />
  )
}
