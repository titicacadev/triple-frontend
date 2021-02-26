import React from 'react'
import { ELEMENTS } from '@titicaca/triple-document'
import { Meta } from '@storybook/react'

const { hr1: HR1, hr2: HR2, hr3: HR3, hr4: HR4, hr5: HR5, hr6: HR6 } = ELEMENTS

export default { title: 'triple-document/hr' } as Meta

export function HR1Example() {
  return <HR1 />
}
HR1Example.storyName = '구분선 1'

export function HR2Example() {
  return <HR2 />
}
HR2Example.storyName = '구분선 2'

export function HR3Example() {
  return <HR3 />
}
HR3Example.storyName = '구분선 3'

export function HR4Example() {
  return <HR4 />
}
HR4Example.storyName = '구분선 4'

export function HR5Example() {
  return <HR5 />
}
HR5Example.storyName = '구분선 5'

export function HR6Example() {
  return <HR6 />
}
HR6Example.storyName = '구분선 6'
