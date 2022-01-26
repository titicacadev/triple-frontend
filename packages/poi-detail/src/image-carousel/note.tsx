import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'

const NoteContainer = styled.div<{ warning?: boolean; borderRaidus?: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: ${({ warning }) => (warning ? '#ff3636' : '#2987f0')};

  & > div {
    margin: 0 13px;
    line-height: 40px;
  }

  ${({ borderRaidus }) =>
    borderRaidus &&
    css`
      border-bottom-left-radius: ${borderRaidus}px;
      border-bottom-right-radius: ${borderRaidus}px;
    `}
  z-index: 2;
`

export function PermanentlyClosedNote({
  borderRadius = 6,
}: {
  borderRadius?: number
}) {
  return (
    <NoteContainer warning borderRaidus={borderRadius}>
      <Text bold size="small" color="white">
        더이상 운영하지 않습니다.
      </Text>
    </NoteContainer>
  )
}

export function BusinessHoursNote({
  borderRadius = 6,
  currentBusinessHours,
  todayBusinessHours,
  onClick,
}: {
  borderRadius?: number
  currentBusinessHours?:
    | string
    | { from: number; to: number; dayOfWeek: number }
  todayBusinessHours?: string
  onClick: () => void
}) {
  return (
    <NoteContainer
      onClick={onClick}
      warning={!currentBusinessHours}
      borderRaidus={borderRadius}
    >
      <Text bold size="small" color="white">
        {currentBusinessHours
          ? `영업중 ${todayBusinessHours || ''}`
          : todayBusinessHours
          ? `영업준비중 ${todayBusinessHours}`
          : '휴무일'}
      </Text>
    </NoteContainer>
  )
}
