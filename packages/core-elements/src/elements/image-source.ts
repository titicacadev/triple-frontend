export default function ImageSource({ children }: { children: string }) {
  return `출처 ${children.replace(/^https?:\/\//, '')}`
}
