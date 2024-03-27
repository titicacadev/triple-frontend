import { Reply } from './types'
import { checkUniqueReply } from './utils'

export function addReply(reply: Reply, tree: Reply): Reply {
  if (reply.parentId === tree.id) {
    const addedReplyTree = [...tree.children, reply]
    return {
      ...tree,
      children: addedReplyTree,
      childrenCount: tree.childrenCount + 1,
    }
  } else {
    return {
      ...tree,
      children: tree.children.map((child) => addReply(reply, child)),
    }
  }
}

export function deleteReply(reply: Reply, tree: Reply): Reply | undefined {
  if (reply.id === tree.id) {
    return undefined
  } else {
    const createdChildrenTree = tree.children
      .map((child) => deleteReply(reply, child))
      .filter(Boolean) as Reply[]

    const delta = createdChildrenTree.length - tree.children.length
    const newChildrenCount = tree.childrenCount + delta

    return {
      ...tree,
      children: createdChildrenTree,
      childrenCount: newChildrenCount,
    }
  }
}

export function editReply(
  originalReply: Reply,
  updatedAttributes: Partial<Reply>,
  tree: Reply,
): Reply {
  if (originalReply.id === tree.id) {
    return {
      ...originalReply,
      ...updatedAttributes,
    }
  } else {
    return {
      ...tree,
      children: tree.children.map((child) =>
        editReply(originalReply, updatedAttributes, child),
      ),
    }
  }
}

export function appendReplyChildren(
  originalReply: Reply,
  appendingChildren: Reply[],
  tree: Reply,
): Reply {
  if (originalReply.id === tree.id) {
    return {
      ...tree,
      children: checkUniqueReply([...tree.children, ...appendingChildren]),
    }
  } else {
    return {
      ...tree,
      children: tree.children.map((child) =>
        appendReplyChildren(originalReply, appendingChildren, child),
      ),
    }
  }
}
