import React, { useState } from 'react'
import { Checkbox } from '@titicaca/form'

export default function CheckboxWrapper() {
  const [checkedList, setCheckedList] = useState<string[]>([])

  return (
    <Checkbox
      name="tour_time"
      value={checkedList}
      options={[
        { label: '12:10', value: '12:10' },
        { label: '12:20', value: '12:20' },
        { label: '12:30', value: '12:30' },
      ]}
      onChange={(value) => {
        console.log('value', value)
        setCheckedList(value)
      }}
    />
  )
}
