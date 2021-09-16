export default async function safeParseJSON<T>(
  response: Response,
): Promise<T | undefined> {
  try {
    const json = await response.json()
    return json
  } catch (error) {
    return undefined
  }
}
