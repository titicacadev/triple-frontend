import styled from 'styled-components'

import { StaticPageContents } from '.'

export default {
  title: 'static-page-contents / Static Page Contents',
  component: StaticPageContents,
}

const CustomStyledStaticContents = styled(StaticPageContents)`
  && {
    color: red;
  }
`

export function Basic() {
  return <StaticPageContents src="static-mock.html" />
}

Basic.storyName = 'Basic usage'

export function withFallback() {
  return (
    <StaticPageContents
      src="can-not-load-static-file.html"
      onFallback={() => <span>custom fallback contents</span>}
    />
  )
}

withFallback.storyName = 'with Fallback'

export function withCustomStyle() {
  return <CustomStyledStaticContents src="static-mock.html" />
}

withCustomStyle.storyName = 'with Styled Component'
