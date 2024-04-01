import { MouseEventHandler } from 'react'

/**
 * 주어진 핸들러에 propagation을 막는 로직을 추가한 핸들러를 반환합니다.
 * TODO: 비슷한 역할을 하는 함수들 통합
 * @param handler
 */
export function createIsolatedClickHandler(
  handler: MouseEventHandler<HTMLButtonElement>,
): MouseEventHandler<HTMLButtonElement> {
  return (e) => {
    e.stopPropagation()
    e.preventDefault()

    handler(e)
  }
}
