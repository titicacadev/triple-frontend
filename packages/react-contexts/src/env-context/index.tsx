import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

interface EnvContextValue {
  /**
   * 앱을 여는데 필요한 scheme
   */
  appUrlScheme: string
  /**
   * 서비스 path 앞에 붙여서 URL을 만드는 값
   */
  webUrlBase: string
  /**
   * @deprecated '/login' 으로 고정됩니다.
   */
  authBasePath?: string
  /**
   * facebook에 등록된 App ID. Facebook Open Graph 관련 태그로 사용합니다.
   */
  facebookAppId: string
  /**
   * 페이지의 기본 제목. title 태그의 기본값이 됩니다.
   */
  defaultPageTitle: string
  /**
   * 페이지의 기본 설명. meta[name="description"] 태그의 기본 content가 됩니다.
   */
  defaultPageDescription: string

  /** 구글 맵 API Key */
  googleMapsApiKey?: string
}

const EnvContext = createContext<EnvContextValue>({
  appUrlScheme: '',
  webUrlBase: '',
  authBasePath: '',
  facebookAppId: '',
  defaultPageTitle: '모바일 여행 가이드 - 트리플',
  defaultPageDescription: '',
})

export function EnvProvider({
  appUrlScheme,
  webUrlBase,
  authBasePath,
  facebookAppId,
  defaultPageTitle,
  defaultPageDescription,
  children,
  ...rest
}: PropsWithChildren<EnvContextValue>) {
  const value = useMemo<EnvContextValue>(
    () => ({
      appUrlScheme,
      webUrlBase,
      authBasePath,
      facebookAppId,
      defaultPageTitle,
      defaultPageDescription,
      ...rest,
    }),
    [
      appUrlScheme,
      authBasePath,
      defaultPageDescription,
      defaultPageTitle,
      facebookAppId,
      webUrlBase,
      rest,
    ],
  )
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>
}

export function useEnv(): EnvContextValue {
  return useContext(EnvContext)
}
