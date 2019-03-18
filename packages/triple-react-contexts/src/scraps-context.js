import React, { createContext, PureComponent } from 'react'

import {
  subscribeScrapedChangeEvent,
  notifyScraped,
  notifyUnscraped,
} from '@titicaca/triple-web-to-native-interfaces'
import { scrape, unscrape } from '../triple-api-client'

const { Provider, Consumer } = createContext()

export class ScrapsProvider extends PureComponent {
  state = { scraps: this.props.scraps || {}, updating: {} }

  componentDidMount() {
    subscribeScrapedChangeEvent(({ scraped, id }) =>
      this.insert({ [id]: scraped }),
    )
  }

  scrapeArticle = (id) => this.scrape({ id, type: 'article' })
  unscrapeArticle = (id) => this.unscrape({ id, type: 'article' })

  scrapePoi = (id) => this.scrape({ id, type: 'poi' })
  unscrapePoi = (id) => this.unscrape({ id, type: 'poi' })

  scrape = async ({ id, type }) => {
    const {
      state: { updating },
    } = this

    if (typeof updating[id] !== 'undefined') {
      return
    }

    this.setState({ updating: { [id]: true } })

    const response = await scrape({ id, type })
    if (response.ok) {
      notifyScraped(id)

      this.insert({ [id]: true })
    }
  }

  unscrape = async ({ id, type }) => {
    const {
      state: { updating },
    } = this

    if (typeof updating[id] !== 'undefined') {
      return
    }

    this.setState({ updating: { [id]: false } })

    const response = await unscrape({ id, type })
    if (response.ok) {
      notifyUnscraped(id)

      this.insert({ [id]: false })
    }
  }

  insert = (newScraps) =>
    this.setState(({ scraps, updating }) => {
      const updated = { ...updating }

      Object.keys(newScraps).forEach((id) => delete updated[id])

      return {
        scraps: { ...scraps, ...newScraps },
        updating: updated,
      }
    })

  deriveCurrentStateAndCount = ({
    id,
    scraped,
    scrapsCount: originalScrapsCount,
  }) => {
    const { scraps, updating } = this.state
    const currentState =
      typeof updating[id] !== 'undefined' ? updating[id] : scraps[id]
    const scrapsCount = Number(originalScrapsCount || 0)

    if (typeof scraped !== 'boolean' || typeof currentState !== 'boolean') {
      /* At least one of the status are unknown: Reduces to a bitwise OR operation */
      return { scraped: !!scraped || !!currentState, scrapsCount: scrapsCount }
    }

    return {
      scraped: currentState,
      scrapsCount:
        scraped === currentState
          ? scrapsCount
          : currentState
          ? scrapsCount + 1
          : scrapsCount - 1,
    }
  }

  render() {
    const {
      deriveCurrentStateAndCount,
      props: { children },
      state: { scraps },
    } = this

    return (
      <Provider
        value={{
          deriveCurrentStateAndCount,
          scraps,
          actions: {
            scrape: this.scrape,
            unscrape: this.unscrape,
            scrapeArticle: this.scrapeArticle,
            unscrapeArticle: this.unscrapeArticle,
            scrapePoi: this.scrapePoi,
            unscrapePoi: this.unscrapePoi,
            insert: this.insert,
          },
        }}
      >
        {children}
      </Provider>
    )
  }
}

export function withScraps(Component) {
  return function ScrapsComponent(props) {
    return (
      <Consumer>
        {({ deriveCurrentStateAndCount, scraps, actions }) => (
          <Component
            deriveCurrentScrapedStateAndCount={deriveCurrentStateAndCount}
            scraps={scraps}
            scrapActions={actions}
            {...props}
          />
        )}
      </Consumer>
    )
  }
}
