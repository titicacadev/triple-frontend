/**
 * 주어진 error가 WebStorage의 용량을 모두 사용했다는 에러인지 확인하는 함수
 * @param error
 */
export function checkQuotaExceededError(error: any): boolean {
  return (
    error instanceof DOMException &&
    // everything except Firefox
    (error.code === 22 ||
      // Firefox
      error.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      error.name === 'QuotaExceededError' ||
      // Firefox
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  )
}

/**
 * WebStorage API를 사용할 수 있는지 확인하는 함수
 * 참고: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
 * @param type 확인할 storage 이름
 * @returns 사용 가능 여부
 */
export function storageAvailable(type: 'sessionStorage' | 'localStorage') {
  let storage

  try {
    storage = window[type]

    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)

    return true
  } catch (e) {
    return (
      checkQuotaExceededError(e) &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}
