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
  placeholder,
  defaultKeyword,
  keyword: controlledKeyword,
}: React.PropsWithChildren<{
  onDelete?: () => void
  onAutoComplete?: (keyword: string) => void
  onEnter?: (keyword: string) => void
  onInputChange?: (keyword: string) => void
  placeholder?: string
  defaultKeyword?: string
  keyword?: string
}>) {
  const [uncontrolledKeyword, onUncontrolledKeywordChange] = useState<string>(
    defaultKeyword || '',
  )
  const {
    os: { name },
  } = useUserAgentContext()
  const isIOS = name === 'iOS'

  const contentsDivRef = useRef<HTMLDivElement>(null)

  const isControlledInput = typeof controlledKeyword !== 'undefined'
  const keyword =
    typeof controlledKeyword !== 'undefined'
      ? controlledKeyword
      : uncontrolledKeyword
  const setKeyword = isControlledInput
    ? onInputChange
    : onUncontrolledKeywordChange

  useEffect(() => {
    const contentsDiv = contentsDivRef.current
    if (contentsDiv && isIOS) {
      contentsDiv.addEventListener('touchmove', hideKeyboard)
      return () => {
        contentsDiv.removeEventListener('touchmove', hideKeyboard)
      }
    }
  }, [isIOS])

  const debounceCallback = useCallback(
    debounce(async (keyword: string) => {
      onAutoComplete(keyword)
    }, 500),
    [],
  )

  const handleKeyUp = async (keyCode: number) => {
    if (keyCode === KEY_CODE_ENTER) {
      onEnter(keyword)
      let id = window.setTimeout(() => {}, 0)
      while (id--) {
        window.clearTimeout(id)
      }
    }
  }

  useEffect(() => {
    debounceCallback(keyword)
  }, [keyword]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SearchNavbar
        placeholder={placeholder}
        value={keyword}
        onBackClick={backOrClose}
        onDeleteClick={() => {
          setKeyword('')
          onDelete()
        }}
        onInputChange={(e: SyntheticEvent, keyword: string) => {
          !isControlledInput && setKeyword(keyword)
          onInputChange(keyword)
        }}
        onKeyUp={(e: KeyboardEvent) => handleKeyUp(e.keyCode)}
      />
      <ContentsContainer isIOS={isIOS} userSelect="none">
        <div ref={contentsDivRef}>{children}</div>
      </ContentsContainer>
    </>
  )
}
