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
import { styled, css } from 'styled-components'
import { Container, LayeringMixinProps, SearchNavbar } from '@titicaca/tds-ui'
import { useUserAgent } from '@titicaca/triple-web'
import {
  openKeyboard,
  closeKeyboard,
} from '@titicaca/triple-web-to-native-interfaces'
import { useDebouncedState } from '@titicaca/react-hooks'

const ContentsContainer = styled(Container)<{ $isIos: boolean }>`
  & > div:first-child {
    ${({ $isIos }) =>
      $isIos &&
      css`
        max-height: calc(100vh - 52px);
        overflow: scroll;
      `}
  }
`

const hideKeyboard = () => closeKeyboard()

const KEY_CODE_ENTER = 13

/**
 * 상단에는 검색 Navbar, 하단에는 Navbar이벤트를 통해 검색결과를 그릴수 있도록 제공해주는 컴포넌트 입니다.
 */
export function FullScreenSearchView({
  children,
  onDelete,
  onAutoComplete,
  onEnter,
  onInputChange,
  onBackClick = () => {},
  onInputClick,
  placeholder,
  defaultKeyword,
  keyword: controlledKeyword,
  focusedOnInput,
  ...rest
}: PropsWithChildren<
  {
    /**
     * Search navbar에 있는 삭제버튼을 클릭하는 이벤트.
     *
     * 이 이벤트 실행 뒤에 `onEmptyKeyword` 이벤트도 실행됩니다.
     */
    onDelete?: (keyword: string) => void
    /**
     * search navbar의 keyboard input에 대한 debounce (0.5s) 후에 Keyword가 있을 경우 실행되는 이벤트
     */
    onAutoComplete?: (keyword: string) => void
    /**
     * Search Navbar에서 엔터키를 입력했을 때 실행되는 이벤트.
     *
     * 만약 debounce 되어있던 auto completion이 있으면 제거합니다.
     */
    onEnter?: (keyword: string) => void
    /**
     * Search Navbar에 아무런 keyword가 없을 경우 실행되는 이벤트.
     *
     * Search Navbar에서 삭제버튼을 누르거나, onAutoComplete에서 Keyword가 없는 경우에 실행되는 이벤트.
     */
    onInputChange?: (keyword: string) => void
    /**
     * Search Navbar의 onChange에서 실행되는 이벤트.
     */
    onInputClick?: MouseEventHandler<HTMLInputElement>
    onBackClick?: () => void
    /**
     * Search navbar의 placeholder
     */
    placeholder?: string
    /**
     * Search Navbar input의 기본값.
     */
    defaultKeyword?: string
    keyword?: string
    borderless?: boolean
    backIconType?: 'back' | 'close'
    focusedOnInput?: boolean
  } & LayeringMixinProps
>) {
  const {
    os: { name },
  } = useUserAgent()
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
      onAutoComplete?.(debouncedKeyword)
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

      onEnter?.(keyword)
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
      onInputChange?.(value)
    },
    [onInputChange],
  )

  const handleDelete = () => {
    onDelete?.(keyword)
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
        onSearch={() => keyword && onEnter?.(keyword)}
        inputRef={inputRef}
        {...rest}
      />
      <ContentsContainer $isIos={isIos} css={{ userSelect: 'none' }}>
        <div ref={contentsDivRef}>{children}</div>
      </ContentsContainer>
    </>
  )
}
