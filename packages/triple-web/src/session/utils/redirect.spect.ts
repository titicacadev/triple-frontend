import { getRedirectUrl } from './redirect'

describe('getRedirectUrl', () => {
  window.location.href = 'https://tripel.guide?query=test'
  document.cookie = 'x-triple-web-device-id=1234'

  it('should return redirect url with returnUrl and deviceId', () => {
    const result = getRedirectUrl('https://example.com')

    expect(result).toBe(
      'https://example.com?returnUrl=https%3A%2F%2Ftripel.guide%3Fquery%3Dtest&deviceId=1234',
    )
  })
})
