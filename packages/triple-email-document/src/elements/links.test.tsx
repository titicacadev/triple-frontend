import { render, screen } from '@testing-library/react'

import { ELEMENTS } from '../index'

test('디폴트형 링크 Element를 렌더링합니다.', () => {
  const Links = ELEMENTS.links

  render(
    <Links
      value={{
        links: [{ id: '', label: 'Default Styled Link', href: 'Test Href' }],
        display: 'default',
      }}
    />,
  )

  const anchorElement = screen.getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule('color', '#2987f0')
  expect(anchorElement).toHaveStyleRule('text-decoration', 'underline')
  expect(anchorElement).toHaveTextContent('Default Styled Link')
})

test('버튼형 링크 Element를 렌더링합니다.', () => {
  const Links = ELEMENTS.links

  render(
    <Links
      value={{
        links: [
          {
            id: '',
            label: 'Button Styled Link',
            href: 'Test Href',
          },
        ],
        display: 'button',
      }}
    />,
  )

  const anchorElement = screen.getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(54,143,255,1)',
  )
  expect(anchorElement).toHaveTextContent('Button Styled Link')
})

test('블락형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.links

  render(
    <Link
      value={{
        links: [{ id: '', label: 'Block Styled Link', href: 'Test Href' }],
        display: 'block',
      }}
    />,
  )

  const anchorElement = screen.getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(255,255,255,1)',
  )
  expect(anchorElement).toHaveTextContent('Block Styled Link')
})

test('대형 버튼형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.links

  render(
    <Link
      value={{
        links: [
          {
            id: '',
            label: 'Large Button Styled Link',
            href: 'Test Href',
          },
        ],
        display: 'largeButton',
      }}
    />,
  )

  const anchorElement = screen.getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(54,143,255,1)',
  )
  expect(anchorElement).toHaveStyleRule('border-radius', '4px')
  expect(anchorElement).toHaveTextContent('Large Button Styled Link')
})

test('대형 컴팩트 버튼형 링크 Element를 렌더링합니다.', () => {
  const Link = ELEMENTS.links

  render(
    <Link
      value={{
        links: [
          {
            id: '',
            label: 'Large Compact Button Styled Link',
            href: 'Test Href',
          },
        ],
        display: 'largeCompactButton',
      }}
    />,
  )

  const anchorElement = screen.getByRole('link')

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveStyleRule(
    'background-color',
    'rgba(54,143,255,1)',
  )
  expect(anchorElement).toHaveStyleRule('border-radius', '21px')
  expect(anchorElement).toHaveTextContent('Large Compact Button Styled Link')
})
