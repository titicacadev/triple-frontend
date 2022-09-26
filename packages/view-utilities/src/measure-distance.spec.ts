import assert from 'assert'

import { measureDistance } from './measure-distance'

describe('measureDistance', function () {
  it('직선거리', function () {
    const distance = measureDistance(
      {
        coordinates: [121.525966, 25.094853],
        type: 'Point',
      },
      {
        coordinates: [121.528408, 25.095141],
        type: 'Point',
      },
    )

    assert.strictEqual(248, distance)
  })
})
