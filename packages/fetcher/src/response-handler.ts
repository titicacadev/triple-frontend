import { HttpResponse } from './types'

export function captureHttpError<Response extends HttpResponse<any, any>>(
  response: Response,
): void {
  const { error: { capture } = { capture: () => {} } } = response
  capture()
}
