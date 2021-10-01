import safeParseJSON from './safe-parse-json'
import { HttpResponse } from './types'

function captureHttpError<Response extends HttpResponse<any, any>>(
  response: Response,
): void {
  const { error: { capture } = { capture: () => {} } } = response
  capture()
}

function readResponseBody<T, E>(response: HttpResponse<T, E>) {
  const contentType = response.headers.get('content-type')

  if (contentType && /json/.test(contentType)) {
    return safeParseJSON<T>(response)
  }

  return response.text()
}

export { captureHttpError, readResponseBody }
