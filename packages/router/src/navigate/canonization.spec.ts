import * as assert from 'assert'

import canonizeTargetAddress from './canonization'

describe('canonizeTargetAddress', () => {
  const resourceId = '79b938c5-1b4c-45e1-9c9f-6551adae38a2'
  const webUrlBase = 'https://triple.guide'

  it('should canonize triple web url to path', () => {
    assert.strictEqual(
      canonizeTargetAddress({
        href: `https://triple.guide/articles/${resourceId}?_triple_no_navbar`,
        webUrlBase,
        expandInlinkStrictly: true,
      }),
      `/articles/${resourceId}?_triple_no_navbar`,
    )
  })

  it('should canonize external url as is', () => {
    const url = 'https://google.com'

    assert.strictEqual(
      canonizeTargetAddress({
        href: url,
        webUrlBase,
        expandInlinkStrictly: true,
      }),
      url,
    )
  })

  it('should canonize inlink url in not-strict mode', () => {
    const path = `/articles/${resourceId}?_triple_no_navbar`

    assert.strictEqual(
      canonizeTargetAddress({
        href: `/inlink?path=${encodeURIComponent(path)}`,
        webUrlBase,
        expandInlinkStrictly: false,
      }),
      path,
    )
  })

  it('should not canonize inlink url in strict mode', () => {
    const path = `/articles/${resourceId}?_triple_no_navbar`

    assert.strictEqual(
      canonizeTargetAddress({
        href: `/inlink?path=${encodeURIComponent(path)}`,
        webUrlBase,
        expandInlinkStrictly: true,
      }),
      `/inlink?path=${encodeURIComponent(path)}`,
    )
  })

  it('should canonize inlink url in strict mode conditionally', () => {
    const path = `/articles/${resourceId}?_triple_no_navbar`

    assert.strictEqual(
      canonizeTargetAddress({
        href: `/inlink?path=${encodeURIComponent(path)}&_web_expand`,
        webUrlBase,
        expandInlinkStrictly: true,
      }),
      path,
    )
  })

  it('should canonize outlink external url', () => {
    const url = 'https://google.com'

    assert.strictEqual(
      canonizeTargetAddress({
        href: `/outlink?url=${encodeURIComponent(url)}`,
        webUrlBase,
        expandInlinkStrictly: true,
      }),
      url,
    )
  })

  it('should canonize outlink internal url', () => {
    const path = `/articles/${resourceId}?_triple_no_navbar`
    const url = `${webUrlBase}${path}`

    assert.strictEqual(
      canonizeTargetAddress({
        href: `/outlink?url=${encodeURIComponent(url)}`,
        webUrlBase,
        expandInlinkStrictly: true,
      }),
      path,
    )
  })
})
