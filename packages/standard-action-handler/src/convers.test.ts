import converse from './converse'

describe('converse feature test', () => {
  test('query가 없으면 동작하지 않습니다.', async () => {
    const handler = await converse({
      url: {
        path: '/web-action/converse',
      },
    })

    expect(handler).toBe(false)
  })
})
