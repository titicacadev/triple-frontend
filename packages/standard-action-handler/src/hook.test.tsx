import { EnvProvider, SessionContextProvider } from '@titicaca/react-contexts'
import { renderHook } from '@testing-library/react-hooks'
import { PropsWithChildren } from 'react'

import { useWebAction } from './hook'

describe('stadard-action-hanlder hook', () => {
  it('useWebAction hook 사용 시 initialize 함수가 반환됩니다.', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => {
      return (
        <EnvProvider
          afOnelinkId=""
          afOnelinkPid=""
          afOnelinkSubdomain=""
          appUrlScheme=""
          defaultPageDescription=""
          defaultPageTitle=""
          facebookAppId=""
          webUrlBase=""
        >
          <SessionContextProvider
            type="browser"
            props={{
              initialUser: undefined,
              initialSessionAvailability: true,
            }}
          >
            {children}
          </SessionContextProvider>
        </EnvProvider>
      )
    }

    const { result } = renderHook(() => useWebAction(), {
      wrapper,
    })
    expect(typeof result.current).toBe('function')
  })
})
