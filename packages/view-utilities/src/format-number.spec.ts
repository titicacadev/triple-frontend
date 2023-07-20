import { formatNumber } from './format-number'

describe('formatNumber', () => {
  it('should format number to string with comma', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(123)).toBe('123')
    expect(formatNumber(24000)).toBe('24,000')
    expect(formatNumber(1234567)).toBe('1,234,567')
    expect(formatNumber(-1234567)).toBe('-1,234,567')
  })

  it('should format string number with comma', () => {
    expect(formatNumber('0')).toBe('0')
    expect(formatNumber('123')).toBe('123')
    expect(formatNumber('24000')).toBe('24,000')
    expect(formatNumber('1234567')).toBe('1,234,567')
    expect(formatNumber('-1234567')).toBe('-1,234,567')
  })

  it('should return empty string when the parameter is a falsy value except for number zero', () => {
    expect(formatNumber('')).toBe('')
    expect(formatNumber(null)).toBe('')
    expect(formatNumber(undefined)).toBe('')
  })

  it('should not add commas in decimals', () => {
    expect(formatNumber(0.1)).toBe('0.1')
    expect(formatNumber(0.1345)).toBe('0.1345')
    expect(formatNumber(123214.324234)).toBe('123,214.324234')
  })
})
