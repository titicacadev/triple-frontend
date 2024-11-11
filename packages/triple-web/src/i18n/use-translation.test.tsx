import { renderHook } from '@testing-library/react'

import { useTranslation } from './use-translation'
import { I18nContext } from './context'

test('주어진 키와 언어에 대한 올바른 번역을 반환해야 합니다', () => {
  const { result } = renderHook(() => useTranslation(), {
    wrapper: ({ children }) => (
      <I18nContext.Provider value={{ defaultLocale: 'en' }}>
        {children}
      </I18nContext.Provider>
    ),
  })
  const t = result.current

  expect(t('트리플')).toBe('Triple')
})

test('번역이 누락된 경우 키를 반환해야 합니다', () => {
  const { result } = renderHook(() => useTranslation(), {
    wrapper: ({ children }) => (
      <I18nContext.Provider value={{ defaultLocale: 'en' }}>
        {children}
      </I18nContext.Provider>
    ),
  })
  const t = result.current

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(t('missing-key' as any)).toBe('missing-key')
})

test('값을 올바르게 보간해야 합니다', () => {
  const { result } = renderHook(() => useTranslation(), {
    wrapper: ({ children }) => (
      <I18nContext.Provider value={{ defaultLocale: 'en' }}>
        {children}
      </I18nContext.Provider>
    ),
  })
  const t = result.current

  expect(t('{{reviewsCount}}개의 리뷰', { reviewsCount: '100' })).toBe(
    '100reviews',
  )
})

test('언어가 설정되지 않은 경우 기본 언어를 사용해야 합니다', () => {
  const { result } = renderHook(() => useTranslation(), {
    wrapper: ({ children }) => (
      <I18nContext.Provider value={{ defaultLocale: 'ko' }}>
        {children}
      </I18nContext.Provider>
    ),
  })
  const t = result.current

  expect(t('트리플')).toBe('트리플')
})
