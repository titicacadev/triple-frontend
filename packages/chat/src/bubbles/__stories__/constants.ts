import { MetaDataInterface } from '../../types'

import { ChatContextValue } from '@titicaca/chat'

export const SAMPLE_IMAGES: MetaDataInterface[] = [
  {
    cloudinaryId: '70c9db60-cd42-49c3-b6a8-274318695cc2',
    width: 1024,
    height: 1024,
    cloudinaryBucket: '',
    id: '1',
    type: '',
    sizes: {
      full: {
        url: '',
      },
      large: {
        url: '',
      },
      smallSquare: {
        url: '',
      },
    },
  },
]

const empty = () => {}

export const MEDIA_ARGS: ChatContextValue = {
  cloudinaryName: 'triple-cms',
  mediaUrlBase: 'https://media.triple.guide',
  textBubbleFontSize: 'medium',
  textBubbleMaxWidthOffset: 100,
  onRichBubbleButtonBeforeRouting: empty,
  onImageBubbleClick: empty,
  onTextBubbleClick: empty,
}
