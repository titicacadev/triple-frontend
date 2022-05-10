import { initialScrollPosition, calculateScrollOffset } from './calculates'

jest
  .spyOn(document.documentElement, 'scrollTop', 'get')
  .mockImplementation(() => 100)

jest
  .spyOn(document.documentElement, 'scrollLeft', 'get')
  .mockImplementation(() => 10)

jest
  .spyOn(document.documentElement, 'scrollHeight', 'get')
  .mockImplementation(() => 500)

jest
  .spyOn(document.documentElement, 'clientHeight', 'get')
  .mockImplementation(() => 300)

describe('calculates', () => {
  test('현재 스크롤의 위치 정보를 반환합니다.', () => {
    const { top, left } = initialScrollPosition()

    expect(top).toEqual(100)
    expect(left).toEqual(10)
  })

  test('스크롤 오프셋을 반환합니다.', () => {
    const element = document.createElement('div')

    element.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 120,
      height: 120,
      top: 900,
      right: 0,
      bottom: 0,
      left: 0,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      toJSON: () => {},
    }))

    const scrollOffset = calculateScrollOffset({ element, offset: -52 })

    expect(scrollOffset).toEqual(200)
  })
})
