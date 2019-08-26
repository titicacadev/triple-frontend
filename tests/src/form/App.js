import React, { PureComponent } from 'react'
import {
  Input,
  Radio,
  GenderSelector,
  ConfirmSelector,
  Container,
  Textarea,
} from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div className="modal-container">
        <Container margin={{ bottom: 10 }}>
          <Input name="name" placeholder="이름을 입력해주세요" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input placeholder="이름을 입력해주세요" focus="true" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input placeholder="이름을 입력해주세요" error="true" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input
            label="이름"
            placeholder="이름을 입력해주세요"
            error="이름은 빈 공백일 수 없습니다"
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Input
            label="이름"
            placeholder="이름을 입력해주세요"
            help="고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다."
          />
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
          <Radio
            name={name}
            value={'item1'}
            options={['item1', 'item2', 'item3']}
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <GenderSelector label="성별" value="MALE" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <ConfirmSelector
            placeholder="예약자와 투숙자가 다릅니다"
            value={false}
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <ConfirmSelector
            centered
            placeholder="예약자와 투숙자가 다릅니다"
            value={true}
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Textarea placeholder="핸드폰 번호를 입력해주세요" />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Textarea label="유의사항" placeholder="핸드폰 번호를 입력해주세요" />
        </Container>
      </div>
    )
  }
}
