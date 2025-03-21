import {
  Container as BaseContainer,
  maxLinesMixin,
  Text,
} from '@titicaca/tds-ui'
import styled, { css } from 'styled-components'

const RESERVATION_INFO_MIN_CONTENT_HEIGHT = 62

export const LayoutContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
`

export const Container = styled(BaseContainer)`
  padding: 11px 15px;
  box-shadow: 0 0 20px 0
    ${({ theme }) => theme.reservationInfo.shadow || 'rgba(0, 0, 0, 0.07)'};
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => theme.reservationInfo.border || 'rgba(234, 234, 234, 1)'};
  background-color: ${({ theme }) =>
    theme.reservationInfo.background || 'rgba(255, 255, 255, 1)'};
  margin: 8px 15px 0;
`

export const Details = styled.dl<{ expanded: boolean }>`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;

  > div {
    display: flex;
    align-items: flex-start;

    dt {
      flex-shrink: 0;
      color: ${({ theme }) =>
        theme.reservationInfo.detail.label || 'rgba(41, 41, 45, 0.5)'};
      margin-right: 14px;
      width: 42px;
    }

    dd {
      display: inline;
      color: ${({ theme }) =>
        theme.reservationInfo.detail.value || 'rgba(41, 41, 45, 0.6)'};
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

export const ContentContainer = styled(BaseContainer)<{ expanded: boolean }>`
  max-height: ${({ expanded }) =>
    expanded ? 'none' : `${RESERVATION_INFO_MIN_CONTENT_HEIGHT}px`};
  overflow: hidden;
  display: flex;
  flex-direction: row;

  &:not(:has(${Details})) {
    align-items: center;
  }
`

export const Thumbnail = styled.img<{ small?: boolean }>`
  width: ${({ small = false }) => (small ? '32' : '42')}px;
  height: ${({ small = false }) => (small ? '32' : '42')}px;
  border-radius: 6px;
  margin-right: 12px;
`

export const DetailContainer = styled(BaseContainer)`
  flex: 1;
`

export const TitleContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  gap: 6px;
`

export const Title = styled(Text).attrs<{ expanded: boolean }>(
  ({ expanded }) => ({
    size: 14,
    lineHeight: '19px',
    maxLines: expanded ? 2 : 1,
    bold: true,
  }),
)`
  padding-top: 2px;
  color: ${({ theme }) => theme.reservationInfo.title || 'rgba(41, 41, 45, 1)'};
  flex-grow: 1;
`

export const ArrowButton = styled.button.attrs({ type: 'button' })<{
  expanded: boolean
}>`
  margin-top: 5px;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  background: url('https://tour-web-assets.interparkcdn.net/assets/btms/web/icon/arrow-down.png')
    no-repeat center;
  background-size: 12px 12px;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
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
        theme.reservationInfo.label[color].background || 'transparent'};
      color: ${({ theme }) =>
        theme.reservationInfo.label[color].color || 'inherit'};
    `}
`
