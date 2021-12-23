export default async function safeParseJson(
  response: Response,
): Promise<unknown> {
  try {
    const json = await response.json()
    return json
  } catch (error) {
    return undefined
  }
}
