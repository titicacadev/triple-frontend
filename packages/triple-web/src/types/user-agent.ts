import { IResult } from 'ua-parser-js'

export type UserAgentValue = IResult & { isMobile: boolean }
