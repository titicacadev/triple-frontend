import { checkClientApp } from './check-client-app'

describe('checkClientApp', () => {
  test('안드로이드 앱 user agent 문자열에 대해 true를 반환해야 합니다', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 Triple-Android/7.4.2'
    expect(checkClientApp(userAgent)).toBe(true)
  })

  test('iOS 앱 user agent 문자열에 대해 true를 반환해야 합니다', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 Triple-iOS/7.4.2'
    expect(checkClientApp(userAgent)).toBe(true)
  })

  test('트리플 앱 정보가 없는 user agent 문자열에 대해 false를 반환해야 합니다', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    expect(checkClientApp(userAgent)).toBe(false)
  })

  test('빈 user agent 문자열에 대해 false를 반환해야 합니다', () => {
    const userAgent = ''
    expect(checkClientApp(userAgent)).toBe(false)
  })
})
