import React from 'react'
import { storiesOf } from '@storybook/react'

import TripleDocument, { ELEMENTS } from '@titicaca/triple-document'
import SAMPLE from './triple-document.sample.json'

const {
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
  text: Text,
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  hr4: HR4,
  hr5: HR5,
  hr6: HR6,
  note: Note,
  video: Video,
} = ELEMENTS

// storybook의 jsxDecoration에는 Object를 표현하는 기능이 없어 Proxy를 호출하게 해두었습니다.
const Proxy = ({ sample }) => <TripleDocument>{sample}</TripleDocument>

storiesOf('TripleDocument', module)
  .add('샘플', () => <Proxy sample={SAMPLE} />)
  .add('텍스트', () => (
    <>
      <Heading1 value={{ emphasize: true, text: '제목0: bold 21 #2987F0' }} />
      <Heading1 value={{ text: '제목1: bold 21' }} />
      <Heading1
        value={{
          text: '제목1: bold 21',
          headline: '보조: bold 13 #2987F0',
        }}
      />
      <Heading2 value={{ text: '제목2: medium 19' }} />
      <Heading3 value={{ text: '제목3: bold 16' }} />
      <Heading4 value={{ text: '제목4: bold 16 #2987F0' }} />
      <Text value={{ text: '텍스트: medium 16 80%' }} />
      <Text bold value={{ text: '강조 텍스트: bold 16 100%' }} alpha={1} />
    </>
  ))
  .add('구분선', () => (
    <>
      <Text value={{ text: '구분선1' }} />
      <HR1 />
      <Text value={{ text: '구분선2' }} />
      <HR2 />
      <Text value={{ text: '구분선3' }} />
      <HR3 />
      <Text value={{ text: '구분선4' }} />
      <HR4 />
      <Text value={{ text: '구분선5' }} />
      <HR5 />
      <Text value={{ text: '구분선6' }} />
      <HR6 />
    </>
  ))
  .add('노트', () => (
    <Note
      value={{
        body:
          '목적지로 바로 가지 않고, 중간 지점에서 잠시 머무는 단기 체류를 뜻한다. 보통 경유 시간인 3-4시간 정도가 아니라 24시간 이상을 뜻하기 때문에 관광과 숙박이 가능한 것이 특징. 일부 항공사는 스탑오버시 무료 관광을 제공하니 참고할것!',
        title: '잠깐! 스탑오버(Stopover)란?',
      }}
    />
  ))
  .add('비디오', () => (
    <Video
      value={{
        provider: 'youtube',
        identifier: 'hYIe4VrfHoA',
      }}
    />
  ))
