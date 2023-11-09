import { request } from 'graphql-request'

import { Requester, getSdk } from './generated'

const requester: Requester = (doc, vars) =>
  request({ document: doc, url: '/api/graphql', variables: vars ?? undefined })

export const client = getSdk(requester)
