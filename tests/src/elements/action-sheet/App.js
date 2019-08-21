import React, { PureComponent } from 'react'
import ActionSheet from '@titicaca/triple-design-system/lib/elements/action-sheet'

export default class App extends PureComponent {
  constructor() {
    super()

    this.state = { open: true }
  }

  render() {
    return (
      <div className="action-sheet-container">
        <ActionSheet
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <ActionSheet.Item>아이템</ActionSheet.Item>
        </ActionSheet>
      </div>
    )
  }
}
