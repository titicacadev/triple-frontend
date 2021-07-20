import Cookies from 'universal-cookie'

import {
  storageAvailable,
  checkQuotaExceededError,
  cookieAvailable,
} from './utils'
import { WebStorageError } from './error'
import { WebStorageType } from './types'

export class WebStorage {
  private static COOKIE_KEY_PREFIX = 'alter-storage/'

  private static addCookieKeyPrefix(key: string) {
    return `${this.COOKIE_KEY_PREFIX}/${key}`
  }

  private type: WebStorageType

  private cookieUsed: boolean = false

  constructor(type: WebStorageType = 'localStorage') {
    if (typeof window === 'undefined') {
      throw new WebStorageError(type, 'NotBrowser')
    }

    if (!storageAvailable(type)) {
      if (!cookieAvailable()) {
        throw new WebStorageError(type, 'Unavailable')
      } else {
        this.cookieUsed = true
      }
    }

    this.type = type
  }

  private get storage() {
    return window[this.type]
  }

  get length() {
    return this.storage.length
  }

  key(index: number): string | null {
    if (this.cookieUsed) {
      const cookie = new Cookies()

      return Object.keys(cookie.getAll())[index] ?? null
    }
    return this.storage.key(index)
  }

  getItem(key: string): string | null {
    if (this.cookieUsed) {
      const cookie = new Cookies()

      return cookie.get(WebStorage.addCookieKeyPrefix(key), {
        doNotParse: true,
      })
    }
    return this.storage.getItem(key)
  }

  setItem(key: string, value: string) {
    try {
      if (this.cookieUsed) {
        // TODO: 초기화되는 로직이 쿠키와 Storage가 약간 다르다.
        const cookie = new Cookies()
        return cookie.set(WebStorage.addCookieKeyPrefix(key), value)
      }
      return this.storage.setItem(key, value)
    } catch (error) {
      if (checkQuotaExceededError(error)) {
        throw new WebStorageError(this.type, 'QuotaExceeded')
      }

      throw error
    }
  }

  removeItem(key: string) {
    if (this.cookieUsed) {
      const cookie = new Cookies()
      return cookie.remove(WebStorage.addCookieKeyPrefix(key))
    }
    return this.storage.removeItem(key)
  }

  clear() {
    if (this.cookieUsed) {
      const cookie = new Cookies()
      Object.keys(cookie.getAll())
        .filter((key) => key.startsWith(WebStorage.COOKIE_KEY_PREFIX))
        .forEach((key) => {
          cookie.remove(key)
        })
      return
    }
    return this.storage.clear()
  }
}
