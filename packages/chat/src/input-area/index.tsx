import {
  ChangeEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useRef,
} from 'react'

import {
  FileInput,
  InputArea,
  MainContainer,
  SendMessageButton,
  TextArea,
  UploadImageButton,
} from './elements'

const MIN_TEXTAREA_HEIGHT = 20
const MAX_TEXTAREA_HEIGHT = 100
const MAX_TEXT_LENGTH = 2000

export interface InputAreaUIProps {
  inputValue: string
  placeholder?: string
  setInputValue: (value: string) => void
  onImageUpload: ChangeEventHandler<HTMLInputElement>
  onSendMessage: () => void
  onInputClick?: () => void
  onInputKeydown?: KeyboardEventHandler
  buttonColor?: 'mint' | 'blue'
  buttonText?: string
  buttonDisabled?: boolean
  maxTextLength?: number
  multipleImageUpload?: boolean
}

export function InputAreaUI({
  buttonColor = 'blue',
  buttonText,
  buttonDisabled,
  inputValue,
  setInputValue,
  placeholder,
  onImageUpload,
  onSendMessage,
  onInputClick,
  onInputKeydown,
  maxTextLength = MAX_TEXT_LENGTH,
  multipleImageUpload = false,
  ...props
}: InputAreaUIProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <MainContainer {...props}>
      <UploadImageButton htmlFor="image_upload" />
      <FileInput
        id="image_upload"
        type="file"
        name="file"
        multiple={multipleImageUpload}
        onChange={onImageUpload}
      />

      <InputArea>
        <TextArea
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.target.value)
            textAreaAutoResize(e)
          }}
          onKeyDown={onInputKeydown}
          onClick={onInputClick}
          ref={textareaRef}
          placeholder={placeholder}
          maxLength={maxTextLength}
        />
        <SendMessageButton
          color={buttonColor}
          onClick={async () => {
            if (inputValue.trim().length > 0) {
              if (textareaRef.current) {
                textareaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`
              }
              onSendMessage()
            }
          }}
          disabled={buttonDisabled}
        >
          {buttonText || '보내기'}
        </SendMessageButton>
      </InputArea>
    </MainContainer>
  )
}

function textAreaAutoResize(e: SyntheticEvent) {
  const textareaElement = e.target as HTMLTextAreaElement
  textareaElement.style.height = ''
  textareaElement.style.height =
    Math.min(textareaElement.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px'
}
