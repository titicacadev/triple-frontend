import { Text } from '../text'

import { Navbar } from './navbar'

export default {
  title: 'kint5-core-elements / Navbar',
}

export function NavbarExample1() {
  return (
    <Navbar
      centerContent={<Text>타이틀</Text>}
      onLeftButtonClick={() => {
        alert('left button clicked')
      }}
    />
  )
}
NavbarExample1.storyName = 'center cotent만 렌더링'

export function NavbarExample2() {
  return (
    <Navbar
      rightContent={<Text css={{ color: '#7743EE' }}>완료</Text>}
      onLeftButtonClick={() => {
        alert('left button clicked')
      }}
    />
  )
}

NavbarExample2.storyName = 'right content만  렌더링'

export function NavbarExample3() {
  return (
    <Navbar
      centerContent={<Text>타이틀</Text>}
      rightContent={<Text css={{ color: '#7743EE' }}>완료</Text>}
      onLeftButtonClick={() => {
        alert('left button clicked')
      }}
    />
  )
}

NavbarExample3.storyName = 'center, right content 전부 렌더링'

export function NavbarExample4() {
  return (
    <Navbar
      leftButtonIconType="close"
      centerContent={<Text>타이틀</Text>}
      onLeftButtonClick={() => {
        alert('close button clicked')
      }}
    />
  )
}
NavbarExample4.storyName = 'Close 아이콘'

export function NavbarExample5() {
  return <Navbar centerContent={<Text>타이틀</Text>} />
}
NavbarExample5.storyName = '왼쪽 버튼 렌더링 X'
