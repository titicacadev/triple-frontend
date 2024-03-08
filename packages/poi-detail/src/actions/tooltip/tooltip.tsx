import { Tooltip as CoreTooltip } from '@titicaca/core-elements'
import styled from 'styled-components'
import { MouseEventHandler } from 'react'

const StyledTooltip = styled(CoreTooltip)`
  width: max-content;
  padding: 9px 15px 8px;
  transform: translateX(-50%);
  left: 50%;
  cursor: default;

  &::after {
    transform: translateX(-50%);
    left: 50%;
  }
`

export default function Tooltip({
  label,
  onClick,
}: {
  label: string
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  return (
    <div onClick={onClick} role="presentation">
      <StyledTooltip
        label={label}
        pointing={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        nowrap={false}
        borderRadius="16.17"
        backgroundColor="var(--color-blue)"
        positioning={{ top: -26 }}
      />
    </div>
  )
}
