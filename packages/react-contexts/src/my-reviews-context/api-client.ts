import fetch from 'isomorphic-fetch'

export async function checkIfReviewed({ id }: { id: string }) {
  const response = await fetch('/api/reviews/v2/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ ids: [id] }),
  })

  const { ids } = await response.json()

  return ids && ids.includes(id)
}
