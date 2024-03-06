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
  const alteredCSS = {
    margin: my ? '0 0 0 8px' : undefined,
    ...(textColor && { color: textColor }),
  }
  return (
    <Bubble my={my} css={alteredCSS} {...props}>
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon color={textColor} />
        <span>{alternativeText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </Bubble>
  )
}
