import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'

const MaskContext = createContext(false)

export function ScrapButtonMask({ children }: PropsWithChildren<{}>) {
  return <MaskContext.Provider value={true}>{children}</MaskContext.Provider>
}

export function withMask<P>(Component: ComponentType<P>) {
  function ComponentWithMask(props: P) {
    const masked = useContext(MaskContext)

    if (masked) {
      return null
    }

    return <Component {...props} />
  }

  ComponentWithMask.displayName = `Masked${Component.displayName}`

  return ComponentWithMask
}
