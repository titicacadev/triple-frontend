import safeParseJSON from './safe-parse-json'
import { HttpResponse } from './types'

function captureHttpError<Response extends HttpResponse<any, any>>(
  response: Response,
): void {
  const { error: { capture } = { capture: () => {} } } = response
  capture()
}

function readResponseBody(response: Response) {
  const contentType = response.headers.get('content-type')
  const jsonParseAvailable = contentType && /json/.test(contentType)

  if (jsonParseAvailable) {
    return safeParseJSON(response)
  }

  return response.text()
}

export { captureHttpError, readResponseBody }
