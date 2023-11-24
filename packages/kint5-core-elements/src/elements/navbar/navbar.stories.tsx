import { Text } from '../text'

import { Navbar } from './navbar'

export default {
  title: 'kint5-core-elements / Navbar',
}

export function NavbarExample1() {
  return (
    <Navbar
      centerContent={<Text>타이틀</Text>}
      onBackButtonClick={() => {
        alert('back button clicked')
      }}
    />
  )
}
NavbarExample1.storyName = 'center cotent만 렌더링'

export function NavbarExample2() {
  return (
    <Navbar
      rightContent={<Text css={{ color: '#7743EE' }}>완료</Text>}
      onBackButtonClick={() => {
        alert('back button clicked')
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
      onBackButtonClick={() => {
        alert('back button clicked')
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
      onBackButtonClick={() => {
        alert('close button clicked')
      }}
    />
  )
}
NavbarExample4.storyName = 'Close 아이콘'
