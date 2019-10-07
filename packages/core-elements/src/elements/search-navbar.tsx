import * as React from 'react'
import InputMask, { InputState, MaskOptions } from 'react-input-mask'
import styled from 'styled-components'
import Navbar from './navbar'

const InputText = styled(InputMask)`
  margin-left: 4px;
  margin-top: 6px;
  height: 19px;
  font-size: 16px;
  width: calc(100vw - 130px);
  border-style: none;
`

const DeleteIcon = styled(Navbar.Item)<{ visible: boolean }>`
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
    <Navbar>
      <Navbar.Item floated="left" icon="back" onClick={onBackClick} />
      <InputText
        placeholder={inputPlaceholder}
        onChange={(e) => onInputChange(e, e.target.value)}
        {...props}
      />
      <DeleteIcon
        floated="right"
        icon="delete"
        onClick={onDeleteClick}
        visible={!!props.value}
      />
    </Navbar>
  )
}
