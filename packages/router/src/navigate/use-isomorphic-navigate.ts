// eslint-disable-next-line import/no-named-as-default
import Router from 'next/router'
import {
  closeWindow as _closeWindow,
  backOrClose as _backOrClose,
  hasAccessibleTripleNativeClients,
} from '@titicaca/triple-web-to-native-interfaces'

async function pushRouter(
  path: string,
  asPathOrScrollPosition?: string | [number, number],
  scrollTo?: [number, number],
) {
  const asPath =
    typeof asPathOrScrollPosition === 'string' ? asPathOrScrollPosition : ''
  const scrollPosition: [number, number] = Array.isArray(asPathOrScrollPosition)
    ? asPathOrScrollPosition
    : scrollTo || [0, 0]

  asPath ? await Router.push(path, asPath) : await Router.push(path)

  window.scrollTo(...scrollPosition)
}

async function replaceRouter(
  path: string,
  asPathOrScrollPosition?: string | [number, number],
  scrollTo?: [number, number],
) {
  const asPath =
    typeof asPathOrScrollPosition === 'string' ? asPathOrScrollPosition : ''
  const scrollPosition: [number, number] = Array.isArray(asPathOrScrollPosition)
    ? asPathOrScrollPosition
    : scrollTo || [0, 0]

  asPath ? await Router.replace(path, asPath) : await Router.replace(path)

  window.scrollTo(...scrollPosition)
}

function backOrClose() {
  if (!hasAccessibleTripleNativeClients()) {
    return history.back()
  } else {
    return _backOrClose()
  }
}

function closeWindow() {
  return !hasAccessibleTripleNativeClients() ? window.close() : _closeWindow()
}

function asyncBack(backer = Router.back): Promise<void> {
  return new Promise((resolve) => {
    const handler = () => {
      Router.events.off('hashChangeComplete', handler)
      resolve()
    }

    Router.events.on('hashChangeComplete', handler)

    backer()
  })
}

export function useIsomorphicNavigate() {
  return {
    pushRouter,
    replaceRouter,
    asyncBack,
    backOrClose,
    closeWindow,
  }
}
