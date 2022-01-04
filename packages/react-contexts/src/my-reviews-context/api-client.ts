import fetch from 'isomorphic-fetch'

export async function checkIfReviewed({ resourceId }: { resourceId: string }) {
  const response = await fetch('/api/reviews/v2/check', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ ids: [resourceId] }),
  })

  const { ids } = await response.json()

  return ids && ids.includes(resourceId)
}
