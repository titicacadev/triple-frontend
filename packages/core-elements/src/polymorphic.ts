import { ComponentType, PropsWithoutRef, ComponentPropsWithoutRef } from 'react'

type Merge<T, U> = Omit<T, keyof U> & U

type PropsWithAsProp<P, C extends Polymorphic> = P & { as?: C }

export type Polymorphic =
  | keyof JSX.IntrinsicElements
  | ComponentType
  | undefined

export type PolymorphicProps<P, C extends Polymorphic> = Merge<
  C extends keyof JSX.IntrinsicElements
    ? PropsWithoutRef<JSX.IntrinsicElements[C]>
    : C extends ComponentType
    ? ComponentPropsWithoutRef<C>
    : Record<string, never>,
  PropsWithAsProp<P, C>
>
