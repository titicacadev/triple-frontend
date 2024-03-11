export function findFoldedPosition(
  maxLines: number,
  comment?: string | null,
  charactersPerLine?: number,
) {
  const lines = (comment || '').split('\n')

  let linesCount = 0
  let foldedIndex = 0
  for (const line of lines) {
    const rest = (maxLines - linesCount) * (charactersPerLine || 25)

    if (line.length > rest || linesCount === maxLines) {
      return foldedIndex + rest
    }

    foldedIndex = foldedIndex + line.length
    linesCount =
      line.length > 0
        ? linesCount + 1 + Math.floor(line.length / (charactersPerLine || 25))
        : linesCount
  }

  return null
}
