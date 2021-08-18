import { parseUrl } from '../url'

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
  /^\/tna\/products\/[^/]+\/display$/,
  /^\/air\/domestic-my-orders\/[0-9]+\/ancillary\/bridge/,
]

export function checkIfRoutable({ href }: { href: string }) {
  const { host, path } = parseUrl(href)

  if (!host && path) {
    return PUBLIC_ROUTELIST_REGEXES.some((regex) => path.match(regex))
  }

  return true
}
