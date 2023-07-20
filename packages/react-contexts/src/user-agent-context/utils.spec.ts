import { generateUserAgentValues } from './utils'

describe('generateUserAgentValues', () => {
  it('should parse Chrome on Windows as public', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).isPublic,
    ).toBe(true)
  })

  it('should parse Triple native client as not public', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).isPublic,
    ).toBe(false)
  })

  it('should not parse Chrome on Windows as mobile', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).isMobile,
    ).toBe(false)
  })

  it('should parse iOS client as mobile', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).isMobile,
    ).toBe(true)
  })

  it('should parse Chrome on Windows as an Windows device', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).os,
    ).toEqual({
      name: 'Windows',
      version: '10',
    })
  })

  it('should parse iOS Triple native client as an iOS device', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).os,
    ).toEqual({
      name: 'iOS',
      version: '12.3.1',
    })
  })

  it('should parse Chrome on Windows as an external app', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).app,
    ).toBeNull()
  })

  it('should parse iOS Triple native client properly', () => {
    expect(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).app,
    ).toEqual({
      name: 'Triple-iOS',
      version: '3.0.0',
    })
  })
})
