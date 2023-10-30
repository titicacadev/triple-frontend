import {
  ChangeEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useRef,
  useState,
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

function textAreaAutoResize(e: SyntheticEvent) {
  const textareaElement = e.target as HTMLTextAreaElement
  textareaElement.style.height = ''
  textareaElement.style.height =
    Math.min(textareaElement.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px'
}

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
}

export function InputAreaUI({
  buttonColor = 'blue',
  buttonText,
  inputValue,
  setInputValue,
  placeholder,
  onImageUpload,
  onSendMessage,
  onInputClick,
  onInputKeydown,
}: InputAreaUIProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [focus, setFocus] = useState<boolean>(false)

  return (
    <MainContainer focusOnKeyboard={focus} css={{ paddingBottom: 10 }}>
      <UploadImageButton htmlFor="image_upload" />
      <FileInput
        id="image_upload"
        type="file"
        name="file"
        multiple={false}
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onClick={onInputClick}
          ref={textareaRef}
          placeholder={placeholder}
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
        >
          {buttonText || '보내기'}
        </SendMessageButton>
      </InputArea>
    </MainContainer>
  )
}
