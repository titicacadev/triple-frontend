import styled from 'styled-components'
import { HTMLAttributes, forwardRef } from 'react'
import { useMergeRefs } from '@floating-ui/react'

import {
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormField,
} from '../form-field'
import { Text } from '../text'

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
  const { floating, interactions, value, error, help, label } =
    useActionSheetSelect()
  const {
    errorId,
    descriptionId,
    inputId,
    isError,
    isRequired,
    handleBlur,
    handleFocus,
  } = useFormField()

  const hasLabel = !!label
  const hasHelp = !!help

  return (
    <div>
      {hasLabel ? <FormFieldLabel>{label}</FormFieldLabel> : null}
      <Button
        ref={useMergeRefs([ref, floating.refs.setReference])}
        id={inputId}
        aria-describedby={hasHelp && !isError ? descriptionId : undefined}
        aria-errormessage={isError ? errorId : undefined}
        aria-invalid={isError}
        aria-required={isRequired}
        {...interactions.getReferenceProps({
          onBlur: handleBlur,
          onFocus: handleFocus,
          ...props,
        })}
      >
        <Text size="large" alpha={value ? 1 : 0.5}>
          {children}
        </Text>
        <ArrowDown />
      </Button>
      {error ? (
        <FormFieldError>{error}</FormFieldError>
      ) : help ? (
        <FormFieldHelp>{help}</FormFieldHelp>
      ) : null}
    </div>
  )
})
