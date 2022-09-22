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
      margin={{ top: 20, left: 20 }}
      css={{
        width: '400px',
      }}
    >
      <Container margin={{ bottom: 50 }}>
        <Skeleton
          margin={{ bottom: 15 }}
          borderRadius={4}
          css={{
            height: '150px',
          }}
        />
        <SkeletonText margin={{ bottom: 10 }} />
        <SkeletonText
          margin={{ bottom: 10 }}
          css={{
            width: '80%',
          }}
        />
        <SkeletonButton />
      </Container>
      <Container>
        <SkeletonCircle margin={{ bottom: 15 }} />
        <SkeletonText margin={{ bottom: 10 }} />
        <SkeletonText
          margin={{ bottom: 10 }}
          css={{
            width: '80%',
          }}
        />
      </Container>
    </Container>
  )
}

BaseSkeleton.storyName = '기본 스켈레톤'
