import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

test('버튼형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.link

  const { getByRole } = render(
    <Link
      value={{
        id: '',
        label: 'Button Styled Link',
        href: 'Test Href',
        display: 'button',
      }}
    />,
  )

  const anchorElement = getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(54,143,255,1)',
  )
  expect(anchorElement).toHaveTextContent('Button Styled Link')
})

test('블락형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.link

  const { getByRole } = render(
    <Link
      value={{
        id: '',
        label: 'Block Styled Link',
        href: 'Test Href',
        display: 'block',
      }}
    />,
  )

  const anchorElement = getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(255,255,255,1)',
  )
  expect(anchorElement).toHaveTextContent('Block Styled Link')
})

test('대형 버튼형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.link

  const { getByRole } = render(
    <Link
      value={{
        id: '',
        label: 'Large Button Styled Link',
        href: 'Test Href',
        display: 'largeButton',
      }}
    />,
  )

  const anchorElement = getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(54,143,255,1)',
  )
  expect(anchorElement).toHaveStyleRule('border-radius', '4px')
  expect(anchorElement).toHaveTextContent('Large Button Styled Link')
})

test('대형 버튼형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.link

  const { getByRole } = render(
    <Link
      value={{
        id: '',
        label: 'Large Compact Button Styled Link',
        href: 'Test Href',
        display: 'largeCompactButton',
      }}
    />,
  )

  const anchorElement = getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(54,143,255,1)',
  )
  expect(anchorElement).toHaveStyleRule('border-radius', '21px')
  expect(anchorElement).toHaveTextContent('Large Compact Button Styled Link')
})
