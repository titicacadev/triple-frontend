import Head from 'next/head'

export function ThemeColorMeta({ content = '#ffffff' }: { content: string }) {
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
