import { Reply } from './types'

export function checkUniqueReply(reply: Reply[]): Reply[] {
  const result = Array.from(
    new Map((reply || []).map((item) => [item.id, item])).values(),
  ).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  return result
}
