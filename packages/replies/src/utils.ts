import { Reply } from './types'

export function checkUniqueReply(reply: Reply[]): Reply[] {
  const result = [
    ...new Map((reply || []).map((item) => [item.id, item])).values(),
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  return result
}

export function sortReply(reply: Reply): Reply {
  const sortedChildReply = reply.children.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  const result = {
    ...reply,
    children: sortedChildReply,
  }

  return result
}
