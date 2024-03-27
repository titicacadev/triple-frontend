import type { Meta, StoryObj } from '@storybook/react'

import { FormField } from './form-field'
import { useFormField } from './form-field-context'
import { FormFieldError } from './form-field-error'
import { FormFieldHelp } from './form-field-help'
import { FormFieldLabel } from './form-field-label'

const meta: Meta<typeof FormField> = {
  title: 'tds-ui / FormField',
  component: FormField,
  args: {
    isError: false,
    isDisabled: false,
    isRequired: false,
  },
  argTypes: {
    isError: { type: 'boolean' },
    isDisabled: { type: 'boolean' },
    isRequired: { type: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Form을 구성할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

const CustomInput = () => {
  const {
    inputId,
    descriptionId,
    errorId,
    handleBlur,
    handleFocus,
    isDisabled,
    isError,
    isRequired,
  } = useFormField()

  return (
    <input
      id={inputId}
      value="FormField 테스트"
      disabled={isDisabled}
      required={isRequired}
      aria-invalid={isError}
      aria-describedby={descriptionId}
      aria-errormessage={errorId}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
}

type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: {
    children: (
      <>
        <FormFieldLabel>Label</FormFieldLabel>
        <CustomInput />
      </>
    ),
  },
}

export const Required: Story = {
  args: {
    isRequired: true,
    children: (
      <>
        <FormFieldLabel>Label</FormFieldLabel>
        <CustomInput />
      </>
    ),
  },
}

export const WithHelpMessage: Story = {
  args: {
    children: (
      <>
        <FormFieldLabel>Label</FormFieldLabel>
        <CustomInput />
        <FormFieldHelp>Helper text.</FormFieldHelp>
      </>
    ),
  },
}

export const WithErrorMessage: Story = {
  args: {
    isError: true,
    children: (
      <>
        <FormFieldLabel>Label</FormFieldLabel>
        <CustomInput />
        <FormFieldError>Helper text.</FormFieldError>
      </>
    ),
  },
}
