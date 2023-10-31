import type { Meta } from '@storybook/react'

import ELEMENTS from './elements'

const MOCK_IMAGE_LINKS_VALUE = {
  links: [
    {
      label: '메가 돈키호테 시부야 본점',
      image: {
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/1c22ae37-108f-44a7-b96b-1d70179b0b3f.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/1c22ae37-108f-44a7-b96b-1d70179b0b3f.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/1c22ae37-108f-44a7-b96b-1d70179b0b3f.jpeg',
          },
        },
      },
      description: '관광명소',
    },
    {
      label: '도쿄의 이색 체험',
      image: {
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/fc59cda3-056b-41ca-9c87-242d6f15074d.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/fc59cda3-056b-41ca-9c87-242d6f15074d.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/fc59cda3-056b-41ca-9c87-242d6f15074d.jpeg',
          },
        },
      },
      description: '가이드',
    },
    {
      label: 'onion 安国店',
      href: '/regions/b263b346-9a60-49d5-949a-dc88dfbea53e/restaurants/35412618-bb23-4c1d-9c40-7fe239e7a150',
      image: {
        cloudinaryId: '73eee4a9-0f4a-40f0-b963-07720328a1ab',
        id: '73eee4a9-0f4a-40f0-b963-07720328a1ab',
        type: 'image',
        source: {},
        width: 1080,
        height: 1080,
        cloudinaryBucket: 'triple-cms',
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/73eee4a9-0f4a-40f0-b963-07720328a1ab.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/73eee4a9-0f4a-40f0-b963-07720328a1ab.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/73eee4a9-0f4a-40f0-b963-07720328a1ab.jpeg',
          },
        },
        sourceUrl: 'https://www.instagram.com/p/BxL70qeDn7h/',
      },
      description: '음식점',
    },
    {
      label: 'スルイクヌンマウル',
      href: '/regions/b263b346-9a60-49d5-949a-dc88dfbea53e/restaurants/09d436f9-1717-48a6-9228-be0527c3e713',
      description: '음식점',
    },
  ],
  display: 'image',
}

const { links: Links } = ELEMENTS

export default { title: 'kint5-document / 링크', component: Links } as Meta

export function Normal() {
  return (
    <Links
      value={{
        links: [
          {
            label: '방콕 3박 4일 가이드',
          },
          {
            label: '도쿄 타워',
          },
        ],
      }}
    />
  )
}
Normal.storyName = '일반'

export function Emphasized() {
  return (
    <Links
      value={{
        links: [
          {
            label: '다낭 바로 가기',
          },
        ],
        display: 'button',
      }}
    />
  )
}
Emphasized.storyName = '강조'

export function EmphasizedTwo() {
  return (
    <Links
      value={{
        links: [
          {
            label: '다낭 바로 가기',
          },
          {
            label: '도쿄 바로 가기',
          },
        ],
        display: 'button',
      }}
    />
  )
}
EmphasizedTwo.storyName = '강조 (2개)'

export function Extended() {
  return (
    <Links
      value={{
        links: [
          {
            label: '장소 보기',
          },
        ],
        display: 'block',
      }}
    />
  )
}
Extended.storyName = '확장'

export function ExtendedWithLevel() {
  return (
    <Links
      value={{
        links: [
          {
            label: '장소 보기',
            level: 'primary',
          },
          {
            label: '장소 보기',
            level: 'secondary',
          },
        ],
        display: 'block',
      }}
    />
  )
}
ExtendedWithLevel.storyName = '확장 + Level'

export function Image() {
  return <Links value={MOCK_IMAGE_LINKS_VALUE} />
}
Image.storyName = '이미지'
