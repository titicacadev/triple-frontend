import { Container } from '@titicaca/tds-ui'
import { ChangeEvent, useRef } from 'react'
import styled from 'styled-components'

import SelectPhotoIcon from '../../icons/select-photo-icon'
import { textAreaAutoResize } from '../utils'
import SendIcon from '../../icons/send-icon'
import { InputAreaUIProps } from '../input-area-ui'

const MAX_TEXT_LENGTH = 1000
const TEXTAREA_MIN_HEIGHT = 22
const TEXTAREA_MAX_HEIGHT = 100

const InputAreaContainer = styled(Container)`
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const TextArea = styled.textarea<{
  $color?: string
  placeholderColor?: string
}>`
  flex-grow: 1;
  height: ${TEXTAREA_MIN_HEIGHT}px;
  resize: none;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 16px;
  line-height: ${TEXTAREA_MIN_HEIGHT}px;
  color: ${({ color }) => color || 'rgba(41, 41, 45, 1)'};

  ::placeholder {
    color: ${({ placeholderColor }) =>
      placeholderColor || 'rgba(191, 191, 192, 1)'};
  }

  ::-webkit-scrollbar {
    display: none;
  }
`

const SendButton = styled.button<{
  disabled: boolean
  activeButtonColor?: string
}>`
  border: none;
  padding: 6px 14px;
  border-radius: 17px;
  background-color: ${({
    disabled,
    activeButtonColor = 'rgba(65, 84, 255, 1)',
  }) => (disabled ? 'transparent' : activeButtonColor)};
  cursor: pointer;
  flex-shrink: 0;
  font-size: 0;

  > img {
    width: 20px;
    height: 20px;
  }
`

const UploadImageButton = styled.label`
  width: 26px;
  height: 26px;
`

export const FileInput = styled.input`
  position: absolute;
  visibility: hidden;
  width: 260px;
`

const InputContainer = styled(Container)`
  padding: 6px 6px 6px 16px;
  border-radius: 24px;
  box-shadow: 0 0 0 1px rgba(223, 223, 224, 1) inset;
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
  background-color: #fff;
`

export interface NolInputAreaUIProps
  extends Omit<InputAreaUIProps, 'buttonText' | 'buttonColor'> {
  color?: string
  placeholderColor?: string
  activeButtonColor?: string
}

export function NolInputAreaUI({
  buttonDisabled = false,
  inputValue,
  setInputValue,
  placeholder,
  onImageUpload,
  onSendMessage,
  onInputClick,
  onInputKeydown,
  maxTextLength = MAX_TEXT_LENGTH,
  multipleImageUpload = false,
  color,
  placeholderColor,
  activeButtonColor,
}: NolInputAreaUIProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    textAreaAutoResize(e, TEXTAREA_MAX_HEIGHT)
  }

  return (
    <InputAreaContainer>
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
      />
      <InputContainer>
        <TextArea
          onChange={onTextAreaChange}
          value={inputValue}
          onKeyDown={onInputKeydown}
          onClick={onInputClick}
          ref={textareaRef}
          placeholder={placeholder}
          maxLength={maxTextLength}
          $color={color}
          placeholderColor={placeholderColor}
        />
        <SendButton
          activeButtonColor={activeButtonColor}
          disabled={buttonDisabled}
          onClick={async () => {
            if (inputValue.trim().length > 0) {
              if (textareaRef.current) {
                textareaRef.current.style.height = `${TEXTAREA_MIN_HEIGHT}px`
              }
              onSendMessage()
            }
          }}
        >
          <SendIcon color={buttonDisabled ? '#545457' : '#FFF'} />
        </SendButton>
      </InputContainer>
    </InputAreaContainer>
  )
}
