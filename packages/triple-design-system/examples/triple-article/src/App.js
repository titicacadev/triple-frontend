/* global fetch */

import React, { Component } from 'react'
import { TripleDocument } from '@titicaca/triple-design-system/src'

export default class App extends Component {
  state = { content: [], scraps: {} }

  fetchArticle = async () => {
    const response = await fetch(
      '/api/content/articles/7259052e-5925-469c-88d3-b83d26fd1e54',
    )

    const {
      source: { content },
    } = await response.json()

    this.setState({ content })
  }

  handleScrapedChange = async (_, { id, scraped }) => {
    const response = await fetch(`/api/pois/${id}/scrap`, {
      method: scraped ? 'POST' : 'DELETE',
    })

    if (response.ok) {
      this.setState(({ scraps }) => ({
        scraps: { ...scraps, [id]: scraped },
      }))
    }
  }

  componentDidMount() {
    this.fetchArticle()
  }

  render() {
    const { content, scraps } = this.state

    return (
      <div>
        <TripleDocument
          resourceScraps={scraps}
          onResourceScrapedChange={this.handleScrapedChange}
        >
          {content}
        </TripleDocument>
      </div>
    )
  }
}
