import styled from 'styled-components'
import { Container, safeAreaInsetMixin } from '@titicaca/core-elements'

export const MainContainer = styled(Container)<{ focusOnKeyboard?: boolean }>`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  border-top: 1px solid var(--color-gray100);
  padding: 10px 12px;
  background-color: var(--color-white);
  ${({ focusOnKeyboard }) => (!focusOnKeyboard ? safeAreaInsetMixin : null)};
`

export const InputArea = styled(Container)`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid var(--color-gray100);
  background-color: var(--color-gray20);
  padding: 10px 15px;
`

export const UploadImageButton = styled.label`
  width: 26px;
  height: 26px;
  margin-bottom: 8px;
  background: url('https://assets.triple.guide/images/img-review-select-photo@3x.png')
    no-repeat 0 0;
  background-size: 26px 26px;
`

export const FileInput = styled.input`
  position: absolute;
  visibility: hidden;
  width: 260px;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 20px;
  min-height: 20px;
  color: var(--color-black);
  font-size: 15px;
  background-color: transparent;
  overflow-y: scroll;
  line-height: 20px;
  resize: none;
  border: none;
  outline: none;
  box-shadow: none;

  ::placeholder {
    color: var(--color-gray300);
  }

  ::-webkit-scrollbar {
    display: none;
  }
`

export const SendMessageButton = styled.button<{ color?: 'mint' | 'blue' }>`
  flex-shrink: 0;
  background: transparent;
  color: ${({ color }) =>
    color === 'mint' ? 'var(--color-mint)' : 'var(--color-blue)'};
  font-size: 15px;
  font-weight: 700;
  outline: none;
`
