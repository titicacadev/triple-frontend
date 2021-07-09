import { renderHook } from '@testing-library/react-hooks'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'

import { useHrefToProps } from './use-href-to-props'

jest.mock('@titicaca/react-contexts')

const mockedUseUserAgentContext = (useUserAgentContext as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
>
const mockedUseEnv = (useEnv as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useEnv>, 'webUrlBase'>
>

describe('useHrefToProps', () => {
  const resourceId = '79b938c5-1b4c-45e1-9c9f-6551adae38a2'
  const webUrlBase = 'https://triple.guide'

  mockedUseEnv.mockImplementation(() => ({ webUrlBase }))

  describe('In public', () => {
    beforeEach(() => {
      mockedUseUserAgentContext.mockImplementation(() => ({ isPublic: true }))
    })

    test('external URL', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(hrefToProps('https://www.google.com')).toEqual({
        href: 'https://www.google.com',
        target: 'current',
        allowSource: 'all',
      })
    })

    test('routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(hrefToProps(`/articles/${resourceId}?_triple_no_navbar`)).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'current',
        allowSource: 'all',
      })

      expect(
        hrefToProps(
          `https://triple.guide/articles/${resourceId}?_triple_no_navbar`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'current',
        allowSource: 'all',
      })
    })

    test('not routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(`/articles/${resourceId}/test?_triple_no_navbar`),
      ).toEqual({
        href: `/articles/${resourceId}/test?_triple_no_navbar`,
        target: 'current',
        allowSource: 'app-with-session',
      })
    })

    test('inlink without _web_expand', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/inlink?path=${encodeURIComponent(
            `/articles/${resourceId}/test?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}/test?_triple_no_navbar`,
        target: 'current',
        allowSource: 'app-with-session',
      })
    })

    test('inlink with _web_expand and routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/inlink?path=${encodeURIComponent(
            `/articles/${resourceId}?_triple_no_navbar`,
          )}&_web_expand=true`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'current',
        allowSource: 'all',
      })
    })

    test('outlink with routable URL', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/outlink?url=${encodeURIComponent('https://www.google.com')}`,
        ),
      ).toEqual({
        href: 'https://www.google.com',
        target: 'current',
        allowSource: 'all',
      })

      expect(
        hrefToProps(
          `/outlink?url=${encodeURIComponent(
            `https://triple.guide/articles/${resourceId}?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'current',
        allowSource: 'all',
      })
    })

    test('outlink without routable URL', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/outlink?url=${encodeURIComponent(
            `https://triple.guide/articles/${resourceId}/test?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}/test?_triple_no_navbar`,
        target: 'current',
        allowSource: 'app-with-session',
      })
    })
  })

  describe('In app', () => {
    beforeEach(() => {
      mockedUseUserAgentContext.mockImplementation(() => ({ isPublic: false }))
    })

    test('external URL', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(hrefToProps('https://www.google.com')).toEqual({
        href: 'https://www.google.com',
        target: 'new',
        allowSource: 'all',
      })
    })

    test('routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(hrefToProps(`/articles/${resourceId}?_triple_no_navbar`)).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'new',
        allowSource: 'all',
      })

      expect(
        hrefToProps(
          `https://triple.guide/articles/${resourceId}?_triple_no_navbar`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'new',
        allowSource: 'all',
      })
    })

    test('not routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(`/articles/${resourceId}/test?_triple_no_navbar`),
      ).toEqual({
        href: `/articles/${resourceId}/test?_triple_no_navbar`,
        target: 'new',
        allowSource: 'app-with-session',
      })
    })

    test('inlink with routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/inlink?path=${encodeURIComponent(
            `/articles/${resourceId}?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'new',
        allowSource: 'app',
      })
    })

    test('inlink without routable path', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/inlink?path=${encodeURIComponent(
            `/articles/${resourceId}/test?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}/test?_triple_no_navbar`,
        target: 'new',
        allowSource: 'app-with-session',
      })
    })

    test('outlink with routable URL', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/outlink?url=${encodeURIComponent('https://www.google.com')}`,
        ),
      ).toEqual({
        href: 'https://www.google.com',
        target: 'new',
        allowSource: 'all',
      })

      expect(
        hrefToProps(
          `/outlink?url=${encodeURIComponent(
            `https://triple.guide/articles/${resourceId}?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}?_triple_no_navbar`,
        target: 'new',
        allowSource: 'all',
      })
    })

    test('outlink without routable URL', () => {
      const { result } = renderHook(useHrefToProps)
      const hrefToProps = result.current

      expect(
        hrefToProps(
          `/outlink?url=${encodeURIComponent(
            `https://triple.guide/articles/${resourceId}/test?_triple_no_navbar`,
          )}`,
        ),
      ).toEqual({
        href: `/articles/${resourceId}/test?_triple_no_navbar`,
        target: 'new',
        allowSource: 'app-with-session',
      })
    })
  })
})
