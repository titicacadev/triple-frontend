import { parseUrl } from '@titicaca/view-utilities'

const PUBLIC_ROUTELIST_REGEXES = [
  /^\/login$/,
  /^\/regions\/[^/]+\/(attractions|restaurants|articles)\/[^/]+$/,
  /^\/regions\/[^/]+\/hotels(\/.*)?$/,
  /^\/(attractions|restaurants|hotels|articles)\/[^/]+$/,
  /^\/hotels\/?$/,
  /^\/hotels\/list(\/.+)?$/,
  /^\/hotels\/curation(\/.+)?$/,
  /^(\/hotels)?\/regions\/[^/]+\/hotel-areas$/,
  /^\/tna\/regions\/[^/]+\/products\/[^/]+$/,
  /^\/tna\/products\/[^/]+$/,
]

export function checkIfRoutable({ href }: { href: string }) {
  const { host, path } = parseUrl(href)

  if (!host && path) {
    return PUBLIC_ROUTELIST_REGEXES.some((regex) => path.match(regex))
  }

  return true
}
