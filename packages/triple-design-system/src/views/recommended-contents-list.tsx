import React from 'react'
import styled, { css } from 'styled-components'
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
  width: 120px;
  height: 130px;
  padding: 20px 15px 0 15px;
  margin: 0 15px 15px 0;
  border-radius: 6px;

  cursor: pointer;

  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ backgroundImageUrl }) =>
    css`
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url(${backgroundImageUrl});
    `};
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 760px) {
    width: calc(50% - 45px);
    height: 130px;

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
  }
`

export default function RecommendedContentsList({
  contents,
  margin,
  onContentClick,
}: {
  contents: Array<{
    backgroundImageUrl: string
    title: string
  }>
  margin?: MarginPadding
  onContentClick?: any
}) {
  return (
    <RecommendedContentsContainer {...{ margin }}>
      {contents.map((content, index) => (
        <RecommendedContent
          key={index}
          backgroundImageUrl={content.backgroundImageUrl}
          dangerouslySetInnerHTML={{ __html: content.title }}
          onClick={() => onContentClick && onContentClick(content)}
        />
      ))}
    </RecommendedContentsContainer>
  )
}
