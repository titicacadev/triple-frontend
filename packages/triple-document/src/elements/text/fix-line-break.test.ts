import { fixLineBreak } from './fix-line-break'

it('removes duplicated line break', () => {
  const rawHTML = 'line1<br>\nline2<br>\nline3'

  const result = fixLineBreak(rawHTML)

  expect(result).toBe('line1<br>line2<br>line3')
})
