import { createContext, useContext } from 'react'

const GuestModeContext = createContext<boolean | undefined>(undefined)

/** guestMode : true인 경우, 로그인이 필요한 동작(스크랩, 리뷰쓰기)등이 불가능하며, 앱으로 연결되는 루트를 차단합니다. */
export const GuestModeProvider = GuestModeContext.Provider

export function useGuestMode() {
  return useContext(GuestModeContext)
}
