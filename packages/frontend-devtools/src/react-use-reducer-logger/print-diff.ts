interface TreeDiff {
  _leaf?: boolean
  kind: 'N' | 'D' | 'E'
  lhs: unknown
  rhs: unknown
  [key: string]: any
}

function printLeaf(key: string | number, diff: TreeDiff) {
  switch (diff.kind) {
    case 'N':
      console.log(
        `%c${key}: %c+`,
        'font-weight: bold',
        'color: #22bb33;',
        diff.rhs,
      )
      break

    case 'D':
      console.log(
        `%c${key}: %c-`,
        'font-weight: bold',
        'color: #bb2124;',
        diff.lhs,
      )
      break

    case 'E':
      console.log(`%c${key}:`, 'font-weight: bold', diff.lhs, '->', diff.rhs)
      break
  }
}

export default function printDiff(value: TreeDiff | TreeDiff[] | undefined) {
  if (!value) {
    console.log('state not changed')
    return
  }

  if (Array.isArray(value)) {
    value.forEach((e, index) => {
      if (!e._leaf) {
        console.groupCollapsed(index)
        printDiff(e)
        console.groupEnd()
      } else {
        printLeaf(index, e)
      }
    })
    return
  }

  Object.keys(value).forEach((key: string) => {
    if (!value[key]._leaf) {
      console.groupCollapsed(key)
      printDiff(value[key])
      console.groupEnd()
    } else {
      printLeaf(key, value[key])
    }
  })
}
