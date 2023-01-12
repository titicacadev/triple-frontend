import { koCommonWeb } from './assets/ko/common-web'

type I18nKeys = typeof koCommonWeb
type I18nTokens = Record<I18nKeys[keyof I18nKeys], string>
export type I18nCommonWebKeys = I18nKeys & I18nTokens
