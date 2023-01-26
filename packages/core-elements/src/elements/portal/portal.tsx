import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  selector?: string
}

export const Portal = ({
  children,
  selector = '#triple-portal',
}: PropsWithChildren<PortalProps>) => {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current as HTMLElement) : null
}
