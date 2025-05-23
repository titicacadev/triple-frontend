import { ScrollProvider } from '../chat'

import {
  CouponBubbleProp,
  ImageBubbleProp,
  ProductBubbleProp,
  RichBubbleProp,
  TextBubbleProp,
} from './type'
import AlteredBubble from './altered'

import {
  ImageBubble,
  ProductBubble,
  RichBubble,
  TextBubble,
  CouponBubble,
} from './index'

export default {
  title: 'tds-widget / chat / Bubble',
  decorators: [
    (Story: () => JSX.Element) => (
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
        profile: { name: '트리플' },
        unregistered: false,
      },
    },
  },
}

export const FullText = {
  render: (args: TextBubbleProp) => <TextBubble {...args} />,
  args: {
    message: `탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다. 일반사면을 명하려면 국회의 동의를 얻어야 한다. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다. 재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다. 이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다. 대통령이 제1항의 기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 대통령은 법률안의 일부에 대하여 또는 법률안을 수정하여 재의를 요구할 수 없다. 모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로 정한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.`,
    my: true,
    id: 'text_bubble',
    fullTextViewAvailable: true,
    created: true,
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

export const Coupon = {
  render: (args: CouponBubbleProp) => <CouponBubble {...args} />,
  args: {
    my: false,
    coupon: {
      name: '빨리 예약하세요~ 오늘까지만 사용 가능한 쿠폰~',
      discount: {
        type: 'AMOUNT',
        value: 5000,
        maxDiscountAmount: 5000,
      },
      period: {
        startAt: '2025-05-23T00:00:00+09:00',
        endAt: '2025-05-23T23:59:59+09:00',
      },
      code: 'X9XWCGGM58N9A499',
      propertyId: '10003136',
      type: 'RANDOM',
    },
    id: 'coupon_bubble',
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
  },
}

export const Altered = {
  render: (args: React.ComponentProps<typeof AlteredBubble>) => (
    <AlteredBubble {...args} />
  ),
  args: {
    my: true,
    alternativeText: '관리자에 의해 가려진 메세지입니다.',
    textColor: 'gray',
  },
}
