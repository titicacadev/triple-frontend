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
