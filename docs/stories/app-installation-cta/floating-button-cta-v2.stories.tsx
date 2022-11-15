import { FloatingButtonCtaV2 } from '@titicaca/app-installation-cta'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'app-installation-cta / FloatingButtonCTAV2',
  component: FloatingButtonCtaV2,
} as Meta

export const Basic: ComponentStoryObj<typeof FloatingButtonCtaV2> = {
  name: '트리플 앱 설치하기 ',
  args: {
    appInstallLink: 'https://triple.onelink.me/aZP6/21d43a81',
    fixed: true,
    title: '제목을 입력하세요.',
    description: '설명 텍스트가 들어갑니다.',
  },
}
