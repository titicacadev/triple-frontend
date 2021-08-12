import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

type GetServerSidePropsWithCustomContext = GetServerSidePropsContext & {
  getContext: {
    (key: string): unknown
    <Value = unknown>(
      key: string,
      typeGuard: (value: unknown) => value is Value,
    ): Value
  }
  setContext(key: string, value: unknown): void
}

type Forward<Props> = (
  context: GetServerSidePropsWithCustomContext,
) => Promise<GetServerSidePropsResult<Props>>

type GSSPExtension<ReturnProps, ForwardProps> = (
  context: GetServerSidePropsWithCustomContext,
  forward: Forward<ForwardProps>,
) => Promise<GetServerSidePropsResult<ReturnProps>>

export function createCompositedGetServerSideProps<FinalProps>(
  ...extensions: GSSPExtension<any, any>[]
): GetServerSideProps<FinalProps> {
  function reduction(
    context: GetServerSidePropsWithCustomContext,
    [firstExtension, ...restExtensions]: GSSPExtension<any, any>[],
  ): Promise<GetServerSidePropsResult<any>> {
    if (restExtensions.length === 0) {
      return firstExtension(context, () => Promise.resolve({ props: {} }))
    }

    return firstExtension(context, (modifiedContext) =>
      reduction(modifiedContext, restExtensions),
    )
  }

  if (extensions.length === 0) {
    throw new Error('주어진 getServerSideProps 확장이 없습니다.')
  }

  const context: { [key: string]: unknown } = {}
  const getContext = <Type = unknown>(
    key: string,
    typeGuard?: (value: unknown) => value is Type,
  ) => {
    const value = context[key]

    if (typeGuard && !typeGuard(value)) {
      throw new Error(`${key}에 의도하지 않은 타입이 들어있습니다.`)
    }

    return value
  }
  const setContext = (key: string, value: unknown) => {
    context[key] = value
  }

  return (ctx) => reduction({ ...ctx, getContext, setContext }, extensions)
}
