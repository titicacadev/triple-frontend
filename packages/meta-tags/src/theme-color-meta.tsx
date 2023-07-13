import Head from 'next/head'

import { ThemeColor } from './types'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 createThemeColorMeta를 사용해주세요
 */
export function ThemeColorMeta({
  content = '#1FC1B6',
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
