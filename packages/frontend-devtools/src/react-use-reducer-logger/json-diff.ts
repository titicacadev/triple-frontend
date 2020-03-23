import { diff as deepDiff } from 'deep-diff'

export interface Diff {
  _leaf?: boolean
  kind: 'N' | 'D' | 'E'
  path: string[]
  index?: number
  item: Diff
  lhs: unknown
  rhs: unknown
}

type JSONDiff = any

function parseDiffs(
  diffs: Diff[] | undefined,
  base: {
    [key: string]: JSONDiff
  } = {},
): JSONDiff | undefined {
  if (!diffs) {
    return undefined
  }

  return diffs.reduce((result: JSONDiff, diff) => {
    const [head, ...rest] = diff.path

    if (head !== undefined) {
      const a = result[head]
      return {
        ...result,
        [head]: parseDiffs([{ ...diff, ...diff.item, path: rest }], a),
      }
    }

    if (diff.index !== undefined) {
      return {
        ...result,
        [diff.index]: parseDiffs(
          [{ ...diff, ...diff.item, path: [], index: undefined }],
          result[diff.index],
        ),
      }
    }

    return {
      ...diff,
      _leaf: true,
    }
  }, base)
}
export default function diff(prev: object, next: object) {
  return parseDiffs(deepDiff(prev, next) as Diff[] | undefined)
}
