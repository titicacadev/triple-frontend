import styled from 'styled-components'

const SkeletonBar = styled.div`
  background-color: var(--color-kint5-gray20);
  border-radius: 4px;
  height: 16px;
`

export function ReviewSkeleton() {
  return (
    <div css={{ marginTop: 26, paddingTop: 6 }}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          css={{
            width: 40,
            height: 40,
            backgroundColor: 'var(--color-kint5-gray20)',
            borderRadius: '50%',
          }}
        />
        <SkeletonBar css={{ width: 100 }} />
      </div>
      <SkeletonBar css={{ width: 200, marginTop: 31 }} />
      <SkeletonBar css={{ width: '100%', marginTop: 20 }} />
      <div
        css={{
          width: '100%',
          height: 200,
          backgroundColor: 'var(--color-kint5-gray20)',
          marginTop: 16,
          borderRadius: 12,
        }}
      />
      <SkeletonBar css={{ width: 130, margin: '20px 0 0 auto' }} />
    </div>
  )
}
