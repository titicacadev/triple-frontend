/* eslint-disable @typescript-eslint/ban-ts-comment */

const assign = jest.fn()

export function mockLocation() {
  // @ts-ignore
  delete window.location
  // @ts-ignore
  window.location = {
    get href() {
      // @ts-ignore
      return this._href
    },
    set href(url) {
      // @ts-ignore
      this._href = url
      this.assign(url)
    },
    assign,
  }

  return { assign }
}

mockLocation.afterEach = () => {
  assign.mockClear()
}
