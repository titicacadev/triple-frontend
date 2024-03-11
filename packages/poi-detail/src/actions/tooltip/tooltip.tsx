import { Tooltip as CoreTooltip } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'
import { ComponentProps, MouseEventHandler, useEffect, useState } from 'react'

type Position = 'top' | 'bottom'

const StyledTooltip = styled(CoreTooltip)<{ position: Position }>`
  width: max-content;
  padding: 9px 15px 8px;
  transform: translateX(-50%);
  left: 50%;
  cursor: default;
  ${({ position }) =>
    position === 'bottom' &&
    css`
      top: 100%;
    `}

  &::before {
    transform: translateX(-50%);
    left: 50%;
  }

  &::after {
    transform: translateX(-50%);
    left: 50%;
  }
`

type CoreTooltipProps = ComponentProps<typeof CoreTooltip>

function getPointing(position: Position): CoreTooltipProps['pointing'] {
  if (position === 'top') {
    return {
      vertical: 'bottom',
      horizontal: 'right',
    }
  }
  if (position === 'bottom') {
    return {
      vertical: 'top',
      horizontal: 'right',
    }
  }
}

export default function Tooltip({
  localStorageKey,
  label,
  position = 'top',
  onClick,
}: {
  localStorageKey: string
  label: string
  position?: Position
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  useEffect(() => {
    localStorage.setItem(localStorageKey, 'true')
  }, [])

  return (
    <div onClick={onClick} role="presentation">
      <StyledTooltip
        label={label}
        pointing={getPointing(position)}
        nowrap={false}
        borderRadius="16.17"
        backgroundColor="var(--color-blue)"
        position={position}
        positioning={{ top: -26 }}
      />
    </div>
  )
}

export function useLocalStorageTooltip(key: string) {
  const [value, setValue] = useState(true)

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem(key) || 'false') as boolean)
  }, [])

  return value
}
