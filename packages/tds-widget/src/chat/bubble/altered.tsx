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
  const alteredCSS = {
    margin: my ? '0 0 0 8px' : undefined,
    ...(textColor && { color: textColor }),
  }
  return (
    <Bubble my={my} {...props} css={alteredCSS}>
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon color={textColor} />
        <span>{alternativeText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </Bubble>
  )
}
