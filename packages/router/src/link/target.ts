export type TargetType = 'current' | 'new' | 'browser'

export const ANCHOR_TARGET_MAP: {
  [key in TargetType]: string
} = {
  current: '_self',
  new: '_blank',
  browser: '_blank',
}
