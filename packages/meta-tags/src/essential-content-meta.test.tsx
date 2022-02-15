import { useEnv } from '@titicaca/react-contexts'
import renderer from 'react-test-renderer'

import { EssentialContentMeta } from './essential-content-meta'

jest.mock('next/head', () => {
  function MockHead({ children }: { children: Array<React.ReactElement> }) {
    return <>{children}</>
  }
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
        } as ReturnType<typeof useEnv>),
    )
  })

  it('should render title.', () => {
    const instance = renderer.create(
      <EssentialContentMeta title={title} />,
    ).root

    expect(instance.findByType('title').children).toEqual([title])
  })

  it('should render description.', () => {
    const instance = renderer.create(
      <EssentialContentMeta description={description} />,
    ).root

    expect(
      instance.find(
        (node) => node.type === 'meta' && node.props.name === 'description',
      ).props.content,
    ).toBe(description)
  })

  it('should render canonical url tag.', () => {
    const instance = renderer.create(
      <EssentialContentMeta canonicalUrl={canonicalUrl} />,
    ).root

    expect(
      instance.find(
        (node) => node.type === 'link' && node.props.rel === 'canonical',
      ).props.href,
    ).toBe(canonicalUrl)
  })

  it('should not render canonical url tag when canonicalUrl prop is not provided.', () => {
    const instance = renderer.create(<EssentialContentMeta />).root

    expect(
      instance.findAll(
        (node) => node.type === 'link' && node.props.rel === 'canonical',
      ),
    ).toEqual([])
  })
})
