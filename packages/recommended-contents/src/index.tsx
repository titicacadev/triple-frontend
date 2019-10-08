import * as React from 'react'
import styled, { css } from 'styled-components'
import {
  Text,
  MarginPadding,
  Responsive,
  Container,
} from '@titicaca/core-elements'
import IntersectionObserver from '@titicaca/intersection-observer'

// eslint-disable-next-line no-unexpected-multiline
const RecommendedContentsContainer = styled.ul<{
  margin?: MarginPadding
}>`
  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

// eslint-disable-next-line no-unexpected-multiline
const RecommendedContentWithDesktopResolution = styled.li<{
  backgroundImageUrl: string
}>`
  display: inline-block;
  vertical-align: top;
  width: calc(50% - 37.5px);
  height: 130px;
  padding: 20px 15px 0 15px;
  margin-bottom: 15px;
  border-radius: 6px;

  ${({ backgroundImageUrl }) =>
    css`
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url(${backgroundImageUrl});
    `};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  cursor: pointer;

  &:before {
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

const RecommendedContentWithMobileResolution = styled.li`
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

export interface ContentElementProps {
  backgroundImageUrl: string
  title: string
}

export default function RecommendedContents<T extends ContentElementProps>({
  contents: contentsData,
  margin,
  onContentClick,
  onContentIntersect,
}: {
  contents: T[]
  margin?: MarginPadding
  onContentClick?: (e?: React.SyntheticEvent, content?: T) => any
  onContentIntersect?: (content: T) => any
}) {
  const contents = contentsData.map(
    ({ title, ...content }) =>
      ({
        title: title.replace('\n', ' '),
        ...content,
      } as T),
  )

  return (
    <RecommendedContentsContainer margin={margin}>
      <Responsive maxWidth={759}>
        <Container padding={{ right: 15 }}>
          {contents.map((content, index) => (
            <IntersectionObserver
              key={index}
              onChange={({ isIntersecting }) =>
                isIntersecting &&
                onContentIntersect &&
                onContentIntersect(content)
              }
            >
              <RecommendedContentWithMobileResolution
                onClick={onContentClick && ((e) => onContentClick(e, content))}
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
            </IntersectionObserver>
          ))}
        </Container>
      </Responsive>
      <Responsive minWidth={760}>
        {contents.map((content, index) => (
          <IntersectionObserver
            key={index}
            onChange={({ isIntersecting }) =>
              isIntersecting &&
              onContentIntersect &&
              onContentIntersect(content as ContentElementProps & T)
            }
          >
            <RecommendedContentWithDesktopResolution
              backgroundImageUrl={content.backgroundImageUrl}
              onClick={
                onContentClick &&
                ((e) => onContentClick(e, content as ContentElementProps & T))
              }
            >
              <Text lineHeight="20px" color="white" bold maxLines={3}>
                {content.title}
              </Text>
            </RecommendedContentWithDesktopResolution>
          </IntersectionObserver>
        ))}
      </Responsive>
    </RecommendedContentsContainer>
  )
}

function Test() {
  return (
    <RecommendedContents
      contents={[
        {
          title: '두줄이ㅁㄴㅇㄹㅁㄴ\n강제로ㅁㄴㅇㄹㅁ',
          backgroundImageUrl:
            'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg',
          url: 'https://triple.guide',
        },
        {
          title: '두줄이ㅁㄴㅇㄹㅁㄴ\n강제로ㅁㄴㅇㄹㅁ',
          backgroundImageUrl:
            'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg',
          url: 'https://triple.guide',
        },
        {
          title: '두줄이ㅁㄴㅇㄹㅁㄴ\n강제로ㅁㄴㅇㄹㅁ',
          backgroundImageUrl:
            'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4984852d-61df-4fab-95f9-da24d257a829.jpeg',
          url: 'https://triple.guide',
        },
      ]}
      onContentIntersect={(content) => content}
    />
  )
}
