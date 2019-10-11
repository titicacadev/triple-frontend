import * as React from 'react'

import { Container, Text, Image } from '@titicaca/core-elements'

import AuthorContent from './author-content'

export interface Content {
  title: string
}

export default function Author({
  source: { name, bio, image },
  bioOverride,
  onClick,
  authorContents,
  onAuthorContentClick,
}: {
  source: { name: string; bio?: string; image?: any }
  bioOverride?: string
  onClick?: (e?: React.SyntheticEvent) => any
  authorContents?: Content[]
  onAuthorContentClick?: ({ content: AuthorContent }) => any
}) {
  return (
    <Container
      margin={{ top: 41, left: 30, right: 30, bottom: 50 }}
      onClick={onClick}
    >
      {image && (
        <Image
          floated="right"
          circular
          diameter={45}
          src={image.sizes.large.url}
        />
      )}
      <Container>
        <Text bold size="large" color="gray" padding={{ top: 7, bottom: 4 }}>
          {name}
        </Text>
        <Text size="tiny" color="gray" alpha={0.3}>
          평범한 회사원이자 찰나의 셔터 기록자.
        </Text>
      </Container>
      <Text
        size="small"
        color="gray"
        alpha={0.5}
        lineHeight={1.43}
        margin={{ top: 21 }}
      >
        {bioOverride || bio}
      </Text>

      {(authorContents || {}).length > 0 ? (
        <Container margin={{ top: 51 }}>
          {authorContents.map((articleContent, index) => (
            <AuthorContent
              key={index}
              content={articleContent}
              onClick={onAuthorContentClick}
            />
          ))}
        </Container>
      ) : null}
    </Container>
  )
}
