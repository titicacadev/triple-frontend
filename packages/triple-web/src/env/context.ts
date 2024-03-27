import { createContext } from 'react'

import { EnvValue } from './types'

export const EnvContext = createContext<EnvValue | undefined>(undefined)
