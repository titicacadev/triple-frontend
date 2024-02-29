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
      css={{ ...(textColor && { color: textColor }) }}
      {...omitColorCssProp(props)}
    >
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon color={textColor} />
        <span>{alternativeText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </Bubble>
  )
}

function omitColorCssProp(
  props: Omit<
    BlindedBubbleProp,
    'my' | 'parentMessage' | 'alternativeText' | 'textColor'
  >,
) {
  const copiedProps = { ...props }
  if (copiedProps.css) {
    if (typeof copiedProps.css === 'object' && 'color' in copiedProps.css) {
      delete copiedProps.css.color
    }
  }
  return copiedProps
}
