import React from 'react'
import { storiesOf } from '@storybook/react'

import { TripleDocument, ELEMENTS } from '@titicaca/triple-design-system'

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

const SAMPLE = [
  {
    type: 'text',
    value: {
      text:
        '이민자들이 모여 건설한 곳답게 뉴욕 자체의 역사는 그리 길지 않다. 뉴욕은 짧은 역사를 비웃듯 급속도로 발전했고, 지금도 세계에서 가장 앞서나가는 도시다. 짧지만 알찬 뉴욕의 역사를 간단히 짚어봤다.',
    },
  },
  {
    type: 'hr1',
    value: {},
  },
  {
    type: 'heading1',
    value: {
      text: '미리 알고 갑시다! 뉴욕 역사 이야기',
      href: 'miri-algo-gabsida-nyuyog-yeogsa-iyagi',
    },
  },
  {
    type: 'heading3',
    value: {
      text: '뉴욕을 처음 발견한 사람은 누구?',
    },
  },
  {
    type: 'text',
    value: {
      text:
        '대항해시대 콜럼버스가 신대륙을 발견한 이후 남북 아메리카로의 항로 개척이 불이 붙었다. 카를 5세의 명을 받은 스페인 제독 에스티방 고메스는 1524년, 뉴욕을 처음 방문한다. 이후 네덜란드 동인도 회사의 헨리 허드슨이 지금의 뉴욕을 찾아 항로를 개척했다.',
    },
  },
  {
    type: 'heading3',
    value: {
      text: '인구 절반 이상이 흑인이었다고요?',
    },
  },
  {
    type: 'text',
    value: {
      text:
        '유럽 대륙의 아프리카 노예 운송 사업 때문에 17세기 후반까지 뉴욕 정착민 가운데 절반 정도가 흑인이었다. 1789년 조지 워싱턴이 미국의 초대 대통령이 된 뒤 1790년까지 뉴욕은 미국의 수도였다. 당시 의회는 17세기 초반, 노예 제도를 폐지했고 흑인들은 비로소 자유를 얻는다.',
    },
  },
  {
    type: 'heading3',
    value: {
      text: '이민자들의 도시, 세계 최고가 되다!',
    },
  },
]

storiesOf('TripleDocument', module)
  .add('샘플', () => <TripleDocument>{SAMPLE}</TripleDocument>)
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
