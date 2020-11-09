import assert from 'assert'

import { checkIfRoutable, generateTargetAddressOnPublic } from './routelist'

describe('checkIfRoutable', () => {
  const regionId = '5eb828fe-cb69-482c-bf37-e166d6cce259'
  const hotelId = 'f20c23b6-8eff-47d7-b25a-032be42c1ea6'

  it('should allow navigation to login path', () => {
    assert.ok(
      checkIfRoutable({
        href: '/login',
      }),
    )
  })

  it('should allow navigation to external url', () => {
    assert.ok(
      checkIfRoutable({
        href: 'https://google.com',
      }),
    )
  })

  it('should allow navigation to hotel details without regionId', () => {
    const path = `/hotels/${hotelId}`

    assert.ok(
      checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should allow navigation to hotel details with regionId', () => {
    const path = `/regions/${regionId}/hotels/${hotelId}`

    assert.ok(
      checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should allow navigation to attraction details with regionId', () => {
    const path = `/regions/${regionId}/attractions/${hotelId}`

    assert.ok(
      checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should not allow navigation to attraction list', () => {
    const path = `/regions/${regionId}/attractions`

    assert.ok(
      !checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should not allow navigation to tna list', () => {
    const path = `/tna/regions/${regionId}/products`

    assert.ok(
      !checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should not allow navigation to tna details', () => {
    const path = `/tna/regions/${regionId}/products/${hotelId}`

    assert.ok(
      !checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should allow navigation to hotel hub', () => {
    const path = `/hotels`

    assert.ok(
      checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should allow navigation to hotels list', () => {
    const path = `/hotels/list`

    assert.ok(
      checkIfRoutable({
        href: path,
      }),
    )
  })

  it('should allow navigation to article', () => {
    const path = `/articles/${hotelId}`

    assert.ok(
      checkIfRoutable({
        href: path,
      }),
    )
  })
})

describe('generateTargetAddressOnPublic', () => {
  const webUrlBase = 'https://triple.guide'
  const hotelId = 'f20c23b6-8eff-47d7-b25a-032be42c1ea6'
  const path = `/hotels/${hotelId}?_triple_no_navbar`

  it('should convert expandable inlink into expanded url', () => {
    const inlink = `/inlink?path=${encodeURIComponent(path)}&_web_expand`

    assert.strictEqual(
      generateTargetAddressOnPublic({ webUrlBase, href: inlink }),
      path,
    )
  })

  it('should not convert non-expandable inlink', () => {
    const inlink = `/inlink?path=${encodeURIComponent(path)}`

    assert.strictEqual(
      generateTargetAddressOnPublic({ webUrlBase, href: inlink }),
      inlink,
    )
  })

  it('should convert outlink with web url base into path', () => {
    const path = `/hotels/${hotelId}?_triple_no_navbar`
    const url = `${webUrlBase}${path}`
    const outlink = `/outlink?url=${encodeURIComponent(url)}`

    assert.strictEqual(
      generateTargetAddressOnPublic({ webUrlBase, href: outlink }),
      path,
    )
  })

  it('should convert external outlink into plain url', () => {
    const url = 'https://google.com'
    const outlink = `/outlink?url=${encodeURIComponent(url)}`

    assert.strictEqual(
      generateTargetAddressOnPublic({ webUrlBase, href: outlink }),
      url,
    )
  })

  it('should not convert a plain url', () => {
    const url = 'https://google.com'

    assert.strictEqual(
      generateTargetAddressOnPublic({ webUrlBase, href: url }),
      url,
    )
  })

  it('should not convert a plain path', () => {
    const path = `/hotels/${hotelId}?_triple_no_navbar`

    assert.strictEqual(
      generateTargetAddressOnPublic({ webUrlBase, href: path }),
      path,
    )
  })
})
