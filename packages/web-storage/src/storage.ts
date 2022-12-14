import Cookies from 'universal-cookie'
import { TFunction } from '@jaehyeon48/next-i18next'

import {
  storageAvailable,
  checkQuotaExceededError,
  cookieAvailable,
} from './utils'
import { handleError } from './error'
import { WebStorageType, ErrorType } from './types'

const COOKIE_KEY_PREFIX = 'alter-storage/'

function addCookieKeyPrefix(key: string) {
  return `${COOKIE_KEY_PREFIX}/${key}`
}

function getCookieStorage({
  storageType,
  onError,
}: {
  storageType: WebStorageType
  onError?: { [key in ErrorType]?: () => unknown }
}) {
  if (!cookieAvailable()) {
    handleError({
      errorType: 'unavailable',
      storageType,
      onError,
    })
  }

  const cookie = new Cookies()
  const keys = Object.keys(cookie.getAll()).filter((key) =>
    key.startsWith(COOKIE_KEY_PREFIX),
  )

  return {
    get length() {
      return keys.length
    },

    key(index: number): string | null {
      return keys[index] ?? null
    },

    getItem(key: string): string | null {
      return cookie.get(addCookieKeyPrefix(key), {
        doNotParse: true,
      })
    },

    setItem(key: string, value: string) {
      try {
        // TODO: 초기화되는 로직이 쿠키와 Storage가 약간 다르다.
        return cookie.set(addCookieKeyPrefix(key), value)
      } catch (error) {
        if (checkQuotaExceededError(error)) {
          handleError({
            errorType: 'quotaExceeded',
            storageType,
            onError,
          })
        }

        throw error
      }
    },

    removeItem(key: string) {
      return cookie.remove(addCookieKeyPrefix(key))
    },

    clear() {
      keys.forEach((key) => {
        cookie.remove(key)
      })
    },
  }
}

export function getWebStorage(
  type: WebStorageType = 'localStorage',
  onError?: { [key in ErrorType]?: () => unknown },
) {
  if (typeof window === 'undefined') {
    handleError({ errorType: 'notBrowser', storageType: type, onError })
  }

  if (!storageAvailable(type)) {
    return getCookieStorage({ storageType: type, onError })
  }

  const storage = window[type]

  return {
    get length() {
      return storage.length
    },

    key(index: number): string | null {
      return storage.key(index)
    },

    getItem(key: string): string | null {
      return storage.getItem(key)
    },

    setItem(key: string, value: string) {
      try {
        return storage.setItem(key, value)
      } catch (error) {
        if (checkQuotaExceededError(error)) {
          handleError({
            errorType: 'quotaExceeded',
            storageType: type,
            onError,
          })
        }

        throw error
      }
    },

    removeItem(key: string) {
      return storage.removeItem(key)
    },

    clear() {
      return storage.clear()
    },
  }
}
