import { describe, it } from 'mocha'
import assert from 'assert'

import { injectContentSource, injectUTMContext } from './param-injectors'

describe('injectContentSource', function() {
  it('should make object with path made of content source.', function() {
    assert.deepStrictEqual(
      injectContentSource({
        regionId: '1',
        type: 'article',
        id: '1',
      }),
      {
        path: '/regions/1/articles/1',
      },
    )
  })
})

describe('injectUTMContext', function() {
  it('should make object with path made of utm context.', function() {
    assert.deepStrictEqual(
      injectUTMContext({
        source: 'test1',
        medium: 'search_ad',
        campaign: 'winter_sale',
        term: 'test',
      }),
      {
        campaign: 'winter_sale',
        adSet: 'test1_search_ad',
        ad: 'test',
        channel: 'test1_search_ad',
      },
    )
  })

  it('should ignore empty string', function() {
    assert.deepStrictEqual(
      injectUTMContext({
        source: '',
        medium: '',
        campaign: '',
        term: '',
      }),
      {},
    )
  })

  it('should ignore undefiend parameter', function() {
    assert.deepStrictEqual(injectUTMContext(undefined), {})
  })
})
