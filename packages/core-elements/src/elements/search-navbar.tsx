import * as React from 'react'
import InputMask, { InputState, MaskOptions } from 'react-input-mask'
import styled from 'styled-components'

const NavbarFrame = styled.div`
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 2;
  box-shadow: 0 1px 0 0 #efefef;
  box-sizing: border-box;
  padding: 9px 12px;
`

const BackIcon = styled.div`
  float: left;
  background-image: url('https://assets.triple.guide/images/btn-com-back@4x.png');
  background-size: cover;
  height: 34px;
  width: 34px;
  margin-left: 6px;
  margin-right: 10px;
  cursor: pointer;
`

const InputText = styled(InputMask)`
  margin-top: 6px;
  height: 19px;
  font-size: 16px;
  width: calc(100vw - 130px);
  border-style: none;
`

const DeleteIcon = styled.div<{ showDeleteButton: boolean }>`
  float: right;
  background-image: url('https://assets.triple.guide/images/btn-search-close@3x.png');
  background-size: cover;
  height: 34px;
  width: 34px;
  margin-left: 6px;
  margin-right: 6px;
  cursor: pointer;
  display: ${({ showDeleteButton }) => (showDeleteButton ? 'block' : 'none')};
`

export default function SearchNavBar({
  inputPlaceHolder,
  showDeleteButton,
  onBackClick,
  onDeleteClick,
  onKeyPress,
  ...props
}: {
  inputPlaceHolder: string
  showDeleteButton: boolean
  onBackClick: (event: React.SyntheticEvent) => any
  onDeleteClick?: (event: React.SyntheticEvent) => any
  onKeyPress?: (e: React.SyntheticEvent, value: string) => any
} & InputState &
  MaskOptions) {
  return (
    <NavbarFrame>
      <BackIcon onClick={onBackClick} />
      <InputText
        placeholder={inputPlaceHolder}
        onKeyUp={(e) => onKeyPress(e, e.target.value)}
        {...props}
      />
      <DeleteIcon showDeleteButton={showDeleteButton} onClick={onDeleteClick} />
    </NavbarFrame>
  )
}
