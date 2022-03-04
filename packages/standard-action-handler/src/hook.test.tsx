import { renderHook } from '@testing-library/react-hooks'

import Handler from './handler'
import { useStandardActionHandler } from './hook'

jest.mock('@titicaca/router')
jest.mock('./handler')

describe('stadard-action-hanlder hook', () => {
  it('useStandardAction hook 실행 시 Handler가 호출됩니다.', () => {
    const handlerSpy = jest.spyOn(Handler.prototype, 'toFunction')
    renderHook(() => useStandardActionHandler())

    expect(Handler).toHaveBeenCalled()
    expect(handlerSpy).toHaveBeenCalled()
  })
})
