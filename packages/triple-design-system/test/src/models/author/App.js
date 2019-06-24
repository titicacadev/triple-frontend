import React, { PureComponent } from 'react'
import { Author } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    const author = {
      source: {
        image: {
          sizes: {
            large: {
              url:
                'https://res.cloudinary.com/triple-dev/image/upload/w_1024,h_1024,c_limit/16e30680-ea16-402e-86b0-f781d48fb90b.jpg',
            },
          },
        },
        name: '에디터가있을때',
        description:
          '여행이 좋아 디지털 노마드로 전세계를 떠돌며\n일을하고 있습니다. budim@gmail.com',
      },
    }

    return <Author {...author} />
  }
}
