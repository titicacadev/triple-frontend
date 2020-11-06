import * as React from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import Navbar from './navbar'
import { LayeringMixinProps, layeringMixin } from '../mixins'

const InputText = styled.input`
  box-sizing: border-box;
  border-style: none;
  font-size: 17px;
  text-overflow: ellipsis;
  padding: 2px 35px 0px 40px;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  outline: none;

  ${({ value }) =>
    value
      ? `padding: 2px 95px 0px 40px;`
      : `
      background: url(https://assets.triple.guide/images/btn-com-search@3x.png) no-repeat;
      background-size: 34px 34px;
      background-position: 100% 0;
  `}
`

const MainNavbarFrame = styled(Navbar.NavbarFrame)<
  { noBorder?: boolean } & LayeringMixinProps
>`
  height: 58px;
  padding: 12px;
  ${({ noBorder }) =>
    noBorder ? '' : ` border-bottom: 1px solid rgba(${getColor('gray50')});`}
  ${layeringMixin(0)}
`

const Icon = styled(Navbar.Item)<{ visible: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 0px;
  float: none;

  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

const SearchIcon = styled(Icon)`
  right: 12px;
`

const DeleteIcon = styled(Icon)`
  right: 52px;
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
  zIndex = 2,
  zTier,
  borderless: noBorder,
}: {
  onSearch: () => void
  onBackClick: (event: React.SyntheticEvent) => void
  onDeleteClick?: (event: React.SyntheticEvent) => void
  inputRef?: React.Ref<HTMLInputElement>
  borderless?: boolean
} & InputProps &
  LayeringMixinProps) {
  return (
    // borderless는 NavbarFrame의 기본 border(box-shadow)를 비활성화 시킴.
    // noBorder는 MainNavbarFrame의 border(border-bottom)를 비활성화 시킴.
    <MainNavbarFrame
      borderless
      noBorder={noBorder}
      zTier={zTier}
      zIndex={zIndex}
    >
      <Icon icon="back" onClick={onBackClick} visible={true} />
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
      <SearchIcon icon="search" onClick={onSearch} visible={!!value} />
    </MainNavbarFrame>
  )
}
