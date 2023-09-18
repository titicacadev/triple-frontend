import { Color } from '@titicaca/color-palette'
import { FlexBox, Text } from '@titicaca/core-elements'

import { useChat } from '../chat'
import { CustomerBookingStatus, ProductItem } from '../types'

import { TextBubble } from './text'
import {
  Badge,
  ProductHr,
  ProductImage,
  ProductInfo,
  ProductName,
} from './elements'

interface ProductBubbleProps {
  my: boolean
  product: ProductItem
}

const PRODUCT_BADGE_COLOR: Record<CustomerBookingStatus, Color> = {
  BOOKED: 'blue',
  ONGOING: 'blue',
  COMPLETED: 'mint',
  CANCEL_REQUESTED: 'gray300',
  CANCELED: 'gray300',
}

const PRODUCT_BADGE_LABEL: Record<CustomerBookingStatus, string> = {
  BOOKED: '예약접수',
  ONGOING: '예약진행중',
  COMPLETED: '예약확정',
  CANCEL_REQUESTED: '예약취소중',
  CANCELED: '예약취소',
}

export const ProductBubble = ({ my, product }: ProductBubbleProps) => {
  const { textBubbleFontSize, textBubbleMaxWidthOffset } = useChat()
  const {
    customerBookingStatus,
    productName,
    productThumbnail,
    itemName,
    optionName,
    dateOfUse,
    bookingId,
  } = product

  return (
    <TextBubble
      my={my}
      size={textBubbleFontSize}
      maxWidthOffset={textBubbleMaxWidthOffset}
      margin={my ? { left: 8 } : undefined}
    >
      {customerBookingStatus && (
        <Badge backgroundColor={PRODUCT_BADGE_COLOR[customerBookingStatus]}>
          {PRODUCT_BADGE_LABEL[customerBookingStatus]}
        </Badge>
      )}

      <FlexBox
        flex
        gap="16px"
        alignItems="flex-start"
        justifyContent="space-between"
        css={{ width: '100%', margin: '6px 0' }}
      >
        <FlexBox
          flex
          gap="6px"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="column"
        >
          <ProductName color="gray" size={15}>
            {productName}
          </ProductName>
          {itemName && (
            <Text color="gray700" size={13}>
              {itemName}
            </Text>
          )}
        </FlexBox>

        <ProductImage src={productThumbnail} alt="상품 사진" />
      </FlexBox>

      {(optionName || dateOfUse || bookingId) && (
        <ProductHr compact color="var(--color-gray50)" />
      )}

      <ProductInfo title="선택옵션" label={optionName} />
      <ProductInfo title="이용예정" label={dateOfUse} />
      <ProductInfo title="예약번호" label={bookingId?.toString()} />
    </TextBubble>
  )
}
