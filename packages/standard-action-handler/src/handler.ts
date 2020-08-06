import { parseUrl } from '@titicaca/view-utilities'

import { WebAction, ContextOptions } from './types'

export default class Handler {
  options: ContextOptions

  handlers: WebAction[]

  constructor({
    handlers,
    options,
  }: {
    handlers: WebAction[]
    options: ContextOptions
  }) {
    this.handlers = handlers
    this.options = options
  }

  async execute(
    url: string,
    params: Parameters<ContextOptions['navigate']>[1],
  ) {
    const parsedUrl = parseUrl(url)

    if (parsedUrl.path?.match(/^\/web-action\//)) {
      for (const handler of this.handlers) {
        const result = await handler(parsedUrl, this.options, this)

        if (result) {
          return
        }
      }
    } else {
      this.options.navigate(url, params)
    }
  }

  toFunction() {
    return this.execute.bind(this)
  }
}
