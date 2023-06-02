const SCHEMA_TYPE_MAP: Record<string, string> = {
  address: 'PostalAddress',
  aggregateRating: 'AggregateRating',
  aggregateOffer: 'AggregateOffer',
  openingHoursSpecification: 'OpeningHoursSpecification',
  review: 'Review',
  author: 'Person',
  geo: 'GeoCoordinates',
  reviewRating: 'Rating',
  itemListElement: 'ListItem',
}

type Formatter = (value: string) => string | undefined

const VALUE_FORMATTER_MAP: Record<string, Formatter> = {
  datePublished: toISOString,
  dateModified: toISOString,
  availability: formatAvailability,
}

export function createScript<T extends object>(data: T, type: string) {
  const script = pipe(filterValidValue, addSchemaType, formatValue)(data)
  return {
    '@context': 'http://schema.org',
    '@type': type,
    ...script,
  }
}

function filterValidValue<T extends object>(originObj: T): T {
  return Object.entries(originObj)
    .filter(([_, value]) => !!value)
    .reduce<T>(
      (obj, [key, value]) => ({
        ...obj,
        [key]: isObject(value) ? filterValidValue(value) : value,
      }),
      {} as T,
    )
}

function addSchemaType<T extends object>(originObj: T): T {
  return Object.entries(originObj).reduce((obj, [key, value]) => {
    if (isObject(value)) {
      return { ...obj, [key]: addSchemaType(value) }
    }

    if (Array.isArray(value)) {
      const hasObjectItem = value.every((item) => isObject(item))
      const typedValue = hasObjectItem
        ? value.map((item) => addSchemaType(item))
        : value
      return { ...obj, [key]: typedValue }
    }

    if (key === 'type') {
      return { '@type': value, ...obj }
    }

    if (key in SCHEMA_TYPE_MAP) {
      return { '@type': SCHEMA_TYPE_MAP[key], ...obj }
    }

    return obj
  }, {} as T)
}

function formatValue<T extends object>(originObj: T): T {
  return Object.entries(originObj).reduce((obj, [key, value]) => {
    if (isObject(value)) {
      return { ...obj, [key]: formatValue(value) }
    }

    if (Array.isArray(value)) {
      const hasObjectItem = value.every((item) => isObject(item))
      const formattedValue = hasObjectItem
        ? value.map((item) => formatValue(item))
        : value
      return { ...obj, [key]: formattedValue }
    }

    if (key in VALUE_FORMATTER_MAP) {
      const formatter = VALUE_FORMATTER_MAP[key]
      return { ...obj, [key]: formatter(value) }
    }

    return obj
  }, {} as T)
}

function formatAvailability(availability: string) {
  return `https://schema.org/${availability}`
}

function toISOString(dateString: string) {
  if (!dateString) {
    return
  }

  const date = new Date(dateString)
  const isValidDate = date instanceof Date && !isNaN(date.getTime())

  return isValidDate ? date.toISOString() : undefined
}

function isObject<T extends object>(obj: T) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

function pipe<T extends object>(...functions: ((arg: T) => T)[]) {
  return function _pipe(value: T) {
    return functions.reduce((acc, fn) => fn(acc), value)
  }
}
