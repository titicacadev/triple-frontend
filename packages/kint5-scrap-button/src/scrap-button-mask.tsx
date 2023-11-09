import {
  Attributes,
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'

const MaskContext = createContext(false)

export function ScrapButtonMask({
  masked,
  children,
}: PropsWithChildren<{ masked: boolean }>) {
  return <MaskContext.Provider value={masked}>{children}</MaskContext.Provider>
}

export function withMask<P extends Attributes>(Component: ComponentType<P>) {
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
