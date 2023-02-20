import Head from 'next/head'

type Global = 'inherit' | 'initial' | 'revert' | 'unset'
type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

type Color = RGB | RGBA | HEX | Global

export function ThemeColorMeta({
  content = '#ffffff',
}: {
  content?: Color | string
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
