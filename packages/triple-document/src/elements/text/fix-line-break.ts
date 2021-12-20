export function fixLineBreak(rawHTML: any) {
  if (typeof rawHTML === 'string') {
    return rawHTML.replace(/<br>\n/g, '<br>')
  }

  return rawHTML
}
