/* eslint-disable no-useless-computed-key */
import { Metadata } from 'next'

import { ThemeColor } from '../../types'
import { DEFAULT_THEME_COLOR } from '../../constants'

/**
 * ThemeColorMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function generateThemeColorMeta({
  content = DEFAULT_THEME_COLOR,
}: {
  content?: ThemeColor | string
} = {}): Metadata {
  return {
    other: {
      ['msapplication-TileColor']: content,
    },
  }
}
