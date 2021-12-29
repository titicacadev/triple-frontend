import Author from '@titicaca/author'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'author / Author',
  component: Author,
} as Meta

export const Basic: StoryObj = {
  args: {
    source: {
      name: '에디터가있을때',
      bio: '여행이 좋아 디지털 노마드로 전세계를 떠돌며\n일을하고 있습니다. budim@gmail.com',
      image: {
        id: '568dea0a-c04a-403a-84c8-ae5171878c6a',
        sizes: {
          full: {
            url: 'https://res.cloudinary.com/triple-dev/image/upload/w_2048,h_2048,c_limit,f_auto/568dea0a-c04a-403a-84c8-ae5171878c6a.jpg',
          },
          large: {
            url: 'https://res.cloudinary.com/triple-dev/image/upload/w_1024,h_1024,c_limit,f_auto/568dea0a-c04a-403a-84c8-ae5171878c6a.jpg',
          },
          small_square: {
            url: 'https://res.cloudinary.com/triple-dev/image/upload/w_256,h_256,c_fill,f_auto/568dea0a-c04a-403a-84c8-ae5171878c6a.jpg',
          },
        },
        width: 640,
        height: 427,
      },
      intro: {
        rawHTML:
          '<p>자주 여행을 꿈꾸고, 이따금씩 순간을 톺아보려 합니다.<br><a href="https://www.naver.com">www.instagram.com/romi1403</a></p>',
      },
    },
    bioOverride: '',
  },
}
