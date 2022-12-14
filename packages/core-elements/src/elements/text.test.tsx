import renderer from 'react-test-renderer'

import Text from './text'

import 'jest-styled-components'

it('should have default styles', () => {
  const tree = renderer.create(<Text />).toJSON()

  expect(tree).toHaveStyleRule('box-sizing', 'border-box')
  expect(tree).toHaveStyleRule('overflow-wrap', 'break-word')
  expect(tree).toHaveStyleRule('float', 'none')
  expect(tree).toHaveStyleRule('font-weight', '500')
  expect(tree).toHaveStyleRule('white-space', 'pre-line')
})

it('should accept style shortcut props', () => {
  const tree = renderer
    .create(
      <Text
        cursor="pointer"
        floated="left"
        textAlign="right"
        whiteSpace="pre"
        wordBreak="keep-all"
      />,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('cursor', 'pointer')
  expect(tree).toHaveStyleRule('float', 'left')
  expect(tree).toHaveStyleRule('text-align', 'right')
  expect(tree).toHaveStyleRule('white-space', 'pre')
  expect(tree).toHaveStyleRule('word-break', 'keep-all')
})

it('should accept inline prop', () => {
  const tree = renderer.create(<Text inline />).toJSON()

  expect(tree).toHaveStyleRule('display', 'inline')
})

it('should accept inlineBlock prop', () => {
  const tree = renderer.create(<Text inlineBlock />).toJSON()

  expect(tree).toHaveStyleRule('display', 'inline-block')
})

it('should take on inlineBlock than inline when both are passed', () => {
  const tree = renderer.create(<Text inline inlineBlock />).toJSON()

  expect(tree).toHaveStyleRule('display', 'inline-block')
})

it('should accept inlineBlock prop', () => {
  const tree = renderer.create(<Text bold />).toJSON()

  expect(tree).toHaveStyleRule('font-weight', 'bold')
})

it('should take center prop', () => {
  const tree = renderer.create(<Text center />).toJSON()

  expect(tree).toHaveStyleRule('text-align', 'center')
})

it('should take on textAlign than center when both are passed', () => {
  const tree = renderer.create(<Text center textAlign="right" />).toJSON()

  expect(tree).toHaveStyleRule('text-align', 'right')
})

it('should accept strikethrough prop', () => {
  const tree = renderer.create(<Text strikethrough />).toJSON()

  expect(tree).toHaveStyleRule('text-decoration', 'line-through')
})

it('should accept underline prop', () => {
  const tree = renderer.create(<Text underline />).toJSON()

  expect(tree).toHaveStyleRule('text-decoration', 'underline')
})

it('should take on strikethrough than underline when both are passed', () => {
  const tree = renderer.create(<Text strikethrough underline />).toJSON()

  expect(tree).toHaveStyleRule('text-decoration', 'line-through')
})

it('should accept color prop', () => {
  const tree = renderer.create(<Text color="white" />).toJSON()

  expect(tree).toHaveStyleRule('color', 'rgba(255,255,255,1)')
})

it('should accept color prop with alpha', () => {
  const tree = renderer.create(<Text alpha={0.5} color="white" />).toJSON()

  expect(tree).toHaveStyleRule('color', 'rgba(255,255,255,0.5)')
})

it('should accept spacing props', () => {
  const tree = renderer
    .create(
      <Text
        margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
        padding={{ top: 50, right: 60, bottom: 70, left: 80 }}
      />,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('margin', '10px 20px 30px 40px')
  expect(tree).toHaveStyleRule('padding', '50px 60px 70px 80px')
})

it('should accept ellipsis mixin', () => {
  const tree = renderer.create(<Text ellipsis />).toJSON()

  expect(tree).toHaveStyleRule('white-space', 'nowrap')
  expect(tree).toHaveStyleRule('text-overflow', 'ellipsis')
  expect(tree).toHaveStyleRule('overflow', 'hidden')
})

it('should accept maxLines mixin', () => {
  const tree = renderer.create(<Text maxLines={2} />).toJSON()

  expect(tree).toHaveStyleRule('display', '-webkit-box')
  expect(tree).toHaveStyleRule('-webkit-box-orient', 'vertical')
  expect(tree).toHaveStyleRule('-webkit-line-clamp', '2')
  expect(tree).toHaveStyleRule('overflow', 'hidden')
})

it('should accept legacy typography props', () => {
  const tree = renderer
    .create(<Text size="large" lineHeight={1} letterSpacing={0.1} />)
    .toJSON()

  expect(tree).toHaveStyleRule('font-size', '16px')
  expect(tree).toHaveStyleRule('line-height', '1')
  expect(tree).toHaveStyleRule('letter-spacing', '0.1px')
})

it('should accept textStyle mixin', () => {
  const tree = renderer.create(<Text textStyle="M" />).toJSON()

  expect(tree).toHaveStyleRule('font-size', '20px')
  expect(tree).toHaveStyleRule('line-height', '24px')
  expect(tree).toHaveStyleRule('letter-spacing', '-0.2px')
})

it('should ignore legacy typography props when textStyle mixin is passed', () => {
  const tree = renderer
    .create(
      <Text textStyle="M" size="large" lineHeight={1} letterSpacing={0.1} />,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('font-size', '20px')
  expect(tree).toHaveStyleRule('line-height', '24px')
  expect(tree).toHaveStyleRule('letter-spacing', '-0.2px')
})
