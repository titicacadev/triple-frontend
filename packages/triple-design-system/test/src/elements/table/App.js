import React, { PureComponent } from 'react'
import { Table } from '@titicaca/triple-design-system'

const sample = {
  head: ['목적지', '요금/소요시간', '운행간격'],
  body: [
    ['난바 OCAT', '1,050엔/45분', '30분'],
    ['오사카', '1,550엔/70분', '30분'],
    ['신우메다시티', '1,550엔/75분', '30분'],
    ['신사이바시', '1,550엔/70분', '30분'],
    ['난코', '1,550엔/45분', '70분'],
  ],
}

export default class App extends PureComponent {
  render() {
    return <div>Hello</div>
  }
}
