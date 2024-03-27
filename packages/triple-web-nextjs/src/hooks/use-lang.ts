import { useSearchParams } from 'next/navigation'

export function useLang(fallback: string, key = 'lang') {
  const searchParams = useSearchParams()
  const lang = searchParams.get(key) || fallback

  return lang
}
