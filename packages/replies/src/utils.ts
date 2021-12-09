import { Reply as ReplyType } from './types'

export function checkUniqueReply(reply: ReplyType[]) {
  const result = [
    ...new Map((reply || []).map((item) => [item.id, item])).values(),
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  return result
}
