'use client'

import { createContext } from 'react'

import type { ClientAppValue } from './types'

export const ClientAppContext = createContext<ClientAppValue | undefined>(
  undefined,
)
