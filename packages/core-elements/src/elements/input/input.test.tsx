import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Input } from './input'

describe('Input Component', () => {
  test('renders input component correctly', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  test('renders with label, placeholder, help, and error', () => {
    render(
      <Input
        label="이름"
        placeholder="이름을 입력해주세요."
        help="고객님의 요청사항은 해당 호텔에 전달됩니다."
        error="이름은 필수 입력 사항입니다."
      />,
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })
})

describe('Masked Input Behavior', () => {
  test.each([
    ['Date of birth', '9999-99-99', '20001202', '2000-12-02'],
    ['Date of birth (yyyy-mm-dd)', 'yyyy-mm-dd', '20001202', '2000-12-02'],
    ['Mobile number', '999-9999-9999', '01012345678', '010-1234-5678'],
  ])('%s input applies mask correctly', async (_, mask, value, expected) => {
    render(<Input mask={mask} value={value} />)
    const input = await screen.findByRole('textbox')
    expect(input).toHaveValue(expected)
  })
})

describe('User Typing Behavior', () => {
  test.each([
    ['Mobile number', '999-9999-9999', '01012345678', '010-1234-5678'],
    ['Date of birth', '9999/99/99', '20221202', '2022/12/02'],
    ['Date of birth (yyyy/mm/dd)', 'yyyy/mm/dd', '20250102', '2025/01/02'],
  ])('User typing in %s input', async (_, mask, inputValue, expected) => {
    render(<Input mask={mask} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, inputValue)
    await waitFor(() => expect(input).toHaveValue(expected))
  })
})

describe('Keyboard Events', () => {
  test('calls onKeyUp, onKeyPress, onKeyDown when typing', async () => {
    const handleKeyUp = jest.fn()
    const handleKeyPress = jest.fn()
    const handleKeyDown = jest.fn()

    render(
      <Input
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
      />,
    )

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'A')

    expect(handleKeyDown).toHaveBeenCalledTimes(1)
    expect(handleKeyPress).toHaveBeenCalledTimes(1)
    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })
})

describe('ForwardRef and Ref Behavior', () => {
  test('ref를 사용하여 값 변경 확인', async () => {
    const ref = {
      current: null,
    } as React.MutableRefObject<HTMLInputElement | null>
    render(<Input inputRef={(el) => (ref.current = el)} mask="9999-99-99" />)

    await waitFor(() => expect(ref.current).not.toBeNull())
    expect(ref.current).toBeInstanceOf(HTMLInputElement)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, '20001202')

    await waitFor(() => expect(ref.current?.value).toBe('2000-12-02'))
  })

  test('focuses input using ref', async () => {
    const ref = {
      current: null,
    } as React.MutableRefObject<HTMLInputElement | null>
    render(<Input ref={ref} />)

    await waitFor(() => expect(ref.current).not.toBeNull())
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
