import { safeParseHexColor } from './utils'

test('sRGB 스펙에 맞는 HEX 코드 색상을 올바르게 처리합니다.', () => {
  const threeValueExample = '#f09'
  const fourValueExample = '#F09'
  const sixValueExample = '#ff0099'
  const eightValueExample = ' #ff009990'

  expect(safeParseHexColor(threeValueExample)).toBe(threeValueExample)
  expect(safeParseHexColor(fourValueExample)).toBe(fourValueExample)
  expect(safeParseHexColor(sixValueExample)).toBe(sixValueExample)
  expect(safeParseHexColor(eightValueExample)).toBe(eightValueExample)
})

test('# 이 포함된 HEX 코드라면 그대로 반환합니다.', () => {
  const example = '#ffffff80'
  expect(safeParseHexColor(example)).toBe(example)
})

test('# 를 제외하고 유효한 HEX 코드라면 #를 포함해서 반환합니다.', () => {
  const example = 'ffffff80'
  expect(safeParseHexColor(example)).toBe(`#${example}`)
})

test('유효한 HEX 코드가 아닐 경우 그대로 반환합니다.', () => {
  const example = 'white'
  expect(safeParseHexColor(example)).toBe(example)
})
