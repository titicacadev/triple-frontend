import { Reply } from './types'

export function checkUniqueReply(reply: Reply[]): Reply[] {
  const result = [
    ...new Map(
      (reply || []).map((item) => [
        item.id,
        { ...item, children: checkUniqueReply(item.children) },
      ]),
    ).values(),
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  return result
}
