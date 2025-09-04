import { TextareaHTMLAttributes } from 'react'

import type { InputAreaUIProps } from '../input-area-ui'

type SelectActionButtonProps =
  | WithDefaultImageUploadButton
  | WithCustomSelectActionButton

interface WithDefaultImageUploadButton
  extends Pick<InputAreaUIProps, 'onImageUpload' | 'multipleImageUpload'> {}

interface WithCustomSelectActionButton {
  CustomSelectActionButton: React.ReactNode
}

interface NolInputAreaUIBaseProps
  extends Omit<
      InputAreaUIProps,
      'buttonText' | 'buttonColor' | 'multipleImageUpload' | 'onImageUpload'
    >,
    Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onBlur' | 'onFocus'> {
  color?: string
  inputContainerColor?: string
  placeholderColor?: string
  activeButtonColor?: string
  disabled?: boolean
  CustomEmptyStateButton?: React.ReactNode
  dismissOnSend?: boolean
}

export type NolInputAreaUIProps = NolInputAreaUIBaseProps &
  SelectActionButtonProps
