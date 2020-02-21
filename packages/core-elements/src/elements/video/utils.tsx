export function formatTime(totalSeconds: number) {
  const minutes = pad2(String(Math.floor(totalSeconds / 60)))
  const seconds = pad2(String(totalSeconds % 60))

  return `${minutes}:${seconds}`
}

function pad2(original: string) {
  if (original.length === 0) {
    return '00'
  } else if (original.length === 1) {
    return `0${original}`
  }

  return original
}
