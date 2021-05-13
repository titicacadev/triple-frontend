export interface UrlElements {
  href?: string
  scheme?: string
  host?: string
  path?: string
  query?: string
  hash?: string
}

export function parseUrl(rawHref?: string): UrlElements {
  if (!rawHref) {
    return {}
  }

  const [href = '', scheme = '', host = '', path = '', query = '', hash = ''] =
    rawHref
      .trim()
      .match(
        /^(?:([^:/?#]*):\/\/)?([^/?#]*)(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?/,
      ) || []

  return { href, scheme, host, path, query, hash }
}

type ImplicitBooleanQueryValue = { type: 'implicitBoolean' }

interface ArrayFormatQueryValue {
  type: 'indices' | 'brackets' | 'repeat' | 'comma'
  value: string[]
}

type ParsedQueryValue =
  | ImplicitBooleanQueryValue
  | ArrayFormatQueryValue
  | string

interface ParsedQuery {
  [key: string]: ParsedQueryValue
}

function parseQuery(query: string): ParsedQuery {
  return query
    .split('&')
    .map((pair) => {
      const [key, value] = pair.split('=')
      return value
        ? ([decodeURIComponent(key), decodeURIComponent(value)] as const)
        : ([decodeURIComponent(key)] as const)
    })
    .reduce((result: ParsedQuery, [key, value]) => {
      if (value === undefined) {
        return { ...result, [key]: { type: 'implicitBoolean' } } as ParsedQuery
      }

      if (key.includes('[')) {
        // indices or brackets,
        const [strippedKey, index] = key.split(/\[|\]/)
        const prevValue =
          (result[strippedKey] as ArrayFormatQueryValue | undefined)?.value ||
          []

        const type = Number.isInteger(parseInt(index)) ? 'indices' : 'brackets'

        return {
          ...result,
          [strippedKey]: {
            type,
            value: [...prevValue, value],
          } as ArrayFormatQueryValue,
        }
      }
      if (value.includes(',')) {
        // comma format array
        return {
          ...result,
          [key]: { type: 'comma' as const, value: value.split(',') },
        }
      }

      const duplicatedValue = result[key] as Exclude<
        ParsedQueryValue,
        ImplicitBooleanQueryValue
      >

      if (duplicatedValue) {
        return {
          ...result,
          [key]: {
            type: 'repeat',
            value:
              typeof duplicatedValue === 'string'
                ? [duplicatedValue, value]
                : [...duplicatedValue.value, value],
          },
        }
      }

      return { ...result, [key]: value } as ParsedQuery
    }, {} as ParsedQuery)
}

function stringifyQuery(obj: ParsedQuery): string {
  return Object.entries(obj)
    .reduce((result, [key, value]) => {
      if (typeof value === 'string') {
        return [...result, [key, value] as const]
      }
      if ('type' in value) {
        if (value.type === 'implicitBoolean') {
          return [...result, [key] as const]
        }

        const { type, value: array } = value

        if (type === 'indices') {
          return [
            ...result,
            ...array.map(
              (value, index) => [`${key}[${index}]`, value] as const,
            ),
          ]
        }
        if (type === 'brackets') {
          return [
            ...result,
            ...array.map((value) => [`${key}[]`, value] as const),
          ]
        }
        if (type === 'repeat') {
          return [...result, ...array.map((value) => [key, value] as const)]
        }
        if (type === 'comma') {
          return [...result, [key, array.join(',')] as const]
        }
      }
      return result
    }, [] as (readonly [string] | readonly [string, string])[])
    .map(([key, value]) => {
      const encodedPair = [
        encodeURIComponent(key),
        value ? encodeURIComponent(value) : undefined,
      ].filter(Boolean)
      return encodedPair.join('=')
    })
    .join('&')
}

export function generateUrl(
  { query: elementQuery, ...restElements }: UrlElements,
  baseUrl?: string,
  /**
   * @deprecated
   */
  _?: { arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma' },
) {
  const { query: baseUrlQuery, ...restBaseUrl }: UrlElements = baseUrl
    ? parseUrl(baseUrl)
    : {}

  const { scheme, host, path, hash } = {
    ...restBaseUrl,
    ...restElements,
  }

  const query = stringifyQuery({
    ...(baseUrlQuery && parseQuery(baseUrlQuery)),
    ...(elementQuery && parseQuery(elementQuery)),
  })

  return [
    scheme && `${scheme}://`,
    host,
    path,
    query && `?${query}`,
    hash && `#${hash}`,
  ]
    .filter((v) => v)
    .join('')
}
