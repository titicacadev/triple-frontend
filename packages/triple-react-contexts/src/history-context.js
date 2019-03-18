import React, { createContext, PureComponent } from 'react'
import Router from 'next/router'
import queryString from 'query-string'

const { Provider, Consumer } = createContext()

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
    if (this.props.appContext.os.name === 'Android') {
      Router.events.on('routeChangeStart', this.onHashChange)
      Router.events.on('hashChangeStart', this.onHashChange)
    }
  }

  componentWillUnmount() {
    if (this.props.appContext.os.name === 'Android') {
      Router.events.off('routeChangeStart', this.onHashChange)
      Router.events.off('hashChangeStart', this.onHashChange)
    }
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

  replace = (hash) => {
    const {
      props: {
        appContext: { os },
      },
    } = this

    this.setState(({ hashHistories }) => ({
      hashHistories: [...hashHistories.slice(0, -1), hash],
    }))

    if (os.name === 'Android') {
      Router.replace(pathWithHash(hash))
    }
  }

  push = (hash) => {
    const {
      props: {
        appContext: { os },
      },
    } = this

    this.setState(({ hashHistories }) => ({
      hashHistories: [...hashHistories, hash],
    }))

    if (os.name === 'Android') {
      Router.push(pathWithHash(hash))
    }
  }

  back = () => {
    const {
      props: {
        appContext: { os },
      },
    } = this

    this.setState(({ hashHistories }) => ({
      hashHistories: hashHistories.slice(0, -1),
    }))

    if (os.name === 'Android') {
      Router.back()
    }
  }

  navigate = (href, params) => {
    const {
      props: { appContext },
    } = this
    const { appUrlScheme, isPublic } = appContext

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
        appContext,
        params,
      )
    } else {
      return this.navigateInApp(
        { href, protocol, host, path, query },
        appContext,
        params,
      )
    }
  }

  navigateOnPublic = ({ href, protocol, path }, { webUrlBase }) => {
    if (protocol === 'http:' || protocol === 'https:') {
      window.location = href
    } else if (targetPageAvailable(path)) {
      window.location = `${webUrlBase}${path}`
    } else {
      const { transitionModalHash: hash } = this.props

      hash && this.push(hash)
    }
  }

  navigateInApp = (
    { href, protocol, host, path },
    { appUrlScheme },
    params,
  ) => {
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
      <Provider
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
      </Provider>
    )
  }
}

export function withHistory(Component) {
  return function HistoryComponent(props) {
    return (
      <Consumer>
        {({ uriHash, actions }) => (
          <Component uriHash={uriHash} historyActions={actions} {...props} />
        )}
      </Consumer>
    )
  }
}
