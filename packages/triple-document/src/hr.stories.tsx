import { Meta } from '@storybook/react'

import ELEMENTS from './elements'

const { hr1: HR1, hr2: HR2, hr3: HR3, hr4: HR4, hr5: HR5, hr6: HR6 } = ELEMENTS

export default { title: 'triple-document/hr' } as Meta

export function Hr1Example() {
  return <HR1 />
}
Hr1Example.storyName = '구분선 1'

export function Hr2Example() {
  return <HR2 />
}
Hr2Example.storyName = '구분선 2'

export function Hr3Example() {
  return <HR3 />
}
Hr3Example.storyName = '구분선 3'

export function Hr4Example() {
  return <HR4 />
}
Hr4Example.storyName = '구분선 4'

export function Hr5Example() {
  return <HR5 />
}
Hr5Example.storyName = '구분선 5'

export function Hr6Example() {
  return <HR6 />
}
Hr6Example.storyName = '구분선 6'
