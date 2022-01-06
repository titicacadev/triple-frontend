import React, { useEffect } from 'react'
import IntersectionObserver from '@titicaca/intersection-observer'
import '@testing-library/jest-dom'
import 'jest-canvas-mock'
import renderer from 'react-test-renderer'

jest.mock('@titicaca/intersection-observer')

test('activeId가 일치합니다.', () => {
  const IntersectionObserver = prepareTest()

  /* prepareTest의 IntersectionObserver에서 div를 래핑하기에 a태그를 사용 */
  const tree = renderer.create(
    <IntersectionObserver onChange={jest.fn()}>
      <a id="a-element">테스트 태그</a>
    </IntersectionObserver>,
  ).root

  expect(tree.findByProps({ id: 'a-element' })).toStrictEqual(
    tree.findByType('a'),
  )
})

test('intersectionObserver 동작을 체크합니다.', () => {
  const IntersectionObserver = prepareTest()

  const tree = renderer.create(
    <IntersectionObserver onChange={jest.fn()}>
      <div id="div-element" />
    </IntersectionObserver>,
  ).root

  expect(tree.findByProps({ id: 'div-element' }))
})

function prepareTest() {
  ;(
    IntersectionObserver as unknown as jest.MockedFunction<
      typeof IntersectionObserver
    >
  ).mockImplementation(({ onChange, children }) => {
    useEffect(() => {
      onChange({} as IntersectionObserverEntry, jest.fn())
    }, [onChange])

    return <div>{children}</div>
  })
  return IntersectionObserver
}
