/**
 * https://developer.mozilla.org/ko/docs/Web/HTML/Link_types
 */
type LinkType =
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

export interface RelListProps {
  /**
   * anchor 엘리먼트의 링크 유형 목록입니다.
   * 중복을 알아서 제거하기 때문에 미리 제거할 필요 없습니다.
   * @link https://developer.mozilla.org/ko/docs/Web/HTML/Link_types
   */
  relList?: LinkType[]
}

export function useRel(relList: LinkType[] = []): string {
  return Array.from(new Set(['noopener', 'noreferer', ...relList])).join(' ')
}
