import * as assert from 'assert'

import { checkIfRoutable } from './routelist'

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

  it('should allow navigation to tna details', () => {
    const path = `/tna/regions/${regionId}/products/${hotelId}`

    assert.ok(
      checkIfRoutable({
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
