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
    <Container width="400px" margin={{ top: 20, left: 20 }}>
      <Container margin={{ bottom: 50 }}>
        <Skeleton height="150px" margin={{ bottom: 15 }} borderRadius={4} />
        <SkeletonText margin={{ bottom: 10 }} />
        <SkeletonText width="80%" margin={{ bottom: 10 }} />
        <SkeletonButton />
      </Container>
      <Container>
        <SkeletonCircle margin={{ bottom: 15 }} />
        <SkeletonText margin={{ bottom: 10 }} />
        <SkeletonText width="80%" margin={{ bottom: 10 }} />
      </Container>
    </Container>
  )
}

BaseSkeleton.storyName = '기본 스켈레톤'
