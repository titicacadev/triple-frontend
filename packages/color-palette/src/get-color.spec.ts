import { getColor } from './get-color'

describe('getColor remove to rgba', () => {
  it('getColor(gray20) => 58, 58, 58, 0.02', () => {
    expect(getColor('gray20')).toBe('58, 58, 58, 0.02')
  })

  it('getColor(gray50) => 58, 58, 58, 0.05', () => {
    expect(getColor('gray50')).toBe('58, 58, 58, 0.05')
  })

  it('getColor(emerald) => 11, 208, 153, 1', () => {
    expect(getColor('emerald')).toBe('13, 208, 175, 1')
  })
})
