import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import * as CSS from 'csstype'
import { CSSProps } from '@titicaca/core-elements'

import { useActionSheet } from './action-sheet-context'

export const ActionItemContainer = styled.div<CSSProps>`
  width: 100%;
  height: 54px;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  ${({ css }) => css}
`

const ItemText = styled.div<{
  width?: CSS.Property.Width<string | number>
  checked?: boolean
}>`
  display: inline-block;
  width: ${({ width }) => width || '100%'};
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: ${({ checked }) => (checked ? '#368fff' : '#3a3a3a')};
  font-weight: ${({ checked }) => (checked ? 'bold' : 'normal')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ItemButton = styled.a`
  float: right;
  height: 30px;
  line-height: 30px;
  margin-top: 11px;
  padding: 0 17px;
  border-radius: 15px;
  background-color: #fafafa;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: #3a3a3a;
`

const URL_BY_NAMES: { [key: string]: string } = {
  save: 'https://assets.triple.guide/images/img-action-save@4x.png',
  schedule: 'https://assets.triple.guide/images/img-action-schedule@4x.png',
  share: 'https://assets.triple.guide/images/img-action-share@4x.png',
  suggest: 'https://assets.triple.guide/images/img-action-suggest@4x.png',
  review: 'https://assets.triple.guide/images/img-action-review@4x.png',
  report: 'https://assets.triple.guide/images/img-action-report@4x.png',
  delete: 'https://assets.triple.guide/images/img-action-delete@4x.png',
  message: 'https://assets.triple.guide/images/img-action-message-4-x.png',
  support: 'https://assets.triple.guide/images/img-action-support@3x.png',
}

const CHECKED_ICON_URL = 'https://assets.triple.guide/images/checkbox-on.svg'

const ItemIcon = styled.img`
  float: left;
  margin-top: 12px;
  width: 30px;
  height: 30px;
  margin-right: 9px;
`

const CheckedIcon = styled.div`
  float: right;
  margin-top: 9px;
  margin-right: -5px;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;
  background-image: url(${CHECKED_ICON_URL});
  background-repeat: none;
`

export interface ActionSheetItemProps extends PropsWithChildren, CSSProps {
  buttonLabel?: string
  icon?: string
  checked?: boolean
  onClick?: () => void
}

export const ActionSheetItem = ({
  children,
  buttonLabel,
  icon,
  checked,
  onClick,
  css,
}: ActionSheetItemProps) => {
  const { onClose } = useActionSheet()

  let textWidth = '100%'
  if (buttonLabel && icon) {
    textWidth = 'calc(100% - 100px)'
  } else if (buttonLabel || checked) {
    textWidth = 'calc(100% - 60px)'
  } else if (icon) {
    textWidth = 'calc(100% - 40px)'
  }

  const handleClick = () => {
    onClick?.()
    onClose?.()
  }

  return (
    <ActionItemContainer
      onClick={buttonLabel ? undefined : handleClick}
      css={css}
    >
      {icon ? <ItemIcon src={URL_BY_NAMES[icon]} /> : null}
      <ItemText width={textWidth} checked={checked}>
        {children}
      </ItemText>
      {buttonLabel ? (
        <ItemButton onClick={handleClick}>{buttonLabel}</ItemButton>
      ) : null}
      {checked ? <CheckedIcon /> : null}
    </ActionItemContainer>
  )
}
