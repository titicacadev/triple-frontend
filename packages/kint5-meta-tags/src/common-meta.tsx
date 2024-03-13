import Head from 'next/head'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 commonMeta를 사용해주세요
 */
export function CommonMeta() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"
      />
      <meta
        name="msapplication-TileImage"
        content="https://triple.global/icons/icon-192x192.png"
      />
      <meta name="msapplication-TileColor" content="#7743EE" />
      <link
        rel="apple-touch-icon-precomposed"
        href="https://triple.global/icons/icon-192x192.png"
      />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}
