import React from 'react'

// TODO: children 제거하기
export default function ImageSource({
  sourceUrl,
  children,
}: {
  sourceUrl?: string
  children?: string
}) {
  return (
    <>{`출처 ${(sourceUrl || children || '').replace(/^https?:\/\//, '')}`}</>
  )
}
