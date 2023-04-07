import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tabs } from './tabs'
import { TabList } from './tab-list'
import { Tab } from './tab'
import { TabPanel } from './tab-panel'

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

  expect(document.activeElement).toHaveTextContent('A')
  expect(screen.getByText('This is panel A'))

  await user.keyboard('{ArrowRight}')

  expect(document.activeElement).toHaveTextContent('B')
  expect(screen.getByText('This is panel B'))

  await user.keyboard('{ArrowRight}')

  expect(document.activeElement).toHaveTextContent('C')
  expect(screen.getByText('This is panel C'))

  // 마지막에서 다음 포커스는 처음으로 돌아 갑니다.
  await user.keyboard('{ArrowRight}')

  expect(document.activeElement).toHaveTextContent('A')
  expect(screen.getByText('This is panel A'))

  // 처음에서 이전 포커스는 마지막으로 돌아 갑니다.
  await user.keyboard('{ArrowLeft}')

  expect(document.activeElement).toHaveTextContent('C')
  expect(screen.getByText('This is panel C'))

  await user.keyboard('{ArrowLeft}')

  expect(document.activeElement).toHaveTextContent('B')
  expect(screen.getByText('This is panel B'))

  await user.keyboard('{ArrowLeft}')

  expect(document.activeElement).toHaveTextContent('A')
  expect(screen.getByText('This is panel A'))
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

  expect(document.activeElement).toHaveTextContent('A')
  expect(screen.getByText('This is panel A'))

  await user.keyboard('{End}')

  expect(document.activeElement).toHaveTextContent('C')
  expect(screen.getByText('This is panel C'))

  await user.keyboard('{Home}')

  expect(document.activeElement).toHaveTextContent('A')
  expect(screen.getByText('This is panel A'))
})
