import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { action } from '@storybook/addon-actions'
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

function formatJSON(json) {
  return JSON.stringify(json, null, 4)
}

function ImagesContextMonitor({ onFetched }) {
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
          <Code>{formatJSON(images)}</Code>
        </SectionBody>
      </Section>

      <Section>
        <h2>total</h2>
        <SectionBody>
          <Code>{formatJSON(total)}</Code>
        </SectionBody>
      </Section>
    </div>
  )
}

const MemeoizedImagesContextMonitor = memo(ImagesContextMonitor)

function fetchImages({ id, type }, { from, size }) {
  return fetch(`/api/content/${type}s/${id}/images?from=${from}&size=${size}`, {
    credentials: 'same-origin',
  })
}

const SAMPLE_SOURCE = {
  type: 'attraction',
  id: 'a86a3f55-9f89-4540-a124-f8c4db07ab34',
}

const handleFetched = action('fetch 완료 콜백')

function RenderingTester() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button type="button" onClick={() => setCount((count) => ++count)}>
        Provider 자식 re-render 하기
      </button>

      <ImagesProvider source={SAMPLE_SOURCE} fetchImages={fetchImages}>
        <div style={{ border: 'dotted black 1px', padding: '5px' }}>
          {count}

          <MemeoizedImagesContextMonitor onFetched={handleFetched} />
        </div>
      </ImagesProvider>
    </>
  )
}

export const Basic = () => {
  return (
    <ImagesProvider source={SAMPLE_SOURCE} fetchImages={fetchImages}>
      <ImagesContextMonitor onFetched={handleFetched} />
    </ImagesProvider>
  )
}
Basic.storyName = '데이터 확인'

export const Tester = () => {
  return <RenderingTester />
}
Tester.storyName = '자식 렌더링 될 때 value 유지 테스트'
