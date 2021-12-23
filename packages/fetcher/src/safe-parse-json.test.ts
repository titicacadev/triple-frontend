import { Response } from 'node-fetch'

import safeParseJSON from './safe-parse-json'

it('JSON 파싱 에러를 조용히 넘깁니다.', async () => {
  const response = new Response('', {
    headers: {
      'content-type': 'application/json',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = await safeParseJSON(response as any)
  expect(json).toBe(undefined)
})
