import styled, { css } from 'styled-components'
import {
  MarginPadding,
  formatMarginPadding,
  Text,
  HR1,
  FlexBox,
  HrProps,
} from '@titicaca/core-elements'
import { Color } from '@titicaca/color-palette'

interface BadgeProps {
  backgroundColor?: Color
  margin?: MarginPadding
}

export const Badge = styled.span<BadgeProps>`
  display: inline-block;
  font-size: 11px;
  height: 20px;
  line-height: 20px;
  padding: 0 5px;
  color: var(--color-white);
  font-weight: 700;
  border-radius: 2px;
  ${({ margin }) => formatMarginPadding(margin, 'margin')}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: var(--color-${backgroundColor});`}
`

export const ProductName = styled(Text)`
  font-weight: 700;
  text-overflow: ellipsis;
`

export const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`

export const ProductHr = styled(HR1)<HrProps>`
  margin: 12px 0;
`

export const ProductInfo = ({
  title,
  label,
}: {
  title: string
  label: string
}) => {
  return (
    <FlexBox
      flex
      alignItems="flex-start"
      gap="10px"
      css={css`
        & + & {
          margin-top: 4px;
        }
      `}
    >
      <Text color="gray500" size={13}>
        {title}
      </Text>
      <Text color="gray700" size={13}>
        {label}
      </Text>
    </FlexBox>
  )
}
