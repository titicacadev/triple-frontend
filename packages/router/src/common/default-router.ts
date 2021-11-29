import { ANCHOR_TARGET_MAP, TargetProps } from './target'
import { HrefProps } from './types'

export default function useDefaultRouter() {
  const defaultRouter = ({ href, target }: HrefProps & TargetProps) => {
    const windowTarget = ANCHOR_TARGET_MAP[target]
    window.open(
      href,
      windowTarget,
      windowTarget === '_blank' ? 'noopener' : undefined,
    )
  }

  return defaultRouter
}
