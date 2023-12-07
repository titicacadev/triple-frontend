import styled, { css } from 'styled-components'
import {
  FlexBox,
  HR1,
  HrProps,
  MarginPadding,
  Text,
  formatMarginPadding,
} from '@titicaca/tds-ui'
import { Theme } from '@titicaca/tds-theme'

interface BadgeProps {
  backgroundColor?: keyof Theme['colors']
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
  width: 100%;
  font-weight: 700;
  text-overflow: ellipsis;
`

export const ProductImage = styled.img`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
`

export const ProductHr = styled(HR1)<HrProps>`
  margin: 12px 0;
`

export const ProductInfo = ({
  title,
  label,
}: {
  title: string
  label?: string
}) => {
  return (
    <>
      {label && (
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
          <Text color="gray500" size={13} css={{ minWidth: '47px' }}>
            {title}
          </Text>
          <Text
            color="gray700"
            size={13}
            css={{ maxWidth: 'calc(100% - 47px)' }}
          >
            {label}
          </Text>
        </FlexBox>
      )}
    </>
  )
}
