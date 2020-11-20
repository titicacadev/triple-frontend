import React from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

const NoteContainer = styled.div<{ warning?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: ${({ warning }) => (warning ? '#ff3636' : '#2987f0')};
  border-radius: 0 0 6px 6px;
  & > div {
    margin: 0 13px;
    line-height: 40px;
  }
`

export function PermanentlyClosedNote() {
  return (
    <Container position="relative">
      <NoteContainer warning>
        <Text bold size="small" color="white">
          더이상 운영하지 않습니다.
        </Text>
      </NoteContainer>
    </Container>
  )
}

export function BusinessHoursNote({
  currentBusinessHours,
  todayBusinessHours,
  onClick,
}: {
  currentBusinessHours?:
    | string
    | { from: number; to: number; dayOfWeek: number }
  todayBusinessHours?: string
  onClick: () => void
}) {
  return (
    <Container position="relative">
      <NoteContainer onClick={onClick} warning={!currentBusinessHours}>
        <Text bold size="small" color="white">
          {currentBusinessHours
            ? `영업중 ${todayBusinessHours || ''}`
            : todayBusinessHours
            ? `영업준비중 ${todayBusinessHours}`
            : '휴무일'}
        </Text>
      </NoteContainer>
    </Container>
  )
}
