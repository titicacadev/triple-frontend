export function ImageSource({ children }) {
  return `출처 ${children.replace(/^https?:\/\//, '')}`
}
