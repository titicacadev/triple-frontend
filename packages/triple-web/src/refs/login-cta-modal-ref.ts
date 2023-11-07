import { useRef } from 'react'

export interface LoginCtaModalRef {
  returnUrl?: string
}

export function useLoginCtaModalRef() {
  return useRef<LoginCtaModalRef>({})
}
