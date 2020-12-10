/**
 * https://developer.mozilla.org/ko/docs/Web/HTML/Link_types
 */
export type LinkType =
  | 'alternate'
  | 'author'
  | 'bookmark'
  | 'external'
  | 'help'
  | 'license'
  | 'next'
  | 'nofollow'
  | 'noopener'
  | 'noreferrer'
  | 'prev'
  | 'search'
  | 'tag'

export function useRel(relList: LinkType[] = []): string {
  return [...new Set(['noopener', 'noreferer', ...relList])].join(' ')
}
