import React, {
  ReactNode,
  SyntheticEvent,
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

const MainContainer = styled(Container)`
  background-color: white;
`

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

export default function Main({
  children,
  onDelete = () => {},
  onAutoComplete = () => {},
  onEnter = () => {},
  onEmptyKeyword = () => {},
  onInputChange = () => {},
  placeholder,
  defaultKeyword,
}: {
  children: ReactNode
  onDelete?: () => void
  onAutoComplete?: (keyword: string) => void
  onEnter?: (keyword: string) => void
  onEmptyKeyword?: () => void
  onInputChange?: (keyword: string) => void
  placeholder?: string
  defaultKeyword?: string
}) {
  const [keyword, setKeyword] = useState<string>(defaultKeyword)
  const {
    os: { name },
  } = useUserAgentContext()
  const isIOS = name === 'iOS'

  const contentsDivRef = useRef<HTMLDivElement>(null)

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
      if (!keyword || keyword.trim().length === 0) {
        onEmptyKeyword()
      } else {
        onAutoComplete(keyword)
      }
    }, 500),
    [onEmptyKeyword, onAutoComplete],
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
    <MainContainer>
      <SearchNavbar
        inputPlaceholder={placeholder}
        value={keyword}
        onBackClick={backOrClose}
        onDeleteClick={() => {
          onDelete()
          onEmptyKeyword()
        }}
        onInputChange={(e: SyntheticEvent, keyword: string) => {
          setKeyword(keyword)
          onInputChange(keyword)
        }}
        onKeyUp={(e: KeyboardEvent) => handleKeyUp(e.keyCode)}
      />
      <ContentsContainer margin={{ top: 58 }} isIOS={isIOS} userSelect="none">
        <div ref={contentsDivRef}>{children}</div>
      </ContentsContainer>
    </MainContainer>
  )
}
