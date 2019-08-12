import React, { PureComponent } from 'react'
import { Table, Container } from '@titicaca/triple-design-system'

const HORIZONTAL_SAMPLE = {
  type: 'horizontal',
  head: [{ text: '목적지' }, { text: '요금 / 소요시간' }, { text: '운행간격' }],
  body: [
    [{ text: '난바 OCAT' }, { text: '1,050엔 / 45분' }, { text: '30분' }],
    [{ text: '오사카' }, { text: '1,550엔 / 70분' }, { text: '30분' }],
    [{ text: '신우메다시티' }, { text: '1,550엔 / 75분' }, { text: '30분' }],
    [{ text: '신사이바시' }, { text: '1,550엔 / 70분' }, { text: '30분' }],
    [{ text: '난코' }, { text: '1,550엔 / 45분' }, { text: '70분' }],
  ],
}

const VERTICAL_SAMPLE = {
  type: 'vertical',
  head: [
    { text: '루트' },
    { text: '요금' },
    { text: '소요시간' },
    { text: '운행간격' },
  ],
  body: [
    [{ text: '간사이 공항 → JR 교토역' }],
    [{ text: '하루카 편도 3,370엔 이코카 & 하루카 편도 3,600엔' }],
    [{ text: '1시간 15분' }],
    [{ text: '시간당 급행 2대 / 일반 3대' }],
  ],
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Container
          className="wrap_horizontal"
          padding={{ left: 30, right: 30 }}
        >
          <Table {...HORIZONTAL_SAMPLE} />
        </Container>
        <br />
        <Container className="wrap_vertical" padding={{ left: 30, right: 30 }}>
          <Table {...VERTICAL_SAMPLE} />
        </Container>
      </div>
    )
  }
}
