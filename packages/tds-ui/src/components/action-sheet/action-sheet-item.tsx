import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'

import { useActionSheet } from './action-sheet-context'

export const ActionItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
`

const ItemText = styled.div<{ checked?: boolean }>`
  flex: 1;
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
  display: block;
  height: 30px;
  line-height: 30px;
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
  notice: 'https://assets.triple.guide/images/img-action-notice@4x-v2.png',
  url: 'https://assets.triple.guide/images/img-action-url.png',
  phonecall: 'https://assets.triple.guide/images/img-action-phonecall.png',
  plus: 'https://assets.triple.guide/images/partners-center/img-action-plus.svg',
}

const CHECKED_ICON_URL = 'https://assets.triple.guide/images/checkbox-on.svg'

const ItemIcon = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  margin-right: 9px;
`

const CheckedIcon = styled.div`
  margin-right: -5px;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;
  background-image: url(${CHECKED_ICON_URL});
  background-repeat: none;
`

export interface ActionSheetItemProps extends PropsWithChildren {
  buttonLabel?: string
  icon?: string
  checked?: boolean
  onClick?: () => unknown
}

export const ActionSheetItem = ({
  children,
  buttonLabel,
  icon,
  checked,
  onClick,
  ...props
}: ActionSheetItemProps) => {
  const { onClose } = useActionSheet()

  const handleClick = () => {
    onClick ? !onClick() && onClose?.() : onClose?.()
  }

  return (
    <ActionItemContainer
      onClick={buttonLabel ? undefined : handleClick}
      {...props}
    >
      {icon ? <ItemIcon src={URL_BY_NAMES[icon]} /> : null}
      <ItemText checked={checked}>{children}</ItemText>
      {buttonLabel ? (
        <ItemButton onClick={handleClick}>{buttonLabel}</ItemButton>
      ) : null}
      {checked ? <CheckedIcon /> : null}
    </ActionItemContainer>
  )
}
