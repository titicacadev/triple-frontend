import React, { createContext, PureComponent, useContext } from 'react'
import Router from 'next/router'
import queryString from 'query-string'

const Context = createContext()

const EXTERNAL_BROWSER_HOSTS = ['play.google.com', 'itunes.apple.com']

function pathWithHash(hash) {
  const url = new URL(Router.asPath, 'https://triple.guide')
  url.hash = hash && `#${hash}`

  return `${url.pathname}${url.search}${hash ? url.hash : ''}`
}

function targetPageAvailable(path) {
  return path.match(
    /^\/regions\/.+\/(attractions|restaurants|hotels|articles)\/.+/,
  )
}

export class HistoryProvider extends PureComponent {
  state = { hashHistories: [] }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.onHashChange)
    Router.events.on('hashChangeStart', this.onHashChange)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.onHashChange)
    Router.events.off('hashChangeStart', this.onHashChange)
  }

  onHashChange = (url) => {
    const hash = new URL(url, 'https://triple.guide').hash.replace(/^#/, '')

    // We only need to check if onHashChange is triggered by back button.
    this.setState(({ hashHistories }) => {
      const previousHash = hashHistories[hashHistories.length - 2]

      return (previousHash || '') === hash
        ? { hashHistories: hashHistories.slice(0, -1) }
        : {}
    })
  }

  replace = (hash, { useRouter = this.props.isAndroid } = {}) => {
    this.setState(({ hashHistories }) => ({
      hashHistories: [...hashHistories.slice(0, -1), hash],
    }))

    if (useRouter) {
      Router.replace(pathWithHash(hash))
    }
  }

  push = (hash, { useRouter = this.props.isAndroid } = {}) => {
    this.setState(({ hashHistories }) => ({
      hashHistories: [...hashHistories, hash],
    }))

    if (useRouter) {
      Router.push(pathWithHash(hash))
    }
  }

  back = ({ useRouter = this.props.isAndroid } = {}) => {
    this.setState(({ hashHistories }) => ({
      hashHistories: hashHistories.slice(0, -1),
    }))

    if (useRouter) {
      Router.back()
    }
  }

  navigate = (href, params) => {
    const {
      props: { appUrlScheme, isPublic },
    } = this

    let url = {}

    try {
      url = new URL(href)
    } catch {
      // Do nothing
    }

    const protocol = url.protocol
    const host = url.host
    const [, , path] = (url.pathname || href).match(/(^\/\/)?(\/.*)/) || []
    const query = (url.search || '').substring(1)

    if (protocol === `${appUrlScheme}:` && (path || '').match(/^\/outlink/)) {
      const { url: targetUrl } = queryString.parse(query)

      return this.navigate(targetUrl, params)
    } else if (isPublic) {
      return this.navigateOnPublic(
        { href, protocol, host, path, query },
        params,
      )
    } else {
      return this.navigateInApp({ href, protocol, host, path, query }, params)
    }
  }

  navigateOnPublic = ({ href, protocol, path }) => {
    const {
      props: { webUrlBase, transitionModalHash: hash },
    } = this

    if (protocol === 'http:' || protocol === 'https:') {
      window.location = href
    } else if (targetPageAvailable(path)) {
      window.location = `${webUrlBase}${path}`
    } else {
      hash && this.push(hash)
    }
  }

  navigateInApp = ({ href, protocol, host, path }, params) => {
    const {
      props: { appUrlScheme },
    } = this

    if (protocol === `${appUrlScheme}:`) {
      window.location = href
    } else if (protocol === 'http:' || protocol === 'https:') {
      const outlinkParams = queryString.stringify({
        url: href,
        ...(params || {}),
        target:
          (params || {}).target ||
          (EXTERNAL_BROWSER_HOSTS.includes(host) ? 'browser' : 'default'),
      })

      window.location = `${appUrlScheme}:///outlink?${outlinkParams}`
    } else {
      window.location = `${appUrlScheme}://${path}`
    }
  }

  render() {
    const {
      props: { children },
      state: { hashHistories },
    } = this

    return (
      <Context.Provider
        value={{
          uriHash: hashHistories[hashHistories.length - 1],
          actions: {
            push: this.push,
            replace: this.replace,
            back: this.back,
            navigate: this.navigate,
          },
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export function useHistoryContext() {
  return useContext(Context)
}

export function withHistory(Component) {
  return function HistoryComponent(props) {
    return (
      <Context.Consumer>
        {({ uriHash, actions }) => (
          <Component uriHash={uriHash} historyActions={actions} {...props} />
        )}
      </Context.Consumer>
    )
  }
}
