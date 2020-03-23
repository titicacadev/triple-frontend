interface TreeDiff {
  _leaf?: boolean
  kind: 'N' | 'D' | 'E'
  lhs: unknown
  rhs: unknown
  [key: string]: any
}

function getProperties(diff: TreeDiff) {
  switch (diff.kind) {
    case 'N':
      return ['+', diff.rhs]

    case 'D':
      return ['-', diff.lhs]

    case 'E':
      return [diff.lhs, '->', diff.rhs]
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
        console.log(`${index}: `, ...getProperties(e))
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
      console.log(`${key}: `, ...getProperties(value[key]))
    }
  })
}
