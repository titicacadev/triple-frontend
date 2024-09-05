'use client'

import { createContext } from 'react'

import type { EnvValue } from './types'

export const EnvContext = createContext<EnvValue | undefined>(undefined)
