type RawQuery = string | string[] | undefined

function normalizeToString<T extends string = string>(
  query: RawQuery,
): T | undefined {
  const param = Array.isArray(query) ? query[0] : query
  return param !== undefined ? (param as T) : undefined
}

function normalizeToArray<T extends string = string>(query: RawQuery): T[] {
  if (Array.isArray(query)) {
    return query as T[]
  }
  if (query !== undefined) {
    return [query as T]
  }
  return []
}

function normalizeToBoolean(query: RawQuery) {
  return (Array.isArray(query) ? query[0] : query) === 'true'
}

class StrictQuery<Resolved = {}> {
  private raw: { [key: string]: RawQuery }

  private resolved: Resolved

  constructor(raw: { [key: string]: RawQuery }, resolved?: Resolved) {
    this.raw = raw
    this.resolved = resolved || ({} as Resolved)
  }

  use(): Resolved {
    return this.resolved
  }

  string<Key extends string, Value extends string = string>(
    key: Key,
  ): StrictQuery<
    Resolved &
      {
        [key in Key]: Value | undefined
      }
  > {
    const { [key]: value, ...restRaw } = this.raw
    const normalized = {
      [key]: normalizeToString<Value>(value),
    } as { [key in Key]: Value | undefined }
    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }

  number<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved &
      {
        [key in Key]: number | undefined
      }
  > {
    const { [key]: value, ...restRaw } = this.raw
    const stringified = normalizeToString(value)
    const normalized = {
      [key]: stringified ? parseFloat(stringified) : undefined,
    } as { [key in Key]: number | undefined }
    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }

  stringArray<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved &
      {
        [key in Key]: string[]
      }
  > {
    const { [key]: value, ...restRaw } = this.raw
    const normalized = {
      [key]: normalizeToArray(value),
    } as { [key in Key]: string[] }
    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }

  numberArray<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved &
      {
        [key in Key]: number[]
      }
  > {
    const { [key]: value, ...restRaw } = this.raw
    const normalized = {
      [key]: normalizeToArray(value).map(parseFloat),
    } as { [key in Key]: number[] }
    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }

  boolean<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved &
      {
        [key in Key]: boolean
      }
  > {
    const { [key]: value, ...restRaw } = this.raw
    const normalized = {
      [key]: normalizeToBoolean(value),
    } as { [key in Key]: boolean }

    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }
}

export function strictQuery<T extends { [key: string]: RawQuery }>(query: T) {
  return new StrictQuery(query)
}
