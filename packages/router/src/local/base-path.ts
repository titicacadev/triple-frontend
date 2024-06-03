import { parseUrl, generateUrl } from '@titicaca/view-utilities'
import { useRouter } from 'next/router'

export function useBasePathAdder() {
  const { basePath } = useRouter()

  return (href: string): string => addBasePath(href, basePath)
}

function addBasePath(href: string, basePath: string): string {
  const { path, ...rest } = parseUrl(href)
  const newPath = path === '/' ? basePath : `${basePath}${path}`

  return generateUrl({ path: newPath, ...rest })
}
