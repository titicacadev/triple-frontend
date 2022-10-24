import { PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children }: PropsWithChildren) => {
  const [container] = useState(() => {
    const element = document.createElement('div')
    element.classList.add('triple-portal')
    return element
  })

  useEffect(() => {
    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return createPortal(children, container)
}
