import React, { useState } from 'react'
import { Checkbox } from '@titicaca/form'

export default function CheckboxWrapper() {
  const [, setCheckedList] = useState<string[]>([])

  return (
    <Checkbox
      name="tour_time"
      options={[
        { key: '0', label: '12:10', value: '12:10' },
        { key: '1', label: '12:20', value: '12:20' },
        {
          key: '2',
          label: '12:30',
          value: '12:30',
        },
      ]}
      onChange={(value) => {
        setCheckedList(value)
      }}
    />
  )
}
