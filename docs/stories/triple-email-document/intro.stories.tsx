import { ComponentMeta } from '@storybook/react'
import { EmailIntro } from '@titicaca/triple-email-document'

export default {
  component: EmailIntro,
  title: 'Document / triple-email-document / components',
  argsTypes: {
    image: {
      type: 'string',
    },
    gretting: {
      type: 'string',
    },
    introText: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof EmailIntro>

export const DefaultNewsletterIntro = {
  storyName: '뉴스레터 소개 ',
  args: {
    image:
      'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
    greeting: '안녕하세요 \n트리플님',
    introText: '간단한 여행 소개글입니다.',
  },
}

DefaultNewsletterIntro.storyName = '뉴스레터 소개'
