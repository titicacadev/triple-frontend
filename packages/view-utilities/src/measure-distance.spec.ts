import { measureDistance } from './measure-distance'

describe('measureDistance', () => {
  it('직선거리', () => {
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

    expect(distance).toBe(248)
  })
})
