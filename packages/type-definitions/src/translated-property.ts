export interface TranslatedProperty {
  primary?: string | null
  /** @deprecated */
  ko?: string | null
  en: string | null
  local: string | null
}
// TODO: content 마이그레이션이 완료되면 사용할 수 있음
// export interface TranslatedProperty {
//   primary: string | null
//   en: string | null
//   local: string | null
// }
