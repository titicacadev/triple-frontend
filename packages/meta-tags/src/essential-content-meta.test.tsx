/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react'
import { useEnv } from '@titicaca/triple-web'

import { EssentialContentMeta } from './essential-content-meta'

jest.mock('next/head', () => {
  function MockHead({ children }: { children: Array<React.ReactElement> }) {
    return <>{children}</>
  }
  return {
    __esModule: true,
    default: MockHead,
  }
})
jest.mock('@titicaca/react-contexts')

describe('EssentialContentMeta', () => {
  const title = '모바일 여행 가이드북 - 트리플'
  const description = '최고의 여행 가이드에요! 이것만 있으면 만사형통!'
  const canonicalUrl = 'https://triple.guide/hotels'

  beforeEach(() => {
    const mockedUseEnv = useEnv as jest.MockedFunction<typeof useEnv>

    mockedUseEnv.mockImplementation(
      () =>
        ({
          defaultPageTitle: title,
          defaultPageDescription: description,
        }) as ReturnType<typeof useEnv>,
    )
  })

  it('should render title.', () => {
    render(<EssentialContentMeta title={title} />)

    expect(document.title).toBe(title)
  })

  it('should render description.', () => {
    render(<EssentialContentMeta description={description} />)

    const element = document.querySelector('meta[name="description"]')

    expect(element).toHaveAttribute('content', description)
  })

  it('should render canonical url tag.', () => {
    render(<EssentialContentMeta canonicalUrl={canonicalUrl} />)

    const element = document.querySelector('link[rel="canonical"]')

    expect(element).toHaveAttribute('href', canonicalUrl)
  })

  it('should not render canonical url tag when canonicalUrl prop is not provided.', () => {
    render(<EssentialContentMeta />)

    const element = document.querySelector('link[rel="canonical"]')

    expect(element).not.toBeInTheDocument()
  })
})
