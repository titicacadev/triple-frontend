import { storageAvailable, checkQuotaExceededError } from './utils'
import { WebStorageError } from './error'

export class WebStorage {
  private type: 'localStorage' | 'sessionStorage'

  constructor(type: 'localStorage' | 'sessionStorage') {
    if (typeof window === 'undefined') {
      throw new WebStorageError(type, 'NotBrowser')
    }

    if (!storageAvailable(type)) {
      throw new WebStorageError(type, 'Unavailable')
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
    return this.storage.key(index)
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key)
  }

  setItem(key: string, value: string) {
    try {
      return this.storage.setItem(key, value)
    } catch (error) {
      if (checkQuotaExceededError(error)) {
        throw new WebStorageError(this.type, 'QuotaExceeded')
      }

      throw error
    }
  }

  removeItem(key: string) {
    return this.storage.removeItem(key)
  }

  clear() {
    return this.storage.clear()
  }
}
