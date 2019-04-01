/* global fetch */

import React, { Component } from 'react'
import {
  TripleDocument,
  Button,
  Container,
} from '@titicaca/triple-design-system/src'

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
        <Container
          centered
          padding={{ top: 20, left: 20, right: 20 }}
          minWidth={375}
          maxWidth={600}
        >
          <Button basic compact fluid>
            <Button.Icon
              width={15}
              height={12}
              margin={{ top: 2, bottom: 2, right: 5 }}
              src="https://assets.triple-dev.titicaca-corp.com/images/index@4x.png"
            />
            목차
          </Button>
        </Container>
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
