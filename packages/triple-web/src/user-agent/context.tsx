import { createContext } from 'react'

import type { UserAgentValue } from './types'

export const UserAgentContext = createContext<UserAgentValue | undefined>(
  undefined,
)
