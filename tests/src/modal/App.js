import React, { PureComponent } from 'react'
import { Text } from '@titicaca/triple-design-system'
import { Modal } from '@titicaca/modals'

export default class App extends PureComponent {
  constructor() {
    super()

    this.state = { open: true }
  }

  render() {
    return (
      <div className="modal-container">
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <Text
            center
            size="large"
            lineHeight={1.38}
            color="gray"
            padding={{ top: 40, bottom: 40, left: 30, right: 30 }}
          >
            삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
          </Text>

          <Modal.Actions>
            <Modal.Action
              color="gray"
              onClick={() => this.setState({ open: false })}
            >
              취소
            </Modal.Action>
            <Modal.Action
              color="blue"
              onClick={() => this.setState({ open: false })}
            >
              확인
            </Modal.Action>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
