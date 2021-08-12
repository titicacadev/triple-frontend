# nextjs-extension

Next.js의 인터페이스를 확장하는 모듈을 모아놓은 패키지입니다.

## `createCompositedAppComponent`

Next.js의 App 컴포넌트의 기능을 확장할 때 사용하는 함수입니다.
전역 상태나 모든 페이지에 적용하는 기능을 \_app에 추가할 때,
이 함수를 사용하면 개별 기능을 모듈화하여 다른 프로젝트에 재사용할 수 있습니다.

### 사용 예시

```tsx
// 합성할 컴포넌트를 만드는 방법

interface UserAgentProviderFormCompositionProps {
  userAgentValue: ReturnType<typeof generateUserAgentValues>
}

function UserAgentProviderFormComposition({ userAgentValue, children }: PropsWithChildren<UserAgentProviderFormCompositionProps>) {
  return <UserAgentProvider value={userAgentValue}>{children}</UserAgentProvider>
}

UserAgentProviderFormComposition.getInitialProps: (ctx: NextPageContext) => Promise<AppLevelComponentProps> = async ({req}) => {
  return {
    userAgentValue:generateUserAgentValues(
      req ? (req.headers || {})['user-agent'] || '' : navigator.userAgent,
    ),
  }
}
```

컴포넌트의 `getInitialProps`를 실행하고, 컴포넌트에 prop을 공급하는 작업을 알아서 해줍니다.

```tsx
// _app.tsx

export default createCompositedAppComponent(
  EnvProviderForComposition,
  UserAgentProviderFormComposition,
  function AppLevelFunctionalities({ children }: PropsWithChildren<{}>) {
    return (
      <>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: GA_INIT_SCRIPT }} />
          <script async src="https://www.google-analytics.com/analytics.js" />
        </Head>

        {children}
      </>
    )
  },
)

// 아래와 동일합니다.

export default function MyApp({ userAgentValue, pageProps, Component }) {
  return (
    <EnvProvider /* Props... */>
      <UserAgentProvider value={userAgentValue}>
        <Component {...pageProps}>
      </UserAgentProvider>
    </EnvProvider>
  )
}

MyApp.getInitialProps = async ({ ctx: { req } }) => {
  return {
    userAgentValue:generateUserAgentValues(
      req ? (req.headers || {})['user-agent'] || '' : navigator.userAgent,
    ),
  }
}
```

## `createCompositedGetServerSideProps`

`getServerSideProps`에서 수행하는 작업을 모듈화할 수 있게 개별 함수를 합성하는 함수입니다.
합성의 대상 함수는 정해진 인터페이스가 있으며, 이 규격에 맞추면 모든 개별 함수를 합쳐서 하나의 `getServerSideProps`를 생성합니다.

합성 대상 함수끼리 데이터를 주고 받을 수 있습니다.

합성 대상 함수의 첫 번째 파라미터는 `GetServerSidePropsContext`와 자체 context getter/setter입니다.
두 번째 파라미터는 현재 작업 다음으로 실행할 forward 함수입니다.

합성 대상 함수 내부에서 context를 이용해 새로운 context를 만들어서 forward 함수를 실행합니다.
forward 함수의 리턴 값을 그대로 리턴하거나, context를 이용해 새로운 값을 리턴할 수 있습니다.
