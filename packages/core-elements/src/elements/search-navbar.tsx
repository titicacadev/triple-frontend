import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'
import {
  forwardRef,
  KeyboardEvent,
  MouseEventHandler,
  Ref,
  SyntheticEvent,
} from 'react'

import { LayeringMixinProps, layeringMixin } from '../mixins'

import Navbar from './navbar'

const InputText = styled.input`
  border-style: none;
  font-size: 18px;
  text-overflow: ellipsis;
  padding: 0 35px 0 40px;
  white-space: nowrap;
  width: 100%;
  height: 34px;
  outline: none;

  ${({ value }) =>
    value
      ? `padding: 0 95px 0 40px;`
      : `
      background: url(https://assets.triple.guide/images/btn-com-search@3x.png) no-repeat;
      background-size: 34px 34px;
      background-position: 100% 0;
  `}
`

const MainNavbarFrame = styled(Navbar.NavbarFrame)<
  { noBorder?: boolean } & LayeringMixinProps
>`
  ${({ noBorder }) =>
    noBorder ? '' : ` border-bottom: 1px solid rgba(${getColor('gray50')});`}
  ${layeringMixin(0)}
`

const Icon = styled(Navbar.Item)<{ visible: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 0;
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
  onInputChange?: (e: SyntheticEvent, value: string) => void
  onBlur?: (e: SyntheticEvent) => void
  onFocus?: (e: SyntheticEvent) => void
  onKeyUp?: (e: KeyboardEvent) => void
  onClick?: MouseEventHandler<HTMLInputElement>
  value?: string
}

const Input = forwardRef(
  (
    {
      placeholder,
      onInputChange,
      onBlur,
      onFocus,
      onKeyUp,
      value,
      onClick,
    }: InputProps,
    ref?: Ref<HTMLInputElement>,
  ) => (
    <InputText
      placeholder={placeholder}
      onChange={(e) => onInputChange && onInputChange(e, e.target.value)}
      onBlur={(e) => onBlur && onBlur(e)}
      onFocus={(e) => onFocus && onFocus(e)}
      onKeyUp={(e) => onKeyUp && onKeyUp(e)}
      onClick={onClick}
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
  onInputClick,
  onInputChange,
  onKeyUp,
  onBlur,
  onFocus,
  onSearch,
  value,
  inputRef,
  borderless: noBorder,
  backIconType = 'back',
  ...rest
}: {
  onSearch: () => void
  onInputClick?: MouseEventHandler<HTMLInputElement>
  onBackClick: (event: SyntheticEvent) => void
  onDeleteClick?: (event: SyntheticEvent) => void
  inputRef?: Ref<HTMLInputElement>
  borderless?: boolean
  backIconType?: 'back' | 'close'
} & InputProps &
  LayeringMixinProps) {
  return (
    // borderless는 NavbarFrame의 기본 border(box-shadow)를 비활성화 시킴.
    // noBorder는 MainNavbarFrame의 border(border-bottom)를 비활성화 시킴.
    <MainNavbarFrame borderless noBorder={noBorder} {...rest}>
      <Icon icon={backIconType} onClick={onBackClick} visible />
      <Input
        placeholder={placeholder}
        onInputChange={onInputChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        value={value}
        ref={inputRef}
        onClick={onInputClick}
      />
      <DeleteIcon icon="delete" onClick={onDeleteClick} visible={!!value} />
      <SearchIcon icon="search" onClick={onSearch} visible={!!value} />
    </MainNavbarFrame>
  )
}
