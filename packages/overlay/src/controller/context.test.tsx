import { renderHook, act } from '@testing-library/react-hooks'

import { OverlayControllerProvider, useOverlayController } from './context'

const mockLocation = {
  hashValue: '',
  get hash() {
    if (this.hashValue === '#') {
      return ''
    }

    return this.hashValue
  },
  set hash(hash: string) {
    if (hash.startsWith('#')) {
      this.hashValue = hash
    } else {
      this.hashValue = `#${hash}`
    }
  },
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
delete window.location
// @ts-ignore
window.location = mockLocation
/* eslint-enable @typescript-eslint/ban-ts-comment */

const spySetHash = jest.spyOn(window.location, 'hash', 'set')

beforeEach(() => {
  mockLocation.hashValue = ''
})

afterEach(() => {
  spySetHash.mockClear()
})

test('OverlayControllerProvider가 없을 때 useOverlayController를 호출하면 오류를 냅니다.', () => {
  const {
    result: { error },
  } = renderHook(useOverlayController)

  expect(error.message).toBe('OverlayControllerContext의 Provider가 없습니다.')
})

test('useOverlayController는 isVisible, show, hide 속성을 반환합니다.', () => {
  const {
    result: { current },
  } = renderHook(useOverlayController, {
    wrapper: OverlayControllerProvider,
  })

  expect(current).toEqual(
    expect.objectContaining({
      isVisible: expect.any(Boolean),
      show: expect.any(Function),
      hide: expect.any(Function),
    }),
  )
})

test('useOverlayController의 show를 호출하면 isVisible이 true로 바뀌고, location.hash가 바뀝니다.', () => {
  const targetHash = 'target.hash'
  const { result } = renderHook(useOverlayController, {
    initialProps: targetHash,
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.show()
  })

  expect(result.current.isVisible).toBe(true)
  expect(window.location.hash).toBe(`#${targetHash}`)
})

test('useOverlayController의 hide를 호출하면 true였던 isVisible이 false로 바뀌고, location.hash가 빈 문자열로 바뀝니다.', () => {
  const targetHash = 'target.hash'
  const { result } = renderHook(useOverlayController, {
    initialProps: targetHash,
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.show()
  })

  act(() => {
    result.current.hide()
  })

  expect(result.current.isVisible).toBe(false)
  expect(window.location.hash).toBe('')
})

test('여러 개의 오버레이를 연속해서 표시할 수 있어야 합니다.', () => {
  const overlay1Hash = 'this.is.overlay.one'
  const overlay2Hash = 'this.is.overlay.two'

  function useCombinedOverlay() {
    const overlay1 = useOverlayController(overlay1Hash)
    const overlay2 = useOverlayController(overlay2Hash)

    return {
      visible: overlay1.isVisible
        ? 'overlay1'
        : overlay2.isVisible
        ? 'overlay2'
        : 'none',
      overlay1,
      overlay2,
    }
  }

  const { result } = renderHook(useCombinedOverlay, {
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.overlay1.show()
    result.current.overlay1.hide()
    result.current.overlay2.show()
  })

  expect(result.current.visible).toBe('overlay2')

  act(() => {
    result.current.overlay1.show()
  })

  expect(result.current.visible).toBe('overlay1')
})

test('열린 오버레이를 한 번 더 열어도 아무 행동을 하지 않아야 합니다.', () => {
  const targetHash = 'target.hash'
  const { result } = renderHook(useOverlayController, {
    initialProps: targetHash,
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.show()
  })

  act(() => {
    result.current.show()
  })

  expect(result.current.isVisible).toBe(true)
})

test('닫힌 오버레이를 한 번 더 닫아도 아무 행동을 하지 않아야 합니다.', () => {
  const targetHash = 'target.hash'
  const { result } = renderHook(useOverlayController, {
    initialProps: targetHash,
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.hide()
  })

  expect(result.current.isVisible).toBe(false)
  expect(spySetHash).toBeCalledTimes(0)

  act(() => {
    result.current.show()
  })

  act(() => {
    result.current.hide()
  })

  act(() => {
    result.current.hide()
  })

  expect(result.current.isVisible).toBe(false)
  expect(spySetHash).toBeCalledTimes(2)
})
