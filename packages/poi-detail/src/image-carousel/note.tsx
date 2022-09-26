import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'

const NoteContainer = styled.div<{
  warning?: boolean
  bottomBorderRadius?: number
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: ${({ warning }) => (warning ? '#ff3636' : '#2987f0')};
  z-index: 2;

  & > div {
    margin: 0 13px;
    line-height: 40px;
  }

  ${({ bottomBorderRadius }) =>
    bottomBorderRadius
      ? css`
          border-bottom-left-radius: ${bottomBorderRadius}px;
          border-bottom-right-radius: ${bottomBorderRadius}px;
        `
      : null}
`

interface PermanetlyCloseNoteProps {
  bottomBorderRadius?: number
}

export function PermanentlyClosedNote({
  bottomBorderRadius = 6,
}: PermanetlyCloseNoteProps) {
  return (
    <NoteContainer warning bottomBorderRadius={bottomBorderRadius}>
      <Text bold size="small" color="white">
        더이상 운영하지 않습니다.
      </Text>
    </NoteContainer>
  )
}

interface BusinessHourNoteProps {
  bottomBorderRadius?: number
  currentBusinessHours?:
    | string
    | {
        from: number
        to: number
        dayOfWeek: number
      }
  todayBusinessHours?: string
  onClick: () => void
}

export function BusinessHoursNote({
  bottomBorderRadius = 6,
  currentBusinessHours,
  todayBusinessHours,
  onClick,
}: BusinessHourNoteProps) {
  return (
    <NoteContainer
      onClick={onClick}
      warning={!currentBusinessHours}
      bottomBorderRadius={bottomBorderRadius}
    >
      <Text bold size="small" color="white">
        {currentBusinessHours
          ? `영업중 ${todayBusinessHours}`
          : todayBusinessHours
          ? `영업준비중 ${todayBusinessHours}`
          : '휴무일'}
      </Text>
    </NoteContainer>
  )
}
