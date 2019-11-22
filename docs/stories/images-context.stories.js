import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ImagesProvider, useImagesContext } from '@titicaca/react-contexts'

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

export function fetchImages({ id, type }, { from, size }) {
  return fetch(`/api/content/${type}s/${id}/images?from=${from}&size=${size}`, {
    credentials: 'same-origin',
  })
}

const SAMPLE_SOURCE = {
  type: 'attraction',
  id: 'a86a3f55-9f89-4540-a124-f8c4db07ab34',
}

storiesOf('ImagesContext', module).add('ImagesContext', () => (
  <ImagesProvider source={SAMPLE_SOURCE} fetchImages={fetchImages}>
    <ImagesContextMonitor onFetched={action('fetch 완료 콜백')} />
  </ImagesProvider>
))
