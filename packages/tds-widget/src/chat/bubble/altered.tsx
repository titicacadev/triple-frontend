import { FlexBox } from '@titicaca/tds-ui'

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
      css={{
        margin: my ? '0 0 0 8px' : undefined,
        ...(textColor && { color: textColor }),
      }}
      {...props}
    >
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon color={textColor} />
        <span>{alternativeText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </Bubble>
  )
}
