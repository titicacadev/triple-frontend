export default function formatSourceURL(url: string) {
  return `출처 ${url.replace(/^https?:\/\//, '')}`
}
