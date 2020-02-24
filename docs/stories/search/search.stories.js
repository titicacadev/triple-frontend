import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

import { Button, Section } from '@titicaca/core-elements'
import Search from '@titicaca/search'
import { PoiListElement } from '@titicaca/poi-list-elements'

storiesOf('search | Search', module)
  .add('Uncontrolled', () => (
    <Search
      onDelete={action('onDelete')}
      onAutoComplete={action('onAutoComplete')}
      onEnter={action('onEnter')}
      onInputChange={action('onInputChange')}
      placeholder={text('Placeholder', '“항공권 예약” 도시이름으로 검색')}
    />
  ))
  .add('Controlled', () => {
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
  })
  .add('Sample', () => {
    const [results, setResults] = useState([])

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
        onAutoComplete={searchPois}
        onEnter={action('onEnter')}
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
  })
