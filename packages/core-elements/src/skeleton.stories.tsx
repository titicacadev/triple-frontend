import Container from './elements/container'
import {
  Skeleton,
  SkeletonButton,
  SkeletonCircle,
  SkeletonText,
} from './elements/skeleton'

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
          margin: '0 0 50px',
        }}
      >
        <Skeleton
          borderRadius={4}
          css={{
            height: '150px',
            margin: '0 0 15px',
          }}
        />
        <SkeletonText
          css={{
            margin: '0 0 10px',
          }}
        />
        <SkeletonText
          css={{
            width: '80%',
            margin: '0 0 10px',
          }}
        />
        <SkeletonButton />
      </Container>
      <Container>
        <SkeletonCircle
          css={{
            margin: '0 0 15px',
          }}
        />
        <SkeletonText
          css={{
            margin: '0 0 10px',
          }}
        />
        <SkeletonText
          css={{
            width: '80%',
            margin: '0 0 10px',
          }}
        />
      </Container>
    </Container>
  )
}

BaseSkeleton.storyName = '기본 스켈레톤'
