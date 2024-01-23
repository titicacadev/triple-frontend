import { ScrollProvider } from '../chat'

import {
  ImageBubbleProp,
  ProductBubbleProp,
  RichBubbleProp,
  TextBubbleProp,
} from './type'

import { ImageBubble, ProductBubble, RichBubble, TextBubble } from './index'

export default {
  title: 'chat / Bubble',
  decorators: [
    (Story) => (
      <ScrollProvider>
        <Story />
      </ScrollProvider>
    ),
  ],
}

export const Text = {
  render: (args: TextBubbleProp) => <TextBubble {...args} />,
  argTypes: {
    message: {
      type: 'text',
      required: true,
    },
    my: {
      type: 'boolean',
      required: true,
    },
    id: {
      type: 'string',
      required: true,
    },
  },
  args: {
    message: '안녕하세요',
    my: true,
    id: 'text_bubble',
    parentMessage: {
      id: 'parent_message',
      type: 'text',
      blinded: false,
      value: { message: '안녕하세요' },
      sender: {
        name: '트리플',
        unregistered: false,
      },
    },
  },
}

export const Product = {
  render: (args: ProductBubbleProp) => <ProductBubble {...args} />,
  args: {
    my: false,
    product: {
      customerBookingStatus: 'ONGOING',
      productName: '상품 이름',
      productThumbnail:
        'https://media.triple.guide/triple-cms/c_limit,f_auto,w_1024/3ec44da6-ef5f-4804-bdd8-ab9aebc28e2b.jpeg',
      itemName: '아이템 이름',
    },
    id: 'product_bubble',
  },
}

export const Rich = {
  render: (args: RichBubbleProp) => <RichBubble {...args} />,
  args: {
    my: false,
    blocks: [
      {
        type: 'text',
        message: `안녕하세요.
    TNA_BPM입니다. 고객님의 투어·티켓 예약이 확정되었습니다.
    
    • 예약번호: 1111
    • 예약상품: [멀티리전_테스트][부산/가평/통영] 유효기간 상품 | 차량 이용권
    • 예약옵션: 성인x1
    
    예약한 날짜에 TNA_BPM 팀과 만나 투어확정서를 제시해주세요.
    투어확정서의 상세한 내용은 [트리플 앱 > 내 예약 > 예약번호 1111]에서 확인하실 수 있습니다.
    궁금한 점이 있으시면 TNA_BPM 문의를 편하게 이용해주세요.
    `,
      },
      {
        type: 'button',
        label: '예약상세 바로가기',
        action: { param: 'link', type: 'link' },
      },
    ],
    cloudinaryBucket: 'triple-dev',
    mediaBaseUrl: '',
    id: 'rich_bubble',
  },
}

export const Image = {
  render: (args: ImageBubbleProp) => <ImageBubble {...args} />,
  args: {
    images: [
      {
        id: 'test image',
        sizes: {
          large: {
            url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
          },
        },
      },
    ],
    appUrlScheme: '',
  },
}
