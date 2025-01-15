import { useCallback, useEffect, useSyncExternalStore } from 'react'

const inMemoryStorage = new Map<string, string | null>()

const handlers = new Set<(key: string) => void>()

function trigger(key: string) {
  for (const handler of Array.from(handlers)) {
    handler(key)
  }
}

function getSnapshot(key: string, initialValue: string | undefined) {
  try {
    return localStorage.getItem(key) ?? initialValue ?? null
  } catch {
    inMemoryStorage.set(key, initialValue ?? null)
    return initialValue ?? null
  }
}

function getServerSnapshot(initialValue: string | undefined) {
  return initialValue ?? null
}

export function useLocalStorage(
  key: string,
): [string | null, (value: string) => void, () => void]
export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string) => void, () => void]
export function useLocalStorage(
  key: string,
  initialValue?: string,
): [string | null, (value: string) => void, () => void] {
  const value = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        const onChange = (localKey: string) => {
          if (key === localKey) {
            onStoreChange()
          }
        }
        handlers.add(onChange)
        return () => handlers.delete(onChange)
      },
      [key],
    ),
    () => getSnapshot(key, initialValue),
    () => getServerSnapshot(initialValue),
  )

  const set = useCallback(
    (value: string) => {
      try {
        localStorage.setItem(key, value)
      } catch {
        inMemoryStorage.set(key, value)
      }

      trigger(key)
    },
    [key],
  )

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch {
      inMemoryStorage.delete(key)
    }

    trigger(key)
  }, [key])

  useEffect(() => {
    if (typeof initialValue === 'undefined') {
      return
    }

    try {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, initialValue)
      }
    } catch {
      if (inMemoryStorage.get(key) === undefined) {
        inMemoryStorage.set(key, initialValue)
      }
    }

    trigger(key)
  }, [initialValue, key])

  return [value, set, remove]
}
