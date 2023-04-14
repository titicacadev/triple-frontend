import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'
import { HTMLAttributes, forwardRef } from 'react'
import { useMergeRefs } from '@floating-ui/react'

import { useActionSheetSelect } from './action-sheet-select-context'

const Button = styled.button`
  display: block;
  position: relative;
  width: 100%;
  padding: 16px;
  border: 1px solid #efefef;
  text-align: left;
`

const ArrowDown = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  display: inline-block;
  width: 10px;
  height: 24px;
  background-size: 10px 24px;
  background-repeat: no-repeat;
  background-image: url('https://assets.triple.guide/images/ico-category-select@3x.png');
`

export type ActionSheetSelectButtonProps = HTMLAttributes<HTMLButtonElement>

export const ActionSheetSelectButton = forwardRef<
  HTMLButtonElement,
  ActionSheetSelectButtonProps
>(function ActionSheetSelectButton({ children, ...props }, ref) {
  const { floating, interactions, value } = useActionSheetSelect()

  return (
    <Button
      ref={useMergeRefs([ref, floating.refs.setReference])}
      {...interactions.getReferenceProps(props)}
    >
      <Text size="large" alpha={value ? 1 : 0.5}>
        {children}
      </Text>
      <ArrowDown />
    </Button>
  )
})
