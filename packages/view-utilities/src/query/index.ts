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

export class StrictQuery<
  Raw extends { [key: string]: RawQuery },
  Resolved = {}
> {
  static parse<T extends { [key: string]: RawQuery }>(
    query: T,
  ): StrictQuery<T, {}> {
    return new StrictQuery(query)
  }

  private raw: Raw

  private resolved: Resolved

  constructor(raw: Raw, resolved?: Resolved) {
    this.raw = raw
    this.resolved = resolved || ({} as Resolved)
  }

  use(): Resolved {
    return this.resolved
  }

  string<Key extends keyof Raw>(
    key: Key,
  ): StrictQuery<
    Omit<Raw, Key>,
    Resolved &
      {
        [key in Key]: string | undefined
      }
  > {
    const { [key]: value, ...restRaw } = this.raw
    const normalized = {
      [key]: normalizeToString(value),
    } as { [key in Key]: string | undefined }
    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }

  number<Key extends keyof Raw>(
    key: Key,
  ): StrictQuery<
    Omit<Raw, Key>,
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

  stringArray<Key extends keyof Raw>(
    key: Key,
  ): StrictQuery<
    Omit<Raw, Key>,
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

  numberArray<Key extends keyof Raw>(
    key: Key,
  ): StrictQuery<
    Omit<Raw, Key>,
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

  boolean<Key extends keyof Raw>(
    key: Key,
  ): StrictQuery<
    Omit<Raw, Key>,
    Resolved &
      {
        [key in Key]: boolean
      }
  > {
    const checkValue = (value: unknown): boolean => value === 'true'

    const { [key]: value, ...restRaw } = this.raw
    const normalized = {
      [key]: checkValue(Array.isArray(value) ? value[0] : value),
    } as { [key in Key]: boolean }

    return new StrictQuery(restRaw, {
      ...this.resolved,
      ...normalized,
    })
  }
}
