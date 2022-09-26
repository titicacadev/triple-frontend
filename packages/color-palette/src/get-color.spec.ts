import assert from 'assert'

import { getColor } from './get-color'

describe('getColor remove to rgba', () => {
  it('getColor(gray20) => 58, 58, 58, 0.02', () => {
    assert.strictEqual(getColor('gray20'), '58, 58, 58, 0.02')
  })

  it('getColor(gray50) => 58, 58, 58, 0.05', () => {
    assert.strictEqual(getColor('gray50'), '58, 58, 58, 0.05')
  })

  it('getColor(emerald) => 11, 208, 153, 1', () => {
    assert.strictEqual(getColor('emerald'), '13, 208, 175, 1')
  })
})
