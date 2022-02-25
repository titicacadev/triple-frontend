import { renderHook } from '@testing-library/react-hooks'

import { useInterval } from './use-interval'

describe('useInterval hook test', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('delay가 null인 경우 setInterval을 실행하지 않는다.', () => {
    const callbackFn = jest.fn()
    const intervalSpy = jest.spyOn(window, 'setInterval')

    renderHook(() => useInterval(callbackFn, null))

    expect(intervalSpy).not.toHaveBeenCalled()
  })

  test('delay가 null이 아닌 경우 setInterval이 실행되고 delay ms 후 콜백 함수가 실행된다.', () => {
    const callbackFn = jest.fn()
    const intervalSpy = jest.spyOn(window, 'setInterval')
    const delay = 1000

    renderHook(() => useInterval(callbackFn, delay))

    expect(intervalSpy).toHaveBeenCalledTimes(1)
    expect(intervalSpy).toHaveBeenCalledWith(expect.any(Function), delay)

    jest.advanceTimersByTime(delay)

    expect(intervalSpy).toHaveBeenCalledTimes(1)
    expect(callbackFn).toHaveBeenCalled()
  })

  test('unmount 시 clearTimeout 실행되고 콜백 함수는 실행되지 않는다.', () => {
    const callbackFn = jest.fn()
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')

    const { unmount } = renderHook(() => useInterval(callbackFn, 100))

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
    expect(callbackFn).toHaveBeenCalledTimes(0)
  })

  test('실행 중 callback function 변경되어도 delay 간격으로 callback 함수 실행한다.', () => {
    const callbackFn = jest.fn()
    const delay = 500
    const intervalSpy = jest.spyOn(window, 'setInterval')
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const initialProps = { callbackFn, delay }
    const { rerender } = renderHook<typeof initialProps, void>(
      (props) => useInterval(props.callbackFn, props.delay),
      { initialProps },
    )

    jest.advanceTimersByTime(delay / 2)

    const newCallbackFn = jest.fn()

    rerender({ callbackFn: newCallbackFn, delay })

    expect(clearIntervalSpy).not.toHaveBeenCalled()
    expect(intervalSpy).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(delay / 2)

    expect(callbackFn).not.toHaveBeenCalled()
    expect(newCallbackFn).toHaveBeenCalled()

    jest.advanceTimersByTime(delay / 2)
    expect(newCallbackFn).toHaveBeenCalledTimes(1)
  })

  test('delay 값이 바뀌었을 때 setInterval 재정의한다.', () => {
    const callbackFn = jest.fn()
    let delay = 500
    const intervalSpy = jest.spyOn(window, 'setInterval')
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const { rerender } = renderHook(() => {
      useInterval(callbackFn, delay)
    })

    delay = 1000

    rerender()

    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(intervalSpy).toHaveBeenCalledTimes(2)
  })
})
