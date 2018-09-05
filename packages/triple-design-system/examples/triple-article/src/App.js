import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import { Article } from '@titicaca/triple-design-system/src'

import post from './post.json'
import attraction from './attraction.json'

const PANES = [
  { menuItem: 'Post', render: () => <Post /> },
  { menuItem: 'Attraction', render: () => <Attraction /> },
]

function Post() {
  return <Article>{post}</Article>
}

function Attraction() {
  const { featuredContent } = attraction

  return <Article>{featuredContent}</Article>
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Tab panes={PANES} />
      </div>
    )
  }
}
