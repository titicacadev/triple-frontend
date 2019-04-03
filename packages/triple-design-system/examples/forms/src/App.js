import '@babel/polyfill'
import React, { PureComponent } from 'react'
import Form from './Form'

export default class App extends PureComponent {
  render() {
    return (
      <Form
        initialValues={{
          name: '',
          gender: 'MALE',
          passport: {
            firstname: '',
            lastname: '',
          },
        }}
      />
    )
  }
}
