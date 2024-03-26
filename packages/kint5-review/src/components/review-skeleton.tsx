import styled from 'styled-components'

const SkeletonBar = styled.div`
  background-color: var(--color-kint5-gray20);
  border-radius: 4px;
  height: 16px;
`

export function ReviewSkeleton() {
  return (
    <div css={{ marginTop: 26 }}>
      <SkeletonBar
        css={{
          width: 100,
          margin: '12px 0',
        }}
      />
      <SkeletonBar css={{ width: 200, marginTop: 18 }} />
      <SkeletonBar css={{ width: '100%', marginTop: 16 }} />
      <div
        css={{
          width: '100%',
          height: 200,
          backgroundColor: 'var(--color-kint5-gray20)',
          marginTop: 16,
          borderRadius: 12,
        }}
      />
    </div>
  )
}
