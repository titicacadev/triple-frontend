import { useState, memo } from 'react'
import styled from 'styled-components'
import { ImagesProvider, useImagesContext } from '@titicaca/react-contexts'

export default {
  title: 'react-contexts / ImagesContext',
  component: ImagesProvider,
}

const Section = styled.div`
  margin: 20px 0;
`

const SectionBody = styled.div`
  padding: 10px;
`

const Code = styled.code`
  display: block;
  max-height: 300px;
  padding: 20px;
  background-color: #eeeeee;
  font-family: monospace;
  white-space: pre;
  overflow: auto;
`

function formatJson(json: unknown) {
  return JSON.stringify(json, null, 4)
}

function ImagesContextMonitor({ onFetched }: { onFetched?: () => void }) {
  const { images, total, actions } = useImagesContext()
  const [searchedIndex, setSearchedIndex] = useState(-1)

  return (
    <div>
      <Section>
        <h2>actions</h2>
        <SectionBody>
          <button type="button" onClick={() => actions.fetch(onFetched)}>
            fetch()
          </button>

          <div>
            indexOf(
            <input
              type="text"
              onChange={async (e) => {
                setSearchedIndex(await actions.indexOf({ id: e.target.value }))
              }}
            />
            ) -&gt; {searchedIndex}
          </div>
        </SectionBody>
      </Section>

      <Section>
        <h2>images</h2>
        <SectionBody>
          <Code>{formatJson(images)}</Code>
        </SectionBody>
      </Section>

      <Section>
        <h2>total</h2>
        <SectionBody>
          <Code>{formatJson(total)}</Code>
        </SectionBody>
      </Section>
    </div>
  )
}

const MemeoizedImagesContextMonitor = memo(ImagesContextMonitor)

const SAMPLE_SOURCE: Parameters<typeof ImagesProvider>[0]['source'] = {
  type: 'attraction',
  id: 'a86a3f55-9f89-4540-a124-f8c4db07ab34',
}

function RenderingTester() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button type="button" onClick={() => setCount((count) => ++count)}>
        Provider 자식 re-render 하기
      </button>

      <ImagesProvider source={SAMPLE_SOURCE}>
        <div style={{ border: 'dotted black 1px', padding: '5px' }}>
          {count}

          <MemeoizedImagesContextMonitor />
        </div>
      </ImagesProvider>
    </>
  )
}

export const Basic = () => {
  return (
    <ImagesProvider source={SAMPLE_SOURCE}>
      <ImagesContextMonitor />
    </ImagesProvider>
  )
}
Basic.storyName = '데이터 확인'

export const Tester = () => {
  return <RenderingTester />
}
Tester.storyName = '자식 렌더링 될 때 value 유지 테스트'
