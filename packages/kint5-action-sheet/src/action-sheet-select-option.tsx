import { useListItem } from '@floating-ui/react'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { useActionSheetSelect } from './action-sheet-select-context'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  color: #3a3a3a;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &[aria-selected='true'] {
    color: #368fff;
    font-weight: bold;
  }
`

export interface ActionSheetSelectOptionProps extends PropsWithChildren {
  value: string
}

export const ActionSheetSelectOption = ({
  children,
  value,
  ...props
}: ActionSheetSelectOptionProps) => {
  const {
    activeIndex,
    interactions,
    value: contextValue,
    handleChange,
  } = useActionSheetSelect()
  const { ref, index } = useListItem()

  const isActive = activeIndex === index
  const isSelected = value === contextValue

  const handleClick = () => {
    handleChange(value, index)
  }

  return (
    <StyledButton
      ref={ref}
      role="option"
      tabIndex={isActive ? 0 : -1}
      aria-selected={isSelected}
      {...interactions.getItemProps({
        ...props,
        onClick: handleClick,
      })}
    >
      {children}
    </StyledButton>
  )
}
