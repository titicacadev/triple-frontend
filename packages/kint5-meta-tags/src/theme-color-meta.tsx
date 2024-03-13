import Head from 'next/head'

import { ThemeColor } from './types'
import { DEFAULT_THEME_COLOR } from './constants'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 generateThemeColorMeta를 사용해주세요
 */
export function ThemeColorMeta({
  content = DEFAULT_THEME_COLOR,
}: {
  content?: ThemeColor | string
}) {
  return (
    <Head>
      <meta key="theme:color" name="theme-color" content={content} />
      <meta
        key="msapplication:tileColor"
        name="msapplication-TileColor"
        content={content}
      />
    </Head>
  )
}
