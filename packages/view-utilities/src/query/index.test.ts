import { StrictQuery } from './index'

describe('query utils', () => {
  it('should determine query string value to string type.', () => {
    // next.js의 query 형식
    const query: { [key: string]: string | string[] | undefined } = {
      regionId: 'MOCK_REGION_ID',
      multipleQueries: ['a', 'b', 'c'],
    }

    const { regionId, hotelId, multipleQueries } = StrictQuery.parse(query)
      .string('regionId')
      .string('hotelId')
      .string('multipleQueries')
      .use()
    expect(regionId).toBe('MOCK_REGION_ID')
    expect(hotelId).toBe(undefined)
    expect(multipleQueries).toBe('a')
  })

  it('should determine query string value to number type.', () => {
    // next.js의 query 형식
    const query: { [key: string]: string | string[] | undefined } = {
      tripId: '123456',
      multipleQueries: ['1', '2', '3'],
    }

    const { tripId, numberOfAdults, multipleQueries } = StrictQuery.parse(query)
      .number('tripId')
      .number('numberOfAdults')
      .number('multipleQueries')
      .use()

    expect(tripId).toBe(123456)
    expect(numberOfAdults).toBe(undefined)
    expect(multipleQueries).toBe(1)
  })

  it('should determine query string value to string array type.', () => {
    // next.js의 query 형식
    const query: { [key: string]: string | string[] | undefined } = {
      regionIds: 'MOCK_REGION_ID',
      multipleQueries: ['a', 'b', 'c'],
    }

    const { regionIds, hotelIds, multipleQueries } = StrictQuery.parse(query)
      .stringArray('regionIds')
      .stringArray('hotelIds')
      .stringArray('multipleQueries')
      .use()
    expect(regionIds).toEqual(['MOCK_REGION_ID'])
    expect(hotelIds).toEqual([])
    expect(multipleQueries).toEqual(['a', 'b', 'c'])
  })

  it('should determine query string value to number array type.', () => {
    // next.js의 query 형식
    const query: { [key: string]: string | string[] | undefined } = {
      tripIds: '123456',
      multipleQueries: ['1', '2', '3'],
    }

    const { tripIds, agesOfChildren, multipleQueries } = StrictQuery.parse(
      query,
    )
      .numberArray('tripIds')
      .numberArray('agesOfChildren')
      .numberArray('multipleQueries')
      .use()

    expect(tripIds).toEqual([123456])
    expect(agesOfChildren).toEqual([])
    expect(multipleQueries).toEqual([1, 2, 3])
  })

  it('should determine query string value to boolean type', () => {
    // next.js의 query 형식
    const query: { [key: string]: string | string[] | undefined } = {
      inRegion: 'true',
      hideButton: 'false',
      duplicateValue1: ['true', 'false'],
      duplicateValue2: ['false', 'true'],
    }

    const {
      inRegion,
      hideButton,
      duplicateValue1,
      duplicateValue2,
      closeWindow,
    } = StrictQuery.parse(query)
      .boolean('inRegion')
      .boolean('hideButton')
      .boolean('duplicateValue1')
      .boolean('duplicateValue2')
      .boolean('closeWindow')
      .use()

    expect(inRegion).toBe(true)
    expect(hideButton).toBe(false)
    expect(duplicateValue1).toBe(true)
    expect(duplicateValue2).toBe(false)
    expect(closeWindow).toBe(false)
  })
})
