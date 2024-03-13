export const SCHEMA_SCRIPT_TYPE_MAP = {
  restaurant: 'FoodEstablishment',
  attraction: 'LocalBusiness',
  hotel: 'Hotel',
  tna: 'Product',
}

const SCHEMA_TYPE_MAP: Record<string, string> = {
  address: 'PostalAddress',
  aggregateRating: 'AggregateRating',
  aggregateOffer: 'AggregateOffer',
  offers: 'AggregateOffer',
  openingHoursSpecification: 'OpeningHoursSpecification',
  review: 'Review',
  author: 'Person',
  publisher: 'Organization',
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
    .filter(isValidValue)
    .reduce<T>(
      (obj, [key, value]) =>
        mergeObj(obj, {
          [key]: isObject(value)
            ? filterValidValue(value)
            : isArrayOfObject(value)
            ? value.map((item: object) => filterValidValue(item))
            : value,
        }),
      {} as T,
    )
}

function addSchemaType<T extends object>(originObj: T): T {
  return Object.entries(originObj).reduce((obj, [key, value]) => {
    if (key === 'type') {
      return mergeObj({ '@type': value }, obj)
    }

    if (key in SCHEMA_TYPE_MAP) {
      if (isObject(value)) {
        return mergeObj(obj, {
          [key]: mergeObj(
            { '@type': SCHEMA_TYPE_MAP[key] },
            addSchemaType(value),
          ),
        })
      }

      if (isArrayOfObject(value)) {
        const arrayValue = (value as object[]).map((item) =>
          mergeObj({ '@type': SCHEMA_TYPE_MAP[key] }, addSchemaType(item)),
        )
        return mergeObj(obj, { [key]: arrayValue })
      }
    }

    return mergeObj(obj, { [key]: value })
  }, {} as T)
}

function formatValue<T extends object>(originObj: T): T {
  return Object.entries(originObj).reduce((obj, [key, value]) => {
    if (key in VALUE_FORMATTER_MAP) {
      const formatter = VALUE_FORMATTER_MAP[key]

      if (isObject(value)) {
        return mergeObj(obj, { [key]: formatValue(value) })
      }

      if (Array.isArray(value)) {
        const formattedValue = isArrayOfObject(value)
          ? value.map((item) => formatValue(item))
          : value.map((item) => formatter(item))
        return mergeObj(obj, { [key]: formattedValue })
      }

      return mergeObj(obj, { [key]: formatter(value) })
    }

    return mergeObj(obj, { [key]: value })
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

function mergeObj<T1 extends object, T2 extends object>(obj1: T1, obj2: T2) {
  return { ...obj1, ...obj2 }
}

function isObject<T>(data: T) {
  return typeof data === 'object' && !Array.isArray(data) && data !== null
}

function isArrayOfObject<T>(data: T) {
  return Array.isArray(data) && data.every((item) => isObject(item))
}

function isValidValue<T>([_, value]: [key: string, value: T]) {
  if (isObject(value)) {
    return Object.values(value as object).length > 0
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return value !== null && value !== undefined
}

function pipe<T extends object>(...functions: ((arg: T) => T)[]) {
  return function _pipe(value: T) {
    return functions.reduce((acc, fn) => fn(acc), value)
  }
}
