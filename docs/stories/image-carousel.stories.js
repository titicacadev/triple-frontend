import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { text, number, select, boolean } from '@storybook/addon-knobs'

import IMAGES from './image-carousel.sample.json'
import { ImagePager } from '@titicaca/image-carousel'

const MoreImageOverlayLink = styled.a`
  width: 100%;
  text-align: center;
  color: white;
  vertical-align: middle;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  text-decoration: none;
`

const MoreImageOverlayLinkIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: sub;
`
const OverlayContent = () => {
  return (
    <MoreImageOverlayLink>
      트리플 앱에서 더보기
      <MoreImageOverlayLinkIcon
        src={'https://assets.triple.guide/images/ico-arrow@4x.png'}
      />
    </MoreImageOverlayLink>
  )
}

storiesOf('ImagePager', module).add('일반', () => {
  return (
    <ImagePager
      size="large"
      images={IMAGES}
      currentPage={0}
      borderRadius={6}
      onImageClick={(e) => {
        console.log(e)
      }}
      onPageChange={(e) => {
        console.log(e)
      }}
      ImageSource={({ children }) =>
        `출처 ${children.replace(/^https?:\/\//, '')}`
      }
      lastPageOverlayContent={<OverlayContent />}
    ></ImagePager>
  )
})
// storiesOf('Button', module)
//   .add('일반', () => (
//     <Button
//       size={select('버튼 크기', ['tiny', 'small'], 'tiny')}
//       onClick={action('clicked')}
//     >
//       {text('버튼 레이블', '안녕')}
//     </Button>
//   ))
//   .add('컴팩트', () => (
//     <Button
//       compact
//       size={select('버튼 크기', ['tiny'], 'tiny')}
//       onClick={action('clicked')}
//     >
//       {text('버튼 레이블', '안녕')}
//     </Button>
//   ))
//   .add('일반 (채움형)', () => (
//     <Button
//       fluid
//       size={select('버튼 크기', ['tiny', 'small'], 'tiny')}
//       onClick={action('clicked')}
//     >
//       {text('버튼 레이블', '안녕')}
//     </Button>
//   ))
//   .add('컴팩트 (아이콘)', () => (
//     <Button
//       compact
//       bold
//       size={select('버튼 크기', ['tiny', 'small', 'large'], 'tiny')}
//       onClick={action('clicked')}
//       color={select('버튼 색', ['gray', 'blue'], 'blue')}
//     >
//       <Button.Icon
//         src="https://assets.triple-dev.titicaca-corp.com/images/save@4x.png"
//         size={select('아이콘 크기', ['tiny', 'small'], 'small')}
//       />
//       {text('버튼 레이블', '저장하기')}
//     </Button>
//   ))
//   .add('베이직', () => (
//     <Button
//       basic
//       fluid={boolean('채움', false)}
//       compact={boolean('콤팩트', false)}
//       inverted={boolean('색반전', false)}
//       onClick={action('clicked')}
//     >
//       {text('버튼 레이블', '안녕')}
//     </Button>
//   ))
//   .add('베이직 (아이콘)', () => (
//     <Button basic fluid compact onClick={action('clicked')}>
//       <Button.Icon src="https://triple-dev.titicaca-corp.com/content/static/images/index@4x.png" />
//       {text('버튼 레이블', '목차')}
//     </Button>
//   ))
//   .add('블록형 아이콘', () => (
//     <Button
//       icon={select(
//         '아이콘 종류',
//         [
//           'saveEmpty',
//           'saveFilled',
//           'starEmpty',
//           'starFilled',
//           'map',
//           'share',
//           'schedule',
//         ],
//         'saveEmpty',
//       )}
//     >
//       {text('버튼 레이블', '저장하기')}
//     </Button>
//   ))
//   .add('버튼 그룹', () => (
//     <Button.Group horizontalGap={number('버튼 간격', 10)}>
//       <Button basic color="gray" size="small">
//         현지에서 길묻기
//       </Button>
//       <Button basic inverted color="blue" size="small">
//         길찾기
//       </Button>
//     </Button.Group>
//   ))
//   .add('아이콘 버튼 그룹', () => (
//     <Button.Group horizontalGap={number('버튼 간격', 22)}>
//       <Button icon="saveEmpty">저장하기</Button>
//       <Button icon="schedule">일정추가</Button>
//       <Button icon="starEmpty">리뷰쓰기</Button>
//       <Button icon="share">공유하기</Button>
//     </Button.Group>
//   ))
