import React, { PureComponent } from 'react'
import {
  Input,
  RadioBox,
  CheckBox,
  Container,
} from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  state = {
    focus: true,
  }

  render() {
    const { focus } = this.state

    return (
      <div className="modal-container">
        <Container margin={{ bottom: 10 }}>
          <Input name="name" placeholder="이름을 입력해주세요" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input placeholder="이름을 입력해주세요" focus={focus} />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input placeholder="이름을 입력해주세요" focus={focus} error />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input placeholder="생년월일을 입력해주세요" mask="9999-99-99" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input
            placeholder="핸드폰 번호를 입력해주세요"
            mask="999-9999-9999"
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <RadioBox gender value="MALE" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <CheckBox
            confirm
            placeholder="예약자와 투숙자가 다릅니다"
            value={true}
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <CheckBox
            centered
            confirm
            placeholder="예약자와 투숙자가 다릅니다"
            value={true}
          />
        </Container>
      </div>
    )
  }
}
