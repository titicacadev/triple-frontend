import { createContext } from 'react'

import { ClientAppValue } from './types'

export const ClientAppContext = createContext<ClientAppValue | undefined>(
  undefined,
)
