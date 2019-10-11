import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Author from '@titicaca/author'
import { HR2 } from '@titicaca/core-elements'

import Sample from './author.sample.json'

storiesOf('Author', module).add('일반', () => (
  <>
    <HR2 margin={{ top: 30 }} />
    <Author
      source={{
        name: text('이름', '에디터가있을때'),
        bio: text(
          '소개',
          '여행이 좋아 디지털 노마드로 전세계를 떠돌며\n일을하고 있습니다. budim@gmail.com',
        ),
        image: {
          id: '568dea0a-c04a-403a-84c8-ae5171878c6a',
          sizes: {
            full: {
              url:
                'https://res.cloudinary.com/triple-dev/image/upload/w_2048,h_2048,c_limit,f_auto/568dea0a-c04a-403a-84c8-ae5171878c6a.jpg',
            },
            large: {
              url:
                'https://res.cloudinary.com/triple-dev/image/upload/w_1024,h_1024,c_limit,f_auto/568dea0a-c04a-403a-84c8-ae5171878c6a.jpg',
            },
            small_square: {
              url:
                'https://res.cloudinary.com/triple-dev/image/upload/w_256,h_256,c_fill,f_auto/568dea0a-c04a-403a-84c8-ae5171878c6a.jpg',
            },
          },
          width: 640,
          height: 427,
        },
        intro: '자주 여행을 꿈꾸고, 이따금씩 순간을 톺아보려 합니다.',
      }}
      bioOverride={text('소개 덮어쓰기', '')}
      authorContents={Sample.authorContents}
      onClick={action('onClick')}
      onAuthorContentClick={action('onAuthorContentClick')}
    />
  </>
))
