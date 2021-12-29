import assert from 'assert'

import qs from 'qs'

import { parseUrl, generateUrl } from './url'

describe('parseUrl', function () {
  it('should parse http url', function () {
    assert.deepStrictEqual(parseUrl('http://triple.guide'), {
      href: 'http://triple.guide',
      scheme: 'http',
      host: 'triple.guide',
      path: '',
      query: '',
      hash: '',
    })
  })

  it('should parse https url', function () {
    assert.deepStrictEqual(parseUrl('https://triple.guide'), {
      href: 'https://triple.guide',
      scheme: 'https',
      host: 'triple.guide',
      path: '',
      query: '',
      hash: '',
    })
  })

  it('should parse url with custom scheme', function () {
    assert.deepStrictEqual(parseUrl('triple://triple.guide'), {
      href: 'triple://triple.guide',
      scheme: 'triple',
      host: 'triple.guide',
      path: '',
      query: '',
      hash: '',
    })
  })

  it('should parse simple url with query', function () {
    assert.deepStrictEqual(
      parseUrl('https://triple.guide?q=1&_triple_no_navbar'),
      {
        href: 'https://triple.guide?q=1&_triple_no_navbar',
        scheme: 'https',
        host: 'triple.guide',
        path: '',
        query: 'q=1&_triple_no_navbar',
        hash: '',
      },
    )
  })

  it('should parse simple url with hash', function () {
    assert.deepStrictEqual(parseUrl('https://triple.guide#show-me-the-money'), {
      href: 'https://triple.guide#show-me-the-money',
      scheme: 'https',
      host: 'triple.guide',
      path: '',
      query: '',
      hash: 'show-me-the-money',
    })
  })

  it('should parse poi page', function () {
    assert.deepStrictEqual(
      parseUrl(
        'https://triple.guide/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
      ),
      {
        href: 'https://triple.guide/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        scheme: 'https',
        host: 'triple.guide',
        path: '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: '',
      },
    )
  })

  it('should parse poi page with hash', function () {
    assert.deepStrictEqual(
      parseUrl(
        'https://triple.guide/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#reviews',
      ),
      {
        href: 'https://triple.guide/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#reviews',
        scheme: 'https',
        host: 'triple.guide',
        path: '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: 'reviews',
      },
    )
  })

  it('should parse relative path of poi page', function () {
    assert.deepStrictEqual(
      parseUrl(
        '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
      ),
      {
        href: '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        scheme: '',
        host: '',
        path: '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: '',
      },
    )
  })

  it('should parse app url of poi page', function () {
    assert.deepStrictEqual(
      parseUrl(
        'triple:///regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
      ),
      {
        href: 'triple:///regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        scheme: 'triple',
        host: '',
        path: '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: '',
      },
    )
  })

  it('should parse app url of poi page with hash', function () {
    assert.deepStrictEqual(
      parseUrl(
        'triple:///regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#reviews',
      ),
      {
        href: 'triple:///regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#reviews',
        scheme: 'triple',
        host: '',
        path: '/regions/5b13316d-0bfc-4f90-93a1-69ff5a6d1f48/attractions/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: 'reviews',
      },
    )
  })

  it('should parse article page', function () {
    assert.deepStrictEqual(
      parseUrl(
        'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
      ),
      {
        href: 'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        scheme: 'https',
        host: 'triple.guide',
        path: '/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: '',
      },
    )
  })

  it('should parse outlink', function () {
    assert.deepStrictEqual(
      parseUrl(
        '/outlink?url=https%3A%2F%2Ftriple.guide%2Farticles%2F68dc3c17-01e9-45d2-aa04-a2891d5c7b69%3F_triple_no_navbar%26_triple_swipe_to_close',
      ),
      {
        href: '/outlink?url=https%3A%2F%2Ftriple.guide%2Farticles%2F68dc3c17-01e9-45d2-aa04-a2891d5c7b69%3F_triple_no_navbar%26_triple_swipe_to_close',
        scheme: '',
        host: '',
        path: '/outlink',
        query:
          'url=https%3A%2F%2Ftriple.guide%2Farticles%2F68dc3c17-01e9-45d2-aa04-a2891d5c7b69%3F_triple_no_navbar%26_triple_swipe_to_close',
        hash: '',
      },
    )
  })

  it('should trim passed url before parsing', function () {
    assert.deepStrictEqual(
      parseUrl(
        ' https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3\t ',
      ),
      {
        href: 'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        scheme: 'https',
        host: 'triple.guide',
        path: '/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: '',
        hash: '',
      },
    )
  })
})

