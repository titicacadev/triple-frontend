import { SyntheticEvent } from 'react'
import { styled, css } from 'styled-components'
import { Text, MarginPadding, Responsive, Container } from '@titicaca/tds-ui'
import { InView } from 'react-intersection-observer'

const RecommendedContentsContainer = styled.section<{
  margin?: MarginPadding
}>`
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin.top || 0}px ${margin.right || 0}px
        ${margin.bottom || 0}px ${margin.left || 0}px;
    `};
`

const RecommendedContentWithDesktopResolution = styled.div<{
  backgroundImageUrl: string
}>`
  display: inline-block;
  vertical-align: top;
  width: calc(50% - 7.5px);
  height: 150px;
  padding: 20px 15px 0;
  margin-bottom: 15px;
  border-radius: 6px;
  ${({ backgroundImageUrl }) => css`
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${backgroundImageUrl});
  `};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    background-image: url('https://assets.triple.guide/images/ico-arrow@4x.png');
    float: right;
    margin-right: -20px;
    position: relative;
    right: 20px;
    top: 45px;
  }

  &:nth-child(odd) {
    margin-right: 15px;
  }
`

const RecommendedContentWithMobileResolution = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
  height: 0;
  padding-top: 60%;
  margin-bottom: 15px;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  & > * {
    position: absolute;
    top: 0;
  }

  &:nth-child(even) {
    left: 15px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageColorOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`

interface ContentElementProps {
  backgroundImageUrl: string
  title: string
}

export function RecommendedContents<T extends ContentElementProps>({
  contents: contentsData,
  margin,
  onContentClick,
  onContentIntersect,
}: {
  contents: T[]
  margin?: MarginPadding
  onContentClick?: (e: SyntheticEvent, content: T) => void
  onContentIntersect?: (content: T) => void
}) {
  const contents = contentsData.map(({ title, ...content }) => ({
    title: title.replace('\n', ' '),
    ...content,
  })) as T[]

  return (
    <RecommendedContentsContainer margin={margin}>
      <Responsive maxWidth={767}>
        <Container
          as="ul"
          css={{
            padding: '0 15px 0 0',
          }}
        >
          {contents.map((content, index) => (
            <InView
              key={index}
              onChange={(inView) =>
                inView && onContentIntersect && onContentIntersect(content)
              }
            >
              {({ ref }) => (
                <RecommendedContentWithMobileResolution
                  ref={ref}
                  onClick={
                    onContentClick && ((e) => onContentClick(e, content))
                  }
                >
                  <Image src={content.backgroundImageUrl} />
                  <ImageColorOverlay />
                  <Text
                    lineHeight="20px"
                    color="white"
                    bold
                    maxLines={3}
                    padding={{ top: 20, left: 15, right: 15 }}
                  >
                    {content.title}
                  </Text>
                </RecommendedContentWithMobileResolution>
              )}
            </InView>
          ))}
        </Container>
      </Responsive>
      <Responsive as="ul" minWidth={768}>
        {contents.map((content, index) => (
          <InView
            key={index}
            onChange={(inView) =>
              inView && onContentIntersect && onContentIntersect(content)
            }
          >
            {({ ref }) => (
              <RecommendedContentWithDesktopResolution
                ref={ref}
                backgroundImageUrl={content.backgroundImageUrl}
                onClick={onContentClick && ((e) => onContentClick(e, content))}
              >
                <Text lineHeight="20px" color="white" bold maxLines={3}>
                  {content.title}
                </Text>
              </RecommendedContentWithDesktopResolution>
            )}
          </InView>
        ))}
      </Responsive>
    </RecommendedContentsContainer>
  )
}
