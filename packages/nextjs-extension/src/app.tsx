import React, { ComponentType, PropsWithChildren } from 'react'
import { NextPageContext } from 'next'
import { AppProps, AppContext } from 'next/app'

/**
 * 커스텀 App을 구성하는 컴포넌트
 */
export type AppSegment<
  Props extends { [key: string]: unknown } = {}
> = ComponentType<PropsWithChildren<Props>> & {
  getInitialProps?: (ctx: NextPageContext) => Promise<Props>
}

/**
 * 커스텀 App을 구성하는 컴포넌트 목록을 합쳐 하나의 컴포넌트로 만드는 함수
 */
function compositeApp<Props extends { [key: string]: unknown } = {}>(
  components: AppSegment[],
): AppSegment<Props> {
  const CompositedComponent = components.reduce((Reduced, Current) => {
    if (Current === undefined) {
      return Reduced
    }

    function ReducedComponent({
      children,
      ...restProps
    }: PropsWithChildren<any>) {
      return (
        <Reduced {...(restProps as Props)}>
          <Current {...restProps}>{children}</Current>
        </Reduced>
      )
    }

    ReducedComponent.getInitialProps = (() => {
      const currentGetInitialProps = Current.getInitialProps

      if (currentGetInitialProps === undefined) {
        return Reduced.getInitialProps
      }

      return async (ctx: NextPageContext) => {
        const [props, currentResult] = await Promise.all([
          Reduced.getInitialProps
            ? Reduced.getInitialProps(ctx)
            : Promise.resolve({}),
          currentGetInitialProps(ctx),
        ])

        return { ...props, ...currentResult }
      }
    })()

    return ReducedComponent
  })

  return (CompositedComponent as unknown) as AppSegment<Props>
}

/**
 * 커스텀 App을 구성하는 함수를 받아서 커스텀 App을 생성하는 함수
 */
export function createCustomApp<Props extends { [key: string]: unknown } = {}>(
  ...components: AppSegment<any>[]
): ComponentType<AppProps & { compositedProps: Props }> {
  const CompositedComponent = compositeApp<Props>(components)

  function NextJSAppComponent({
    Component,
    pageProps,
    compositedProps,
  }: AppProps & {
    compositedProps: Props
  }) {
    return (
      <CompositedComponent {...compositedProps}>
        <Component
          {...compositedProps} // 404, _error에서 userAgent 객체를 사용하는 경우 지원
          {...pageProps}
        />
      </CompositedComponent>
    )
  }

  NextJSAppComponent.getInitialProps = (() => {
    const finalGetInitialProps = CompositedComponent.getInitialProps

    if (finalGetInitialProps === undefined) {
      // 합쳐진 컴포넌트에 getInitialProps가 없다면
      // 서버에서 결정하는 prop이 없다는 의미입니다.
      return undefined
    }

    return async ({ ctx }: AppContext): Promise<{ compositedProps: Props }> => {
      return {
        compositedProps: CompositedComponent.getInitialProps
          ? await CompositedComponent.getInitialProps(ctx)
          : ({} as Props),
      }
    }
  })()

  return NextJSAppComponent
}
