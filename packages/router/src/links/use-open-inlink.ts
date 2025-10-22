import { useCallback } from 'react'

import { useMakeInlink, MakeInlinkOptions } from './use-make-inlink'

export type OpenInlinkOptions = MakeInlinkOptions

export function useOpenInlink() {
  const makeInlink = useMakeInlink()

  const openInlink = useCallback(
    (
      /**
       * Inlink로 만들 relative URL.
       */
      path: string,
      options?: OpenInlinkOptions,
    ) => {
      const href = makeInlink(path, options)
      window.location.href = href
    },
    [makeInlink],
  )

  return openInlink
}
