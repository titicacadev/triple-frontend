export function findFoldedPosition(
  maxLines: number,
  comment?: string | null,
  charactersPerLine: number = 25,
) {
  const lines = (comment || '').split('\n')

  let rest = maxLines * charactersPerLine
  let linesCount = 0
  let foldedIndex = 0
  for (const line of lines) {
    if (linesCount === maxLines) {
      return foldedIndex
    }
    if (line.length > rest) {
      return foldedIndex + rest
    }

    foldedIndex = foldedIndex + line.length + 1
    linesCount = linesCount + 1 + Math.floor(line.length / charactersPerLine)
    rest -= line.length
  }

  return null
}
