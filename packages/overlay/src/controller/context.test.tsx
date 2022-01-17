import { renderHook, act } from '@testing-library/react-hooks'

import { OverlayControllerProvider, useOverlayController } from './context'

const nextRouterPush = jest.fn()
const nextRouterBack = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: nextRouterPush,
    back: nextRouterBack,
  }),
}))

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

test('useOverlayController의 show를 호출하면 isVisible이 true로 바뀌고, next/router의 push를 호출합니다.', () => {
  const targetHash = 'target.hash'
  const { result } = renderHook(useOverlayController, {
    initialProps: targetHash,
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.show()
  })

  expect(result.current.isVisible).toBe(true)
  expect(nextRouterPush).toBeCalledWith(`#${targetHash}`)
})

test('useOverlayController의 hide를 호출하면 true였던 isVisible이 false로 바뀌고, next/router의 back을 호출합니다.', () => {
  const targetHash = 'target.hash'
  const { result } = renderHook(useOverlayController, {
    initialProps: targetHash,
    wrapper: OverlayControllerProvider,
  })

  act(() => {
    result.current.show()
    result.current.hide()
  })

  expect(result.current.isVisible).toBe(false)
  expect(nextRouterBack).toBeCalled()
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
