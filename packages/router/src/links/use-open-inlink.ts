import { useMakeInlink, MakeInlinkOptions } from './use-make-inlink'

export type OpenInlinkOptions = MakeInlinkOptions

export function useOpenInlink() {
  const makeInlik = useMakeInlink()

  const openInlink = (
    /**
     * Inlink로 만들 relative URL.
     */
    path: string,
    options?: OpenInlinkOptions,
  ) => {
    const href = makeInlik(path, options)
    window.location.href = href
  }

  return openInlink
}
