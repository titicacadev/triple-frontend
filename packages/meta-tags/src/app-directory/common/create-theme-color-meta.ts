/* eslint-disable no-useless-computed-key */
import { Metadata } from 'next'

import { ThemeColor } from '../../types'

/**
 * ThemeColorMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function createThemeColorMeta({
  content = '#1FC1B6',
}: {
  content?: ThemeColor | string
} = {}): Metadata {
  return {
    other: {
      ['msapplication-TileColor']: content,
    },
  }
}
