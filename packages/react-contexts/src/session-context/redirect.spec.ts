import { getRedirectUrl } from './redirect'

describe('getRedirectUrl', () => {
  const mockUrl = 'https://triple.guide'

  Object.defineProperty(window, 'location', {
    value: new URL(mockUrl),
  })

  it('should return redirect url with redirect query string', () => {
    const result = getRedirectUrl('https://example.com')
    expect(result).toBe(
      `https://example.com?redirectUrl=${encodeURIComponent(
        window.location.href,
      )}`,
    )
  })

  it('should return redirect url with redirect query string and original href query string', () => {
    const result = getRedirectUrl('https://example.com?code=123')
    expect(result).toBe(
      `https://example.com?code=123&redirectUrl=${encodeURIComponent(
        window.location.href,
      )}`,
    )
  })
})
