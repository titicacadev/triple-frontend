import { PropsWithChildren } from 'react'

export type CheckboxGroupBaseProps = PropsWithChildren

export const CheckboxGroupBase = ({ children }: CheckboxGroupBaseProps) => {
  return <div role="group">{children}</div>
}
