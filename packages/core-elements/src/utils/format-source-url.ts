export default function formatSourceUrl(url: string) {
  return `출처 ${url.replace(/^https?:\/\//, '')}`
}
