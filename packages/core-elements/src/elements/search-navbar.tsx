import * as React from 'react'
import InputMask, { InputState, MaskOptions } from 'react-input-mask'
import styled from 'styled-components'

import Navbar from './navbar'

const InputText = styled(InputMask)`
  border-style: none;
  font-size: 17px;
  height: 19px;
  margin: 6px 34px 0 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 68px);
`

const MainNavbarFrame = styled(Navbar.NavbarFrame)`
  height: 58px;
  padding: 12px;
  position: relative;
`

const Back = styled(Navbar.Item)`
  float: none;
  margin-right: 0px;
  position: absolute;
`

const DeleteIcon = styled(Navbar.Item)<{ visible: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  margin-right: 0px;
  float: none;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

export default function SearchNavbar({
  inputPlaceholder,
  onBackClick,
  onDeleteClick,
  onInputChange,
  ...props
}: {
  inputPlaceHolder: string
  onBackClick: (event: React.SyntheticEvent) => any
  onDeleteClick?: (event: React.SyntheticEvent) => any
  onInputChange?: (e: React.SyntheticEvent, value: string) => any
} & InputState &
  MaskOptions) {
  return (
    <MainNavbarFrame>
      <Back icon="back" onClick={onBackClick} />
      <InputText
        placeholder={inputPlaceholder}
        onChange={(e) => onInputChange(e, e.target.value)}
        {...props}
      />
      <DeleteIcon
        icon="delete"
        onClick={onDeleteClick}
        visible={!!props.value}
      />
    </MainNavbarFrame>
  )
}
