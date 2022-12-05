import { parseUrl } from '@titicaca/view-utilities'

import { WebAction, ContextOptions, NavigateOptions } from './types'

export default class Handler {
  private options: ContextOptions

  private handlers: WebAction[]

  public constructor({
    handlers,
    options,
  }: {
    handlers: WebAction[]
    options: ContextOptions
  }) {
    this.handlers = handlers
    this.options = options
  }

  public async execute(url: string, params?: NavigateOptions) {
    const parsedUrl = parseUrl(url)

    if (parsedUrl.path?.match(/^\/web-action\//)) {
      for (const handler of this.handlers) {
        const result = await handler({
          url: parsedUrl,
          options: this.options,
          handler: this,
        })

        if (result) {
          return
        }
      }
    } else {
      this.options.navigate && this.options.navigate(url, params)
    }
  }

  public toFunction() {
    return this.execute.bind(this)
  }
}
