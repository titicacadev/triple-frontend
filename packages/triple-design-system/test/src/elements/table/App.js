import React, { PureComponent } from 'react'
import { Table } from '@titicaca/triple-design-system'

const row_sample = {
  type: 'horizontal',
  head: ['목적지', '요금/소요시간', '운행간격'],
  body: [
    ['난바 OCAT', '1,050엔/45분', '30분'],
    ['오사카', '1,550엔/70분', '30분'],
    ['신우메다시티', '1,550엔/75분', '30분'],
    ['신사이바시', '1,550엔/70분', '30분'],
    ['난코', '1,550엔/45분', '70분'],
  ],
}

const col_sample = {
  type: 'vertical',
  head: ['루트', '요금', '소요\n시간', '운행\n간격'],
  body: [
    ['간사이 공항 → JR 교토역'],
    ['하루카 편도 3,370엔 이코카 & 하루카 편도 3,600엔'],
    ['1시간 15분'],
    ['시간당 급행 2대 / 일반 3대'],
  ],
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <div>
          <Table {...row_sample} />
        </div>
        <br />
        <div>
          <Table {...col_sample} />
        </div>
      </div>
    )
  }
}
