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
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}
