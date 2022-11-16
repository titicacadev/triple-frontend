import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ExoticComponent,
  ReactElement,
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

type PolymorphicExoticComponent<C extends ElementType, P = unknown> = Merge<
  ExoticComponent<P & { [key: string]: unknown }>,
  {
    <InstanceC extends ElementType = C>(
      props: PolymorphicPropsWithRef<InstanceC, P>,
    ): ReactElement | null
  }
>

export type PolymorphicForwardRefExoticComponent<
  C extends ElementType,
  P = unknown,
> = Merge<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<C, P>
>
