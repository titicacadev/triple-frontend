/* eslint-disable import/no-unresolved */
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  SyntheticEvent,
} from 'react'
import { initialize } from '@titicaca/standard-action-handler'
import { ContextOptions } from '@titicaca/standard-action-handler/src/types'
import { useNavigate, useExternalRouter } from '@titicaca/router'

interface Link {
  href?: string
  label?: string
  level?: string
  target?: 'browser'
}

type LinkEventHandler = (e: SyntheticEvent, link: Link) => void

interface LinkClickHandler {
  onLinkClick?: LinkEventHandler
}

const LinkClickHandlerContext = createContext<LinkClickHandler | undefined>(
  undefined,
)

export function LinkClickHandlerProvider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()

  const handleAction = useMemo(
    () =>
      initialize({
        navigate: navigate as ContextOptions['navigate'],
        routeExternally,
      }),
    [navigate, routeExternally],
  )

  const onLinkClick: LinkEventHandler = useCallback(
    (_, { href, target }) => {
      if (!href) {
        return
      }

      handleAction(href, { target })
    },
    [handleAction],
  )

  const value = useMemo(
    () => ({
      onLinkClick,
    }),
    [onLinkClick],
  )

  return (
    <LinkClickHandlerContext.Provider value={value}>
      {children}
    </LinkClickHandlerContext.Provider>
  )
}

export function useLinkClickHandler() {
  const context = useContext(LinkClickHandlerContext)

  if (!context) {
    throw new Error('LinkClickHandelrProvider is not mount')
  }

  return context
}
