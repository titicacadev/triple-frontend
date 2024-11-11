import { renderHook } from '@testing-library/react'

import { useI18n } from './use-i18n'
import { I18nContext } from './context'
import { I18nValue } from './types'

test('I18nContext가 정의된 경우 값을 반환해야 합니다.', () => {
  const mockValue: I18nValue = {
    defaultLocale: 'ko',
  }

  const { result } = renderHook(() => useI18n(), {
    wrapper: ({ children }) => (
      <I18nContext.Provider value={mockValue}>{children}</I18nContext.Provider>
    ),
  })

  expect(result.current).toBe(mockValue)
})

test('I18nContext가 정의되지 않은 경우 오류를 발생시켜야 합니다.', () => {
  expect(() => {
    renderHook(() => useI18n())
  }).toThrow('I18nContext가 없습니다.')
})
