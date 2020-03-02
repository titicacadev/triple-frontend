import assert from 'assert'

import { describe, it } from 'mocha'

import { generateUserAgentValues } from './user-agent-context'

describe('generateUserAgentValues', () => {
  it('should parse Chrome on Windows as public', () => {
    assert.ok(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).isPublic,
    )
  })

  it('should parse Triple native client as not public', () => {
    assert.ok(
      !generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).isPublic,
    )
  })

  it('should not parse Chrome on Windows as mobile', () => {
    assert.ok(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).isMobile === false,
    )
  })
  it('should parse iOS client as mobile', () => {
    assert.ok(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ),
    )
  })

  it('should parse Chrome on Windows as an Windows device', () => {
    assert.strict.deepEqual(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).os,
      {
        name: 'Windows',
        version: '10',
      },
    )
  })

  it('should parse iOS Triple native client as an iOS device', () => {
    assert.strict.deepEqual(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).os,
      {
        name: 'iOS',
        version: '12.3.1',
      },
    )
  })

  it('should parse Chrome on Windows as an external app', () => {
    assert.strict.deepEqual(
      generateUserAgentValues(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      ).app,
      null,
    )
  })

  it('should parse iOS Triple native client properly', () => {
    assert.strict.deepEqual(
      generateUserAgentValues(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
      ).app,
      {
        name: 'Triple-iOS',
        version: '3.0.0',
      },
    )
  })
})
