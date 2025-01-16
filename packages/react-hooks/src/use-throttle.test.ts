import { act, renderHook } from '@testing-library/react'

import { useThrottle, useThrottledState } from './use-throttle'

describe('throttle state hook', () => {
  it('should return same value with input.', () => {
    const { result } = renderHook(() => useThrottledState(42, 500))
    expect(result.current.throttled).toBe(42)
  })

  it('should not change value before given timeout.', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledState(value, 500),
      {
        initialProps: { value: 42 },
      },
    )
    rerender({ value: 50 })
    await act(() => new Promise((resolve) => setTimeout(resolve, 500)))
    expect(result.current.throttled).toBe(42)
  })

  it('should change value after given timeout.', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledState(value, 500),
      {
        initialProps: { value: 42 },
      },
    )
    await act(() => new Promise((resolve) => setTimeout(resolve, 500)))
    rerender({ value: 50 })

    expect(result.current.throttled).toBe(42)
  })
})

describe('throttle hook', () => {
  it('should execute function when first called.', () => {
    const fn = jest.fn()
    const { result } = renderHook(() =>
      useThrottle<Record<string, never>>(fn, 500),
    )
    act(() => result.current({}))
    expect(fn).toHaveBeenCalled()
  })

  it('should execute function once after given timeout.', async () => {
    const fn = jest.fn()
    const { result } = renderHook(() =>
      useThrottle<Record<string, never>>(fn, 500),
    )
    act(() => result.current({}))
    expect(fn).toHaveBeenCalledTimes(1)
    await act(() => new Promise((resolve) => setTimeout(resolve, 200)))
    act(() => result.current({}))
    await act(() => new Promise((resolve) => setTimeout(resolve, 300)))
    act(() => result.current({}))
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
