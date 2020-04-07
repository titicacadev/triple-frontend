import * as React from 'react'
import styled from 'styled-components'

import Navbar from './navbar'

const InputText = styled.input`
  box-sizing: border-box;
  border-style: none;
  font-size: 17px;
  text-overflow: ellipsis;
  padding: 8px 35px 0px 40px;
  white-space: nowrap;
  width: 100%;
  outline: none;

  ${({ value }) => value && `padding: 8px 95px 0px 40px;`}
`

const MainNavbarFrame = styled(Navbar.NavbarFrame)`
  height: 58px;
  padding: 12px;
`

const Icon = styled(Navbar.Item)`
  position: absolute;
  top: 12px;
  margin-right: 0px;
  float: none;
`

const SearchIcon = styled(Icon)`
  right: 12px;
`

const DeleteIcon = styled(Icon)<{ visible: boolean }>`
  right: 52px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

interface InputProps {
  placeholder?: string
  onInputChange?: (e: React.SyntheticEvent, value: string) => void
  onBlur?: (e: React.SyntheticEvent) => void
  onFocus?: (e: React.SyntheticEvent) => void
  onKeyUp?: (e: React.KeyboardEvent) => void
  value?: string
}

const Input = React.forwardRef(
  (
    { placeholder, onInputChange, onBlur, onFocus, onKeyUp, value }: InputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => (
    <InputText
      placeholder={placeholder}
      onChange={(e) => onInputChange && onInputChange(e, e.target.value)}
      onBlur={(e) => onBlur && onBlur(e)}
      onFocus={(e) => onFocus && onFocus(e)}
      onKeyUp={(e) => onKeyUp && onKeyUp(e)}
      value={value}
      ref={ref}
    />
  ),
)

Input.displayName = 'InputText'

export default function SearchNavbar({
  placeholder,
  onBackClick,
  onDeleteClick,
  onInputChange,
  onKeyUp,
  onBlur,
  onFocus,
  onSearch,
  value,
  inputRef,
}: {
  onSearch: () => void
  onBackClick: (event: React.SyntheticEvent) => void
  onDeleteClick?: (event: React.SyntheticEvent) => void
  inputRef?: React.Ref<HTMLInputElement>
} & InputProps) {
  return (
    <MainNavbarFrame borderless>
      <Icon icon="back" onClick={onBackClick} />
      <Input
        placeholder={placeholder}
        onInputChange={onInputChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        value={value}
        ref={inputRef}
      />
      <DeleteIcon icon="delete" onClick={onDeleteClick} visible={!!value} />
      <SearchIcon icon="search" onClick={onSearch} />
    </MainNavbarFrame>
  )
}
