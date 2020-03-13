import Router from 'next/router'
import {
  closeWindow as _closeWindow,
  backOrClose as _backOrClose,
  hasAccessibleTripleNativeClients,
} from '@titicaca/triple-web-to-native-interfaces'

import { useHistoryContext } from './history-context'

export async function pushRouter(
  url: string,
  asurlOrScrollPosition?: string | [number, number],
) {
  const asUrl =
    typeof asurlOrScrollPosition === 'string'
      ? asurlOrScrollPosition
      : undefined
  const scrollPosition: [number, number] = Array.isArray(asurlOrScrollPosition)
    ? asurlOrScrollPosition
    : [0, 0]

  await Router.push(url, asUrl || undefined)

  window.scrollTo(...scrollPosition)
}

export async function replaceRouter(
  url: string,
  asurlOrScrollPosition?: string | [number, number],
) {
  const asUrl =
    typeof asurlOrScrollPosition === 'string'
      ? asurlOrScrollPosition
      : undefined
  const scrollPosition: [number, number] = Array.isArray(asurlOrScrollPosition)
    ? asurlOrScrollPosition
    : [0, 0]

  await Router.replace(url, asUrl || undefined)

  window.scrollTo(...scrollPosition)
}

export function backOrClose() {
  if (!hasAccessibleTripleNativeClients()) {
    return history.back()
  } else {
    return _backOrClose()
  }
}

export function closeWindow() {
  return !hasAccessibleTripleNativeClients() ? window.close() : _closeWindow()
}

export function asyncBack(backer = Router.back) {
  return new Promise((resolve) => {
    const handler = () => {
      Router.events.off('hashChangeComplete', handler)
      resolve()
    }

    Router.events.on('hashChangeComplete', handler)

    backer()
  })
}

export function useIsomorphicNavigation() {
  const { openWindow } = useHistoryContext()

  return {
    pushRouter,
    replaceRouter,
    asyncBack,
    backOrClose,
    closeWindow,
    openWindow,
  }
}
