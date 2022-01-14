import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import {
  LoginCtaModalProvider,
  TransitionModal,
  TransitionType,
  useLoginCtaModal,
  useTransitionModal,
} from '@titicaca/modals'
import {
  EnvProvider,
  HistoryProvider,
  SessionContextProvider,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import {
  ExternalLink,
  RouterOnSessionRequiredProvider,
  RouterOnTripleClientRequiredProvider,
} from '@titicaca/router'
import React, { PropsWithChildren } from 'react'

import { mockLocation } from './utils/location'

afterEach(() => {
  mockLocation.afterEach()
})

test('브라우저를 허용하지 않는 링크라면 브라우저 환경에서 클릭했을 때 링크를 열지 않고 앱 유도 모달을 표시합니다.', () => {
  const href = 'https://www.google.com'
  const testId = 'disabled-link'
  const { assign } = mockLocation()
  const SessionProvider = createSessionContextProvider({
    type: 'browser',
    sessionAvailable: false,
  })
  const UserAgentProvider = createUserAgentProvider({ isPublic: true })

  const { getByTestId, getByRole } = render(
    <ExternalLink href={href} target="new" allowSource="app">
      <a data-testid={testId}>테스트링크</a>
    </ExternalLink>,
    {
      wrapper: ({ children }) => (
        <EnvProviderWrapper>
          <UserAgentProvider>
            <SessionProvider>
              <HistoryProvider>
                <LoginCtaModalProvider>
                  <RouterOnTripleClientRequiredProviderWrapper>
                    <RouterOnSessionRequiredProviderWrapper>
                      {children}
                    </RouterOnSessionRequiredProviderWrapper>
                  </RouterOnTripleClientRequiredProviderWrapper>
                </LoginCtaModalProvider>
                <TransitionModal deepLink="MOCK_DEEP_LINK" />
              </HistoryProvider>
            </SessionProvider>
          </UserAgentProvider>
        </EnvProviderWrapper>
      ),
    },
  )

  const anchor = getByTestId(testId)

  fireEvent.click(anchor)

  const dialog = getByRole('dialog')

  expect(assign).not.toBeCalled()
  expect(dialog).toHaveTextContent('트리플 가기')
})

test('로그인한 앱에서만 열리는 링크라면 로그인하지 않은 앱 환경에서 클릭했을 때 링크를 열지않고 로그인 유도 모달을 표시합니다.', () => {
  const href = ' https://www.google.com'
  const testId = 'disabled-link'
  const { assign } = mockLocation()
  const SessionProvider = createSessionContextProvider({
    type: 'app',
    sessionAvailable: false,
  })
  const UserAgentProvider = createUserAgentProvider({ isPublic: false })

  const { getByTestId, getByRole } = render(
    <ExternalLink href={href} target="new" allowSource="app-with-session">
      <a data-testid={testId}>테스트링크</a>
    </ExternalLink>,
    {
      wrapper: ({ children }) => (
        <EnvProviderWrapper>
          <UserAgentProvider>
            <SessionProvider>
              <HistoryProvider>
                <LoginCtaModalProvider>
                  <RouterOnTripleClientRequiredProviderWrapper>
                    <RouterOnSessionRequiredProviderWrapper>
                      {children}
                    </RouterOnSessionRequiredProviderWrapper>
                  </RouterOnTripleClientRequiredProviderWrapper>
                </LoginCtaModalProvider>
              </HistoryProvider>
            </SessionProvider>
          </UserAgentProvider>
        </EnvProviderWrapper>
      ),
    },
  )

  const anchor = getByTestId(testId)

  fireEvent.click(anchor)

  const dialog = getByRole('dialog')

  expect(assign).not.toBeCalled()
  expect(dialog).toHaveTextContent('로그인이 필요합니다.')
})

function EnvProviderWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <EnvProvider
      afOnelinkId="AF_ONELINK_ID"
      afOnelinkPid="AF_ONELINK_PID"
      afOnelinkSubdomain="AF_ONELINK_SUBDOMAIN"
      appUrlScheme="test-triple"
      defaultPageDescription="기본 페이지 설명"
      defaultPageTitle="기본 페이지 타이틀"
      facebookAppId="FACEBOOK_APP_ID"
      webUrlBase="https://triple-test.titicaca-corp.com"
    >
      {children}
    </EnvProvider>
  )
}

function createSessionContextProvider({
  type,
  sessionAvailable,
}: {
  type: Parameters<typeof SessionContextProvider>[0]['type']
  sessionAvailable: boolean
}) {
  function getProps(
    type: Parameters<typeof SessionContextProvider>[0]['type'],
  ): Parameters<typeof SessionContextProvider>[0] {
    const initialUser = sessionAvailable ? { uid: '-1' } : undefined
    if (type === 'app') {
      return {
        type: 'app',
        props: {
          initialSessionId: sessionAvailable ? 'FAKE_SESSION_ID' : undefined,
          initialUser,
        },
      }
    }

    return {
      type: 'browser',
      props: {
        initialSessionAvailability: sessionAvailable,
        initialUser,
      },
    }
  }

  return function SessionContextProviderWrapper({
    children,
  }: PropsWithChildren<unknown>) {
    return (
      <SessionContextProvider {...getProps(type)}>
        {children}
      </SessionContextProvider>
    )
  }
}

function createUserAgentProvider({ isPublic }: { isPublic: boolean }) {
  return function UserAgentProviderWrapper({
    children,
  }: PropsWithChildren<unknown>) {
    return (
      <UserAgentProvider
        value={{ isPublic } as Parameters<typeof UserAgentProvider>[0]['value']}
      >
        {children}
      </UserAgentProvider>
    )
  }
}

function RouterOnTripleClientRequiredProviderWrapper({
  children,
}: PropsWithChildren<unknown>) {
  const { show } = useTransitionModal()

  return (
    <RouterOnTripleClientRequiredProvider
      value={() => show(TransitionType.General)}
    >
      {children}
    </RouterOnTripleClientRequiredProvider>
  )
}

function RouterOnSessionRequiredProviderWrapper({
  children,
}: PropsWithChildren<unknown>) {
  const { show } = useLoginCtaModal()

  return (
    <RouterOnSessionRequiredProvider value={show}>
      {children}
    </RouterOnSessionRequiredProvider>
  )
}
