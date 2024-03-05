import { FlexBox } from '@titicaca/core-elements'

import ExclamationMarkIcon from '../icons/ExclamationMarkIcon'

import Bubble from './bubble'
import { BlindedBubbleProp } from './type'

export default function AlteredBubble({
  my,
  parentMessage,
  alternativeText,
  textColor,
  ...props
}: BlindedBubbleProp) {
  return (
    <Bubble
      my={my}
      {...props}
      css={{
        margin: my ? '0 0 0 8px' : undefined,
        ...(textColor && { color: textColor }),
      }}
    >
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon color={textColor} />
        <span>{alternativeText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </Bubble>
  )
}
