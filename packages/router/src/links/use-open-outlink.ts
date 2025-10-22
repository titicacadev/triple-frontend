import { useCallback } from 'react'

import { MakeOutlinkOptions, useMakeOutlink } from './use-make-outlink'

export type OpenOutlinkOptions = MakeOutlinkOptions

export function useOpenOutlink() {
  const makeOutlink = useMakeOutlink()

  const openOutlink = useCallback(
    (
      /**
       * Outlink로 만들 absolute URL.
       */
      url: string,
      options?: OpenOutlinkOptions,
    ) => {
      const href = makeOutlink(url, options)
      window.location.href = href
    },
    [makeOutlink],
  )

  return openOutlink
}
