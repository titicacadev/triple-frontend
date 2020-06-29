import React from 'react'
import { Skeleton, Container } from '@titicaca/core-elements'

export default {
  title: 'core-elements | skeleton',
}

export function BaseSkeleton() {
  return (
    <Container width="400px" margin={{top: 20, left: 20}}>
      <Skeleton height="150px" margin={{bottom: 15}} borderRadius={4}/>
      <Skeleton height="15px" margin={{bottom: 10}} />
      <Skeleton width="80%" height="15px" />
    </Container>
  )
}

BaseSkeleton.story = {
  name: '기본 스켈레톤',
}