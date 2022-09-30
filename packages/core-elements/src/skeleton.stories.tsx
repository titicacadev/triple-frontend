import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonButton,
  Container,
} from '@titicaca/core-elements'

export default {
  title: 'core-elements / Skeleton',
}

export function BaseSkeleton() {
  return (
    <Container
      css={{
        width: '400px',
        margin: '20px 0 0 20px',
      }}
    >
      <Container
        css={{
          margin: '0 0 50px 0',
        }}
      >
        <Skeleton
          borderRadius={4}
          css={{
            height: '150px',
            margin: '0 0 15px 0',
          }}
        />
        <SkeletonText
          css={{
            margin: '0 0 10px 0',
          }}
        />
        <SkeletonText
          css={{
            width: '80%',
            margin: '0 0 10px 0',
          }}
        />
        <SkeletonButton />
      </Container>
      <Container>
        <SkeletonCircle
          css={{
            margin: '0 0 15px 0',
          }}
        />
        <SkeletonText
          css={{
            margin: '0 0 10px 0',
          }}
        />
        <SkeletonText
          css={{
            width: '80%',
            margin: '0 0 10px 0',
          }}
        />
      </Container>
    </Container>
  )
}

BaseSkeleton.storyName = '기본 스켈레톤'
