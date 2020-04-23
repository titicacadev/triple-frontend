import React, { useState } from 'react'
import { Checkbox } from '@titicaca/form'

export default function CheckboxWrapper() {
  const [checkedList, setCheckedList] = useState([])

  return (
    <Checkbox
      name="tour_time"
      value={checkedList}
      options={[
        { key: '12:10', label: '12:10', value: '12:10' },
        { key: '12:20', label: '12:20', value: '12:20' },
        { key: '12:30', label: '12:30', value: '12:30' },
      ]}
      onChange={(value) => {
        setCheckedList(value)
      }}
    />
  )
}
