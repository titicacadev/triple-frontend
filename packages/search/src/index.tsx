import React, {
  SyntheticEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import {
  Container,
  LayeringMixinProps,
  SearchNavbar,
} from '@titicaca/core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import {
  backOrClose,
  closeKeyboard,
} from '@titicaca/triple-web-to-native-interfaces'
import { useDebouncedState } from '@titicaca/react-hooks'

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
  ...rest
}: React.PropsWithChildren<
  {
    onDelete?: (keyword: string) => void
    onAutoComplete?: (keyword: string) => void
    onEnter?: (keyword: string) => void
    onInputChange?: (keyword: string) => void
    onBackClick?: () => void
    placeholder?: string
    defaultKeyword?: string
    keyword?: string
    borderless?: boolean
  } & LayeringMixinProps
>) {
  const {
    os: { name },
  } = useUserAgentContext()
  const isIOS = name === 'iOS'

  const [keyword, setKeyword] = useState<string>(defaultKeyword || '')
  const { debounced: debouncedKeyword, clearDebounce } = useDebouncedState(
    keyword,
    500,
  )

  const contentsDivRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const contentsDiv = contentsDivRef.current
    if (contentsDiv && isIOS) {
      contentsDiv.addEventListener('touchmove', hideKeyboard)
      return () => {
        contentsDiv.removeEventListener('touchmove', hideKeyboard)
      }
    }
  }, [isIOS])

  useEffect(
    () => {
      onAutoComplete(debouncedKeyword)
    },
    // HACK: 부모에서 콜백 안 쓰고 있으면
    // 렌더링 할 때마다 fetch가 다시 일어나므로 onAutoComplete 의존성 제거.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedKeyword],
  )

  useEffect(() => {
    if (controlledKeyword !== undefined) {
      setKeyword(controlledKeyword || '')
    }
  }, [controlledKeyword])

  const handleKeyUp = async (keyCode: number) => {
    if (keyCode === KEY_CODE_ENTER) {
      if (inputRef && inputRef.current) {
        inputRef.current.blur()
      }

      onEnter(keyword)
      clearDebounce()
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
        {...rest}
      />
      <ContentsContainer isIOS={isIOS} userSelect="none">
        <div ref={contentsDivRef}>{children}</div>
      </ContentsContainer>
    </>
  )
}
