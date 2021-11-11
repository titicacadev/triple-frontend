export default async function safeParseJSON(
  response: Response,
): Promise<unknown> {
  try {
    const json = await response.json()
    return json
  } catch (error) {
    return undefined
  }
}
