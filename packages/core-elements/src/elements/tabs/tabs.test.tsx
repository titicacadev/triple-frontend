import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useState } from 'react'

import { Tab } from './tab'
import { TabList } from './tab-list'
import { TabPanel } from './tab-panel'
import { Tabs } from './tabs'

test('방향키로 roving tabindex를 사용합니다.', async () => {
  const user = userEvent.setup()

  const Example = () => {
    const [value, setValue] = useState('a')

    return (
      <Tabs value={value} onChange={setValue}>
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
          <Tab value="c">C</Tab>
        </TabList>
        <TabPanel value="a">This is panel A</TabPanel>
        <TabPanel value="b">This is panel B</TabPanel>
        <TabPanel value="c">This is panel C</TabPanel>
      </Tabs>
    )
  }

  render(<Example />)

  await user.tab()

  expect(screen.getByText('A')).toHaveFocus()
  expect(screen.getByText('This is panel A')).toBeVisible()

  await user.keyboard('{ArrowRight}')

  expect(screen.getByText('B')).toHaveFocus()
  expect(screen.getByText('This is panel B')).toBeVisible()

  await user.keyboard('{ArrowRight}')

  expect(screen.getByText('C')).toHaveFocus()
  expect(screen.getByText('This is panel C')).toBeVisible()

  // 마지막에서 다음 포커스는 처음으로 돌아 갑니다.
  await user.keyboard('{ArrowRight}')

  expect(screen.getByText('A')).toHaveFocus()
  expect(screen.getByText('This is panel A')).toBeVisible()

  // 처음에서 이전 포커스는 마지막으로 돌아 갑니다.
  await user.keyboard('{ArrowLeft}')

  expect(screen.getByText('C')).toHaveFocus()
  expect(screen.getByText('This is panel C')).toBeVisible()

  await user.keyboard('{ArrowLeft}')

  expect(screen.getByText('B')).toHaveFocus()
  expect(screen.getByText('This is panel B')).toBeVisible()

  await user.keyboard('{ArrowLeft}')

  expect(screen.getByText('A')).toHaveFocus()
  expect(screen.getByText('This is panel A')).toBeVisible()
})

test('Home, End키로 roving tabindex를 사용합니다.', async () => {
  const user = userEvent.setup()

  const Example = () => {
    const [value, setValue] = useState('a')

    return (
      <Tabs value={value} onChange={setValue}>
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
          <Tab value="c">C</Tab>
        </TabList>
        <TabPanel value="a">This is panel A</TabPanel>
        <TabPanel value="b">This is panel B</TabPanel>
        <TabPanel value="c">This is panel C</TabPanel>
      </Tabs>
    )
  }

  render(<Example />)

  await user.tab()

  expect(screen.getByText('A')).toHaveFocus()
  expect(screen.getByText('This is panel A')).toBeVisible()

  await user.keyboard('{End}')

  expect(screen.getByText('C')).toHaveFocus()
  expect(screen.getByText('This is panel C')).toBeVisible()

  await user.keyboard('{Home}')

  expect(screen.getByText('A')).toHaveFocus()
  expect(screen.getByText('This is panel A')).toBeVisible()
})
