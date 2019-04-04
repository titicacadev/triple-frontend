import '@babel/polyfill'
import React, { PureComponent } from 'react'
import Form from './Form'

export default class App extends PureComponent {
  render() {
    return (
      <Form
        initialValues={{
          name: 'aaaaaa',
          gender: 'MALE',
          passport: {
            firstname: 'asdasd',
            lastname: '',
          },
          check: false,
          item: '',
        }}
      />
    )
  }
}
