/* eslint-disable @typescript-eslint/naming-convention */
import { normalizeQueryKeys } from './index'

describe('normalizeQueryKeys', () => {
  test('camelize', () => {
    expect(
      normalizeQueryKeys({
        check_in: '2020-01-01',
        in_region: 'true',
      }),
    ).toEqual({
      checkIn: '2020-01-01',
      inRegion: 'true',
    })
  })

  test('merge array', () => {
    expect(
      normalizeQueryKeys({
        'agesOfChildren[0]': '5',
      }),
    ).toEqual({
      agesOfChildren: ['5'],
    })

    expect(
      normalizeQueryKeys({
        'agesOfChildren[0]': '5',
        'agesOfChildren[1]': '6',
      }),
    ).toEqual({
      agesOfChildren: ['5', '6'],
    })

    expect(
      normalizeQueryKeys({
        'foo[0]': '{bar: 2}',
      }),
    ).toEqual({
      foo: ['{bar: 2}'],
    })
  })

  test('combinations', () => {
    expect(
      normalizeQueryKeys({
        'ages_of_children[0]': '1',
        'ages_of_children[1]': '3',
      }),
    ).toEqual({
      agesOfChildren: ['1', '3'],
    })
  })
})
