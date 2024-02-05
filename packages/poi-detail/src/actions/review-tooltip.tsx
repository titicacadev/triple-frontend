import { Tooltip as CoreTooltip } from '@titicaca/core-elements'
import { useLocalStorage } from '@titicaca/react-hooks'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Tooltip = styled(CoreTooltip)`
  width: max-content;
  padding: 9px 15px 8px;
  transform: translateX(-50%);
  left: 50%;

  &::after {
    transform: translateX(-50%);
    left: 50%;
  }
`

const REVIEW_TOOLTIP_EXPOSED = 'REVIEW_TOOLTIP_EXPOSED'

export default function ReviewTooltip() {
  const [isReviewTooltipExposed, setIsReviewTooltipExposed] = useLocalStorage(
    REVIEW_TOOLTIP_EXPOSED,
  )

  const isReviewTooltipExposedCopy = useRef(isReviewTooltipExposed)

  useEffect(() => {
    setIsReviewTooltipExposed('true')
  }, [])

  useEffect(() => {
    if (isReviewTooltipExposedCopy.current === null) {
      isReviewTooltipExposedCopy.current = isReviewTooltipExposed
    }
  }, [isReviewTooltipExposed])

  return isReviewTooltipExposedCopy.current !== 'true' ? (
    <Tooltip
      label="이제 영상도 올릴 수 있어요!"
      pointing={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      nowrap={false}
      borderRadius="16.17"
      backgroundColor="var(--color-blue)"
      positioning={{ top: -26 }}
    />
  ) : null
}
