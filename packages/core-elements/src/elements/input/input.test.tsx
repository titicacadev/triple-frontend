import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Input } from './input'

test('default input', () => {
  render(
    <Input
      label="이름"
      placeholder="이름을 입력해주세요."
      help="고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다."
      error="이름은 필수 입력 사항입니다."
    />,
  )
  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()
})

test('Date of birth input', async () => {
  render(<Input mask="9999-99-99" value="20001202" />)

  const input = await screen.findByRole('textbox')
  expect(input).toHaveValue('2000-12-02')
})

test('Date of birth yyddmm input', async () => {
  render(<Input mask="yyyy-mm-dd" value="20001202" />)

  const input = await screen.findByRole('textbox')
  expect(input).toHaveValue('2000-12-02')
})

test('Mobile input', async () => {
  render(<Input mask="999-9999-9999" value="01012345678" />)

  const input = screen.getByRole('textbox')
  expect(input).toHaveValue('010-1234-5678')
})

test('User typing in mobile input', async () => {
  render(<Input mask="999-9999-9999" />)

  const input = screen.getByRole('textbox')
  await userEvent.type(input, '01012345678')

  expect(input).toHaveValue('010-1234-5678')
})

test('User typing in Date of birth input', async () => {
  render(<Input mask="9999/99/99" />)

  const input = screen.getByRole('textbox')
  await userEvent.type(input, '20221202')

  expect(input).toHaveValue('2022/12/02')
})

test('User typing in Date of birth yyddmm input', async () => {
  render(<Input mask="yyyy/mm/dd" />)

  const input = screen.getByRole('textbox')
  await userEvent.type(input, '20250102')

  expect(input).toHaveValue('2025/01/02')
})

test('forwardRef를 통해 Input 요소에 접근할 수 있어야 합니다.', async () => {
  const ref = {
    current: null,
  } as React.MutableRefObject<HTMLInputElement | null>

  render(<Input ref={ref} mask="9999-99-99" value="20001202" />)

  expect(ref.current).not.toBeNull()
  expect(ref.current).toBeInstanceOf(HTMLInputElement)

  const input = screen.getByRole('textbox')
  await userEvent.type(input, '20221202')

  expect(ref.current?.value).toBe('2000-12-02')
})

test('ref를 사용하여 값 변경 확인합니다.', async () => {
  const ref = {
    current: null,
  } as React.MutableRefObject<HTMLInputElement | null>

  render(<Input ref={ref} mask="999-9999-9999" />)

  const input = screen.getByRole('textbox')
  await userEvent.type(input, '01012345678')

  expect(input).toHaveValue('010-1234-5678')
  expect(ref.current?.value).toBe('010-1234-5678')
})
