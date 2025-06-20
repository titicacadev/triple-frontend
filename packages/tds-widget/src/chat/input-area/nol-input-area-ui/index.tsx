import { Container } from '@titicaca/tds-ui'
import { ChangeEvent, ForwardedRef, forwardRef, useRef } from 'react'
import styled, { css } from 'styled-components'

import SelectPhotoIcon from '../../icons/select-photo-icon'
import { textAreaAutoResize } from '../utils'
import SendIcon from '../../icons/send-icon'

import { NolInputAreaUIProps } from './types'

const MAX_TEXT_LENGTH = 1000
const TEXTAREA_MIN_HEIGHT = 22
const TEXTAREA_MAX_HEIGHT = 110
export const INPUT_AREA_HEIGHT = 60

const InputAreaContainer = styled(Container)`
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 12px;
`

const TextArea = styled.textarea<{
  $color?: string
  placeholderColor?: string
  scrollbarVisible?: boolean
}>`
  flex-grow: 1;
  height: ${TEXTAREA_MIN_HEIGHT}px;
  resize: none;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 16px;
  line-height: ${TEXTAREA_MIN_HEIGHT}px;
  color: ${({ color, theme }) => color || theme.nol.colorNeutralB100};

  &::placeholder {
    color: ${({ placeholderColor, theme }) =>
      placeholderColor || theme.nol.colorNeutralG30};
  }

  ${({ scrollbarVisible }) =>
    !scrollbarVisible &&
    css`
      &::-webkit-scrollbar {
        display: none;
      }
    `}
`

const SendButton = styled.button<{
  disabled: boolean
  activeButtonColor?: string
}>`
  border: none;
  padding: 6px 14px;
  border-radius: 17px;
  background-color: ${({
    theme,
    disabled,
    activeButtonColor = theme.nol.colorPrimaryNol,
  }) => (disabled ? 'transparent' : activeButtonColor)};
  cursor: pointer;
  flex-shrink: 0;
  font-size: 0;
  align-self: flex-end;

  > img {
    width: 20px;
    height: 20px;
  }
`

const UploadImageButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
`

const UploadImageButton = styled.label`
  width: 26px;
  height: 26px;
`

const FileInput = styled.input`
  position: absolute;
  visibility: hidden;
  width: 260px;
`

const InputContainer = styled(Container)`
  padding: 6px 6px 6px 16px;
  border-radius: 24px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.nol.colorNeutralG15} inset;
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
`

function NolInputAreaUIImpl(
  {
    disabled = false,
    buttonDisabled = false,
    inputValue,
    setInputValue,
    placeholder,
    onSendMessage,
    onInputClick,
    onInputKeydown,
    maxTextLength = MAX_TEXT_LENGTH,
    color,
    placeholderColor,
    inputContainerColor,
    activeButtonColor,
    onBlur,
    onFocus,
    scrollbarVisible,
    ...props
  }: NolInputAreaUIProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    textAreaAutoResize(e, TEXTAREA_MAX_HEIGHT)
  }

  const {
    CustomSelectActionButton,
    multipleImageUpload,
    onImageUpload,
    ...rest
  } = {
    ...props,
    ...('CustomSelectActionButton' in props
      ? {
          CustomSelectActionButton: props.CustomSelectActionButton,
          onImageUpload: () => {},
          multipleImageUpload: false,
        }
      : {
          CustomSelectActionButton: null,
          onImageUpload: props.onImageUpload,
          multipleImageUpload: props.multipleImageUpload || false,
        }),
  }

  return (
    <InputAreaContainer {...rest} ref={ref}>
      {CustomSelectActionButton || (
        <UploadImageButtonWrapper>
          <UploadImageButton htmlFor="image_upload">
            <SelectPhotoIcon />
          </UploadImageButton>
          <FileInput
            id="image_upload"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            multiple={multipleImageUpload}
            onChange={onImageUpload}
            disabled={disabled}
          />
        </UploadImageButtonWrapper>
      )}
      <InputContainer
        css={{
          backgroundColor: inputContainerColor || 'var(--color-neutral-w-100)',
        }}
      >
        <TextArea
          scrollbarVisible={scrollbarVisible}
          disabled={disabled}
          onChange={onTextAreaChange}
          value={inputValue}
          onKeyDown={onInputKeydown}
          onClick={onInputClick}
          ref={textareaRef}
          placeholder={placeholder}
          maxLength={maxTextLength}
          $color={color}
          placeholderColor={placeholderColor}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <SendButton
          activeButtonColor={activeButtonColor}
          disabled={disabled || buttonDisabled}
          onClick={async () => {
            if (inputValue.trim().length > 0) {
              if (textareaRef.current) {
                textareaRef.current.style.height = `${TEXTAREA_MIN_HEIGHT}px`
              }
              onSendMessage()
            }
          }}
        >
          <SendIcon color={disabled || buttonDisabled ? '#BFBFC0' : '#FFF'} />
        </SendButton>
      </InputContainer>
    </InputAreaContainer>
  )
}

export const NolInputAreaUI = forwardRef(NolInputAreaUIImpl)
