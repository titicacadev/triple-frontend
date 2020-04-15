import React, {
  SyntheticEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { Container, SearchNavbar } from '@titicaca/core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import {
  backOrClose,
  closeKeyboard,
} from '@titicaca/triple-web-to-native-interfaces'
import { debounce } from '@titicaca/view-utilities'

const ContentsContainer = styled(Container)<{ isIOS: boolean }>`
  > div:first-child {
    ${({ isIOS }) =>
      isIOS &&
      css`
        max-height: calc(100vh - 58px);
        overflow: scroll;
      `}
  }
`

const hideKeyboard = () => closeKeyboard()

const KEY_CODE_ENTER = 13

export default function FullScreenSearchView({
  children,
  onDelete = () => {},
  onAutoComplete = () => {},
  onEnter = () => {},
  onInputChange = () => {},
  onBackClick = () => {},
  placeholder,
  defaultKeyword,
  keyword: controlledKeyword,
}: React.PropsWithChildren<{
  onDelete?: (keyword: string) => void
  onAutoComplete?: (keyword: string) => void
  onEnter?: (keyword: string) => void
  onInputChange?: (keyword: string) => void
  onBackClick?: () => void
  placeholder?: string
  defaultKeyword?: string
  keyword?: string
}>) {
  const [keyword, setKeyword] = useState<string>(defaultKeyword || '')
  const {
    os: { name },
  } = useUserAgentContext()
  const isIOS = name === 'iOS'

  const contentsDivRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const debounceCallback = useCallback(
    debounce(async (keyword: string) => {
      onAutoComplete(keyword)
    }, 500),
    [],
  )

  useEffect(() => {
    const contentsDiv = contentsDivRef.current
    if (contentsDiv && isIOS) {
      contentsDiv.addEventListener('touchmove', hideKeyboard)
      return () => {
        contentsDiv.removeEventListener('touchmove', hideKeyboard)
      }
    }
  }, [isIOS])

  useEffect(() => {
    debounceCallback(keyword)
  }, [keyword]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (controlledKeyword !== undefined) {
      setKeyword(controlledKeyword || '')
    }
  }, [controlledKeyword])

  const handleKeyUp = async (keyCode: number) => {
    if (keyCode === KEY_CODE_ENTER) {
      onEnter(keyword)
      let id = window.setTimeout(() => {}, 0)
      while (id--) {
        window.clearTimeout(id)
      }
    }
  }

  const handleInputFocus = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const handleChange = useCallback(
    (e: SyntheticEvent, value: string) => {
      setKeyword(value)
      onInputChange(value)
    },
    [onInputChange],
  )

  const handleDelete = () => {
    onDelete(keyword)
    setKeyword('')
    handleInputFocus()
  }

  const handleBack = useCallback(() => {
    onBackClick()
    backOrClose()
  }, [onBackClick])

  return (
    <>
      <SearchNavbar
        placeholder={placeholder}
        value={keyword}
        onBackClick={handleBack}
        onDeleteClick={handleDelete}
        onInputChange={handleChange}
        onKeyUp={(e: KeyboardEvent) => handleKeyUp(e.keyCode)}
        onSearch={() => keyword && onEnter(keyword)}
        inputRef={inputRef}
      />
      <ContentsContainer isIOS={isIOS} userSelect="none">
        <div ref={contentsDivRef}>{children}</div>
      </ContentsContainer>
    </>
  )
}
