import {
  SyntheticEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'
import styled, { css } from 'styled-components'
import {
  Container,
  LayeringMixinProps,
  SearchNavbar,
} from '@titicaca/core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import {
  openKeyboard,
  closeKeyboard,
} from '@titicaca/triple-web-to-native-interfaces'
import { useDebouncedState } from '@titicaca/react-hooks'

const ContentsContainer = styled(Container)<{ isIos: boolean }>`
  > div:first-child {
    ${({ isIos }) =>
      isIos &&
      css`
        max-height: calc(100vh - 52px);
        overflow: scroll;
      `}
  }
`

const hideKeyboard = () => closeKeyboard()

const KEY_CODE_ENTER = 13

function FullScreenSearchView({
  children,
  onDelete = () => {},
  onAutoComplete = () => {},
  onEnter = () => {},
  onInputChange = () => {},
  onBackClick = () => {},
  onInputClick,
  placeholder,
  defaultKeyword,
  keyword: controlledKeyword,
  focusedOnInput,
  ...rest
}: PropsWithChildren<
  {
    onDelete?: (keyword: string) => void
    onAutoComplete?: (keyword: string) => void
    onEnter?: (keyword: string) => void
    onInputChange?: (keyword: string) => void
    onInputClick?: MouseEventHandler<HTMLInputElement>
    onBackClick?: () => void
    placeholder?: string
    defaultKeyword?: string
    keyword?: string
    borderless?: boolean
    backIconType?: 'back' | 'close'
    focusedOnInput?: boolean
  } & LayeringMixinProps
>) {
  const {
    os: { name },
  } = useUserAgentContext()
  const isIos = name === 'iOS'

  const [keyword, setKeyword] = useState<string>(defaultKeyword || '')
  const { debounced: debouncedKeyword, clearDebounce } = useDebouncedState(
    keyword,
    500,
  )

  const contentsDivRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const contentsDiv = contentsDivRef.current
    if (contentsDiv && isIos) {
      contentsDiv.addEventListener('touchmove', hideKeyboard)
      return () => {
        contentsDiv.removeEventListener('touchmove', hideKeyboard)
      }
    }
  }, [isIos])

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
      openKeyboard()
    }
  }, [inputRef])

  useLayoutEffect(() => {
    focusedOnInput && handleInputFocus()
  }, [handleInputFocus, focusedOnInput])

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

  return (
    <>
      <SearchNavbar
        placeholder={placeholder}
        value={keyword}
        onBackClick={onBackClick}
        onDeleteClick={handleDelete}
        onInputChange={handleChange}
        onInputClick={onInputClick}
        onKeyUp={(e: KeyboardEvent) => handleKeyUp(e.keyCode)}
        onSearch={() => keyword && onEnter(keyword)}
        inputRef={inputRef}
        {...rest}
      />
      <ContentsContainer isIos={isIos} css={{ userSelect: 'none' }}>
        <div ref={contentsDivRef}>{children}</div>
      </ContentsContainer>
    </>
  )
}

export default FullScreenSearchView
