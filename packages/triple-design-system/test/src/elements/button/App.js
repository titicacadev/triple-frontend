import React, { PureComponent } from 'react'
import { Button } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Button.Group className="default-button-group">
          <Button icon="save">저장하기</Button>
          <Button icon="schedule">일정추가</Button>
        </Button.Group>

        <Button.Group
          horizontalGap={50}
          className="button-group-horizontal-gap"
        >
          <Button icon="save">저장하기</Button>
          <Button icon="schedule">일정추가</Button>
        </Button.Group>
      </div>
    )
  }
}
