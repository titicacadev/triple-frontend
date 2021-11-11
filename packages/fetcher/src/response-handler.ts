import { HttpResponse } from './types'

function captureHttpError<Response extends HttpResponse<any, any>>(
  response: Response,
): void {
  const { error: { capture } = { capture: () => {} } } = response
  capture()
}

export { captureHttpError }
