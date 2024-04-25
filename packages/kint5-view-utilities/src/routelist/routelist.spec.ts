import { checkIfRoutable } from './routelist'

describe('checkIfRoutable', () => {
  const regionId = '5eb828fe-cb69-482c-bf37-e166d6cce259'
  const hotelId = 'f20c23b6-8eff-47d7-b25a-032be42c1ea6'

  it('should allow navigation to login path', () => {
    expect(
      checkIfRoutable({
        href: '/login',
      }),
    ).toBe(true)
  })

  it('should allow navigation to external url', () => {
    expect(
      checkIfRoutable({
        href: 'https://google.com',
      }),
    ).toBe(true)
  })

  it('should allow navigation to hotel details without regionId', () => {
    const path = `/hotels/${hotelId}`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })

  it('should allow navigation to hotel details with regionId', () => {
    const path = `/regions/${regionId}/hotels/${hotelId}`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })

  it('should allow navigation to attraction details with regionId', () => {
    const path = `/regions/${regionId}/attractions/${hotelId}`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })

  it('should not allow navigation to attraction list', () => {
    const path = `/regions/${regionId}/attractions`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(false)
  })

  it('should not allow navigation to tna list', () => {
    const path = `/tna/regions/${regionId}/products`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(false)
  })

  it('should allow navigation to tna details', () => {
    const path = `/tna/regions/${regionId}/products/${hotelId}`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })

  it('should allow navigation to hotel hub', () => {
    const path = `/hotels`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })

  it('should allow navigation to hotels list', () => {
    const path = `/hotels/list`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })

  it('should allow navigation to article', () => {
    const path = `/articles/${hotelId}`
    expect(
      checkIfRoutable({
        href: path,
      }),
    ).toBe(true)
  })
})
