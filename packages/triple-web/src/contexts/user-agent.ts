import { createContext } from 'react'
import { IResult } from 'ua-parser-js'

export interface UserAgent extends IResult {}

export const UserAgentContext = createContext<UserAgent | undefined>(undefined)
