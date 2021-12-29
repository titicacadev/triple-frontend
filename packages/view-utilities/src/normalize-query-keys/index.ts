import qs from 'qs'
import { camelizeKeys } from 'humps'

interface ParsedUrlQuery {
  [key: string]: string | string[] | undefined
}

/**
 * 주어진 URL query의 key 값을 camelize합니다.
 * humps의 camelizeKey에 타입을 지정해주기 위한 래퍼입니다.
 * @param query
 */
function camelizeUrlQuery(query: object | object[]): ParsedUrlQuery {
  return camelizeKeys(query) as unknown as ParsedUrlQuery
}

/**
 * next.js는 같은 key 값이 있을 때만 array로 합쳐주는데,
 * qs는 어레이를 `key[0]`으로 stringify하기 때문에 불일치가 발생합니다.
 * 이를 해결합니다.
 *
 * qs.parse의 반환 형식은 ParsedQs입니다.
 * 이는 value로 ParsedQs와 ParsedQs[]를 가질 수 있는 형식입니다.
 * 하지만 아직 nested objects를 query string으로 사용하는 경우는 없기 때문에 무시합니다.
 * @param rawQuery
 */
function mergeIndexedKeys(rawQuery: ParsedUrlQuery): ParsedUrlQuery {
  return qs.parse(qs.stringify(rawQuery)) as unknown as ParsedUrlQuery
}

/**
 * query string object의 key값을 사용하기 편하게 가공하는 함수
 * camelize와 array를 변환하는 함수를 통과시킵니다.
 *
 * @param rawQuery 가공되기 전 query string (ex. getServerSideProps의 파라미터)
 */
export function normalizeQueryKeys(rawQuery: ParsedUrlQuery): ParsedUrlQuery {
  return mergeIndexedKeys(camelizeUrlQuery(rawQuery))
}
