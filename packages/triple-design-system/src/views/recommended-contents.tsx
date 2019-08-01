import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../elements/text'
import { MarginPadding } from '../commons'

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

const RecommendedContent = styled.li<{
  backgroundImageUrl: string
}>`
  display: inline-block;
  vertical-align: top;
  width: calc(50% - 45px);
  height: 130px;
  padding: 20px 15px 0 15px;
  margin: 0 15px 15px 0;
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

  @media(max-width: 759px) {
    display: none;
  }

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
`

const RecommendedContentWithFixedRatio = styled.li`
  display: inline-block;
  vertical-align: top;
  width: calc(50% - 15px);
  height: 0;
  padding-top: calc(50% - 15px);
  margin: 0 15px 15px 0;
  border-radius: 6px;
  position: relative;

  cursor: pointer;

  overflow: hidden;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media(min-width: 760px) {
    display: none;
  }

  & > * {
    position: absolute;
    top: 0;
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

export function RecommendedContents({
  contents,
  margin,
  onContentClick,
}: {
  contents: Array<{
    backgroundImageUrl: string
    title: string
  }>
  margin?: MarginPadding
  onContentClick?: (
    e?: React.SyntheticEvent,
    content?: { backgroundImageUrl: string; title: string },
  ) => any
}) {
  return (
    
    <RecommendedContentsContainer margin={margin}>
      {contents.map((content, index) => (
        <RecommendedContentWithFixedRatio
          key={index}
          onClick={onContentClick && ((e) => onContentClick(e, content))}
        >
          <Image src={content.backgroundImageUrl} />
          <ImageColorOverlay />
          <Text lineHeight="20px" color="white" bold maxLines={2} padding={{top: 20, left: 15, right: 15}}>
            {content.title}
          </Text>
        </RecommendedContentWithFixedRatio>
      ))}
      {contents.map((content, index) => (
        <RecommendedContent
          key={index}
          backgroundImageUrl={content.backgroundImageUrl}
          onClick={onContentClick && ((e) => onContentClick(e, content))}
        >
          <Text lineHeight="20px" color="white" bold maxLines={2}>
            {content.title}
          </Text>
        </RecommendedContent>
      ))}
    </RecommendedContentsContainer>
  )
}
