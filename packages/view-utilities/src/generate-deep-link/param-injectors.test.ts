import {
  injectContentSource,
  injectIsSearchAd,
  injectUTMContext,
} from './param-injectors'

describe('injectContentSource', () => {
  test('should make object with path made of content source.', () => {
    expect(
      injectContentSource({
        regionId: '1',
        type: 'article',
        id: '1',
      }),
    ).toEqual({
      path: '/regions/1/articles/1',
    })
  })
})

describe('injectUTMContext', () => {
  test('should make object with path made of utm context.', () => {
    expect(
      injectUTMContext({
        source: 'test1',
        campaign: 'winter_sale',
        term: 'test',
        content: 'video',
      }),
    ).toEqual({
      channel: 'test1',
      campaign: 'winter_sale',
      keywords: 'test',
      ad: 'video',
    })
  })

  test('should ignore empty string', () => {
    expect(
      injectUTMContext({
        source: '',
        campaign: '',
        term: '',
        content: '',
      }),
    ).toEqual({})
  })

  test('should ignore undefiend parameter', () => {
    expect(injectUTMContext(undefined)).toEqual({})
  })
})

test('injectSearchAd', () => {
  expect(
    injectIsSearchAd({
      medium: 'search_ad',
    }),
  ).toEqual({
    pid: 'searchad',
  })
})
