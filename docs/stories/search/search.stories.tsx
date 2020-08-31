import React, { useCallback, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { Button, Section } from '@titicaca/core-elements'
import Search from '@titicaca/search'
import { PoiListElement } from '@titicaca/poi-list-elements'
import { ListingPOI } from '@titicaca/type-definitions'

export default {
  title: 'search | Search',
}

export function uncontrolledExample() {
  return (
    <Search
      onDelete={action('onDelete')}
      onAutoComplete={action('onAutoComplete')}
      onEnter={action('onEnter')}
      onInputChange={action('onInputChange')}
      placeholder={text('Placeholder', '“항공권 예약” 도시이름으로 검색')}
    />
  )
}

uncontrolledExample.story = {
  name: 'Uncontrolled',
}

function ControlledExampleComponent() {
  const [keyword, setKeyword] = useState('')

  return (
    <>
      <Search
        keyword={text('keyword', keyword)}
        defaultKeyword={text('defaultKeyword', '')}
        onDelete={action('onDelete')}
        onAutoComplete={action('onAutoComplete')}
        onEnter={action('onEnter')}
        onInputChange={setKeyword}
        placeholder={text('Placeholder', '“항공권 예약” 도시이름으로 검색')}
      />
      <Button onClick={() => setKeyword('')}>Clear</Button>
    </>
  )
}

export function controlledExample() {
  return <ControlledExampleComponent />
}

controlledExample.story = {
  name: 'Controlled',
}

function APIUsageExampleComponent() {
  const [results, setResults] = useState<ListingPOI[]>([])

  const searchPois = useCallback(
    async (keyword) => {
      const response = await fetch(
        `/api/content/pois?keyword=${encodeURIComponent(keyword)}`,
      )
      setResults(await response.json())
    },
    [setResults],
  )

  return (
    <Search
      onDelete={action('onDelete')}
      onAutoComplete={(keyword) => {
        action('onAutoComplete')(keyword)
        searchPois(keyword)
      }}
      onEnter={(keyword) => {
        action('onEnter')(keyword)
        searchPois(keyword)
      }}
      onInputChange={action('onInputChange')}
      defaultKeyword={text('defaultKeyword', '')}
      placeholder={text('Placeholder', '“항공권 예약” 도시이름으로 검색')}
    >
      <Section padding={{ left: 10, right: 10 }}>
        {results.map((result) => (
          <PoiListElement
            key={result.id}
            compact
            poi={result}
            resourceScraps={{}}
          />
        ))}
      </Section>
    </Search>
  )
}

export function apiUsageExample() {
  return <APIUsageExampleComponent />
}

apiUsageExample.story = {
  name: 'Sample',
}
