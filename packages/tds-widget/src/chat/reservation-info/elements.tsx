import {
  Container as BaseContainer,
  maxLinesMixin,
  Text,
} from '@titicaca/tds-ui'
import styled, { css } from 'styled-components'

const RESERVATION_INFO_MIN_CONTENT_HEIGHT = 40
const PRODUCT_INFO_MIN_CONTENT_HEIGHT = 21

export const Container = styled(BaseContainer)`
  padding: 12px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.nol.colorNeutralG10};
  background-color: ${({ theme }) => theme.nol.colorNeutralW100};
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
      color: ${({ theme }) => theme.nol.colorNeutralB50};
      margin-right: 8px;
      width: 42px;
    }

    dd {
      display: inline;
      color: ${({ theme }) => theme.nol.colorNeutralB60};
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
  color: ${({ theme }) => theme.nol.colorNeutralB100};
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

  ${({ color, theme: { nol = {} } }) =>
    color && getLabelColorVariants(color, nol)}
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLabelColorVariants(color: LabelColor, nolTheme: any) {
  let colorVariants: {
    backgroundColor?: string
    color?: string
  } = {}

  switch (color) {
    case 'blue':
      colorVariants = {
        backgroundColor: 'rgba(65, 84, 255, 0.1)',
        color: nolTheme.colorPrimaryNol,
      }
      break
    case 'red':
      colorVariants = {
        backgroundColor: 'rgba(255, 50, 46, 0.1)',
        color: nolTheme.colorPrimaryRed,
      }
      break
    case 'gray':
      colorVariants = {
        backgroundColor: nolTheme.colorNeutralG5,
        color: nolTheme.colorNeutralB60,
      }
      break
  }

  return css`
    background-color: ${colorVariants.backgroundColor || 'transparent'};
    color: ${colorVariants.color || 'inherit'};
  `
}
