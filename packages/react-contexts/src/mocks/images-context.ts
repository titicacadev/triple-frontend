import { rest } from 'msw'

import Images from './images-context.json'

export const imagesHandler = rest.get(
  '/api/content/v2/images',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Images))
  },
)
