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

/**
 * query의 value가 undefined이거나 false일 때 false.
 * 그 외의 value를 가지고 있으면 모두 true
 * @param query
 */
function normalizeToBoolean(query: RawQuery) {
  return !(
    query === undefined || (Array.isArray(query) ? query[0] : query) === 'false'
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
class StrictQuery<Resolved = {}> {
  private raw: { [key: string]: RawQuery }

  private resolved: Resolved

  public constructor(raw: { [key: string]: RawQuery }, resolved?: Resolved) {
    this.raw = raw
    this.resolved = resolved || ({} as Resolved)
  }

  public use(): Resolved {
    return this.resolved
  }

  public string<Key extends string, Value extends string = string>(
    key: Key,
  ): StrictQuery<
    Resolved & {
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

  public number<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved & {
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

  public stringArray<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved & {
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

  public numberArray<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved & {
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

  public boolean<Key extends string>(
    key: Key,
  ): StrictQuery<
    Resolved & {
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
