import { describe, it } from 'mocha'
import assert from 'assert'

import { formatNumber } from './format-number'

describe('formatNumber', function() {
  it('should format number to string with comma', function() {
    assert.strictEqual(formatNumber(0), '0')
    assert.strictEqual(formatNumber(123), '123')
    assert.strictEqual(formatNumber(24000), '24,000')
    assert.strictEqual(formatNumber(1234567), '1,234,567')
    assert.strictEqual(formatNumber(-1234567), '-1,234,567')
  })

  it('should format string number with comma', function() {
    assert.strictEqual(formatNumber('0'), '0')
    assert.strictEqual(formatNumber('123'), '123')
    assert.strictEqual(formatNumber('24000'), '24,000')
    assert.strictEqual(formatNumber('1234567'), '1,234,567')
    assert.strictEqual(formatNumber('-1234567'), '-1,234,567')
  })

  it('should return empty string when parameter is falsy value except number zero', function() {
    assert.strictEqual(formatNumber(''), '')
    assert.strictEqual(formatNumber(null), '')
    assert.strictEqual(formatNumber(undefined), '')
  })
})
