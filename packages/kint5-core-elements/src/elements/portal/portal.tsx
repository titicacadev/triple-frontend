import { PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children }: PropsWithChildren) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setContainer(() => {
      const element = document.createElement('div')
      element.classList.add('triple-portal')
      return element
    })
  }, [])

  useEffect(() => {
    if (container === null) {
      return
    }
    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return container ? createPortal(children, container) : null
}
