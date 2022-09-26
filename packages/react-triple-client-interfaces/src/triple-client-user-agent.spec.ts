import { parseTripleClientUserAgent } from './triple-client-user-agent'

it('should parse Chrome on Windows as a non-app', () => {
  expect(
    parseTripleClientUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    ),
  ).toBeNull()
})

it('should parse Triple Android debug client as an app', () => {
  expect(
    parseTripleClientUserAgent(
      'Mozilla/5.0 (Linux; Android 11; SM-G975N Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.86 Mobile Safari/537.36 Triple-Android/5.3.0-debug',
    ),
  ).toEqual({
    appName: 'Triple-Android',
    appVersion: '5.3.0-debug',
  })
})

it('should parse Triple Android client as an app', () => {
  expect(
    parseTripleClientUserAgent(
      'Mozilla/5.0 (Linux; Android 10; SM-N960N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.92 Mobile Safari/537.36 Triple-Android/5.10.0',
    ),
  ).toEqual({
    appName: 'Triple-Android',
    appVersion: '5.10.0',
  })
})

it('should parse Triple iOS client as an app', () => {
  expect(
    parseTripleClientUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.10.0',
    ),
  ).toEqual({
    appName: 'Triple-iOS',
    appVersion: '5.10.0',
  })
})
