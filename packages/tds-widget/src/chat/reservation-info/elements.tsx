import {
  Container as BaseContainer,
  maxLinesMixin,
  Text,
} from '@titicaca/tds-ui'
import styled, { css } from 'styled-components'

import { reservationInfoTheme } from './theme-provider'

const RESERVATION_INFO_MIN_CONTENT_HEIGHT = 40
const PRODUCT_INFO_MIN_CONTENT_HEIGHT = 21

export const Container = styled(BaseContainer)`
  padding: 12px;
  box-shadow: 0 0 20px 0
    ${({ theme }) =>
      (theme.reservationInfo || reservationInfoTheme).shadowColor};
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) =>
      (theme.reservationInfo || reservationInfoTheme).borderColor};
  background-color: ${({ theme }) =>
    (theme.reservationInfo || reservationInfoTheme).backgroundColor};
  margin: 8px 15px 0;
`

export const Details = styled.dl<{ expanded: boolean }>`
  margin-top: ${({ expanded }) => (expanded ? '4px' : '1.5px')};
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;

  > div {
    display: flex;
    align-items: flex-start;

    dt {
      flex-shrink: 0;
      color: ${({ theme }) =>
        (theme.reservationInfo || reservationInfoTheme).detail.labelColor};
      margin-right: 8px;
      width: 42px;
    }

    dd {
      display: inline;
      color: ${({ theme }) =>
        (theme.reservationInfo || reservationInfoTheme).detail.valueColor};
      ${({ expanded }) => !expanded && maxLinesMixin({ maxLines: 1 })}

      & + dd {
        &::before {
          content: '';
          display: inline-block;
          margin: 0 8px;
          width: 1px;
          height: 8px;
          background-color: #ddd;
        }
      }
    }
  }
`

export const ContentContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  position: relative;
`

export const Thumbnail = styled.img<{ small?: boolean }>`
  width: ${({ small = false }) => (small ? '30' : '40')}px;
  height: ${({ small = false }) => (small ? '30' : '40')}px;
  border-radius: 6px;
  margin-right: 12px;
`

export const DetailContainer = styled(BaseContainer)<{ expanded: boolean }>`
  max-height: ${({ expanded }) =>
    expanded ? 'none' : `${PRODUCT_INFO_MIN_CONTENT_HEIGHT}px`};
  overflow: hidden;
  flex: 1;

  &:has(${Details}) {
    max-height: ${({ expanded }) =>
      expanded ? 'none' : `${RESERVATION_INFO_MIN_CONTENT_HEIGHT}px`};
  }
`

export const ArrowButton = styled.button.attrs({ type: 'button' })<{
  expanded: boolean
}>`
  position: absolute;
  right: 0;
  width: 12px;
  height: 12px;
  display: flex;

  & > svg {
    transform: rotate(${({ expanded }) => (expanded ? '0deg' : '180deg')});
  }
`

export const TitleContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  gap: 16px;

  &:has(${ArrowButton}) {
    padding-right: 18px;
  }
`

export const Title = styled(Text).attrs({
  size: 14,
  lineHeight: '19px',
  bold: true,
})`
  padding-top: 1.5px;
  color: ${({ theme }) =>
    (theme.reservationInfo || reservationInfoTheme).titleColor};
  flex-grow: 1;
`

export type LabelColor = 'blue' | 'red' | 'gray'

export const Label = styled(Text).attrs({
  size: 11,
  lineHeight: '16px',
  bold: true,
})<{ color?: LabelColor }>`
  flex-shrink: 0;
  padding: 3px 6px;
  border-radius: 6px;
  height: fit-content;

  ${({ color }) =>
    color &&
    css`
      background-color: ${({ theme }) =>
        (theme.reservationInfo || reservationInfoTheme).label[color]
          .backgroundColor || 'transparent'};
      color: ${({ theme }) =>
        (theme.reservationInfo || reservationInfoTheme).label[color].color ||
        'inherit'};
    `}
`
