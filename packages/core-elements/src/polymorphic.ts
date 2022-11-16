import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from 'react'

type Merge<T, U> = Omit<T, keyof U> & U

type PropsWithAsProp<C extends ElementType, P = unknown> = P & { as?: C }

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref']

export type PolymorphicProps<C extends ElementType, P = unknown> = Merge<
  ComponentPropsWithoutRef<C>,
  PropsWithAsProp<C, P>
>

export type PolymorphicPropsWithRef<
  C extends ElementType,
  P = unknown,
> = PolymorphicProps<C, P> & {
  ref?: PolymorphicRef<C>
}
