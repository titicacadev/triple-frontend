import { renderHook, act } from '@testing-library/react-hooks'

import useDebouncedState from './use-debounce'

describe('state debounce 훅', () => {
  it('should return same value with input.', () => {
    const { result } = renderHook(() => useDebouncedState(42, 500))

    expect(result.current.debounced).toBe(42)
  })

  it('should change value after given timeout.', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedState(value, 500),
      {
        initialProps: { value: 42 },
      },
    )

    rerender({ value: 50 })
    expect(result.current.debounced).toBe(42)

    await act(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 500)
        }),
    )

    expect(result.current.debounced).toBe(50)
  })

  it('should clear timeout running clearDebounce callback.', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedState(value, 500),
      {
        initialProps: { value: 42 },
      },
    )

    rerender({ value: 50 })
    expect(result.current.debounced).toBe(42)

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)))
    result.current.clearDebounce()

    await act(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 400)
        }),
    )

    expect(result.current.debounced).toBe(42)
  })
})