describe('generateUrl', function () {
  it('should generate url with scheme and host only', function () {
    assert.strictEqual(
      generateUrl({ scheme: 'https', host: 'triple.guide' }),
      'https://triple.guide',
    )
  })

  it('should generate url with scheme, host and path only', function () {
    assert.strictEqual(
      generateUrl({
        scheme: 'https',
        host: 'triple.guide',
        path: '/announcements',
      }),
      'https://triple.guide/announcements',
    )
  })

  it('should generate url with scheme and path only', function () {
    assert.strictEqual(
      generateUrl({ scheme: 'triple', path: '/announcements' }),
      'triple:///announcements',
    )
  })

  it('should generate url with all elements', function () {
    assert.strictEqual(
      generateUrl({
        scheme: 'https',
        host: 'triple.guide',
        path: '/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3',
        query: 'in_region=true',
        hash: 'reviews',
      }),
      'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3?in_region=true#reviews',
    )
  })

  it('should generate url with base url', function () {
    assert.strictEqual(
      generateUrl(
        { query: 'in_region=true', hash: 'reviews' },
        'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#nearby',
      ),
      'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3?in_region=true#reviews',
    )
  })

  it('should erase scheme and host', () => {
    expect(
      generateUrl(
        {
          scheme: undefined,
          host: undefined,
        },
        'https://triple.guide/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#nearby',
      ),
    ).toBe('/articles/e62129b9-ea71-4d3a-bcd8-a2af12566ca3#nearby')
  })

  it('should merge query in base URL', () => {
    const [, query] = generateUrl(
      {
        query: 'asdf=asdf',
      },
      '/path?someQuery=value',
    ).split('?')

    expect(query).toMatch(/(?=.*asdf=asdf)(?=.*someQuery=value)/)
  })

  it('should override base URL query with element query', () => {
    const [, query] = generateUrl(
      {
        query: 'asdf=asdf',
      },
      '/path?asdf=value',
    ).split('?')

    expect(query).toMatch(/(?=.*asdf=asdf)/)
  })

  it('should preserve key only query', () => {
    expect(generateUrl({}, '/path?_triple_no_navbar')).toBe(
      '/path?_triple_no_navbar',
    )
    expect(generateUrl({ query: '_triple_no_navbar' })).toBe(
      '?_triple_no_navbar',
    )
  })

  it('should format array for comma', () => {
    const query1 = qs.stringify(
      {
        adult: '1',
        child: '0',
        infant: '0',
        searchKeys: [
          'LJ_3ea1403a-d8ec-42c7-bf0e-f2e7f5e43e19_0',
          'TW_dfc4cef3-c6fa-4c7b-88ed-cdd7f57ad501_0',
        ],
      },
      { indices: false, skipNulls: true },
    )

    expect(
      generateUrl({
        query: query1,
      }),
    ).toBe(`?${query1}`)

    const query2 = qs.stringify(
      {
        adult: '1',
        child: '0',
        infant: '0',
        searchKeys: [
          'LJ_3ea1403a-d8ec-42c7-bf0e-f2e7f5e43e19_0',
          'TW_dfc4cef3-c6fa-4c7b-88ed-cdd7f57ad501_0',
        ],
      },
      { skipNulls: true },
    )

    expect(
      generateUrl(
        {
          query: query2,
        },
        undefined,
        { arrayFormat: 'comma' },
      ),
    ).toBe(`?${query2}`)
  })

  it('should preserve array format indices', () => {
    const query = qs.stringify(
      { places: ['a', 'b'] },
      { arrayFormat: 'indices' },
    )
    expect(generateUrl({ query })).toBe(`?${query}`)
  })

  it('should preserve array format brackets', () => {
    const query = qs.stringify(
      { places: ['a', 'b'] },
      { arrayFormat: 'brackets' },
    )
    expect(generateUrl({ query })).toBe(`?${query}`)
  })

  it('should preserve array format repeat', () => {
    const query = qs.stringify(
      { places: ['a', 'b'] },
      { arrayFormat: 'repeat' },
    )
    expect(generateUrl({ query })).toBe(`?${query}`)
  })

  it('should preserve array format comma', () => {
    const query = qs.stringify({ places: ['a', 'b'] }, { arrayFormat: 'comma' })
    expect(generateUrl({ query })).toBe(`?${query}`)
  })
})
