import Head from 'next/head'

import { ThemeColor } from './types'
import { DEFAULT_THEME_COLOR } from './constants'

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
