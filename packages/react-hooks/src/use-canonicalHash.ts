import { useState, useEffect } from 'react'

interface Props {
  alias?: {
    [key: string]: string
  }
}
export function useCanonicalHash({ alias }: Props) {
  const [canonicalHash, setCanonicalHash] = useState('')

  useEffect(() => {
    const replacedHash = window.location.hash
      ? window.location.hash.replace(/^#/, '')
      : ''
    const hash = (alias || {})[replacedHash] || replacedHash
    setCanonicalHash(hash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    canonicalHash,
  }
}
