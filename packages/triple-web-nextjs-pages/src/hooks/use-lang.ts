import { useRouter } from 'next/router'

export function useLang(fallback: string, key = 'lang') {
  const router = useRouter()
  const lang = router.query[key] || fallback

  return Array.isArray(lang) ? lang[0] : lang
}
