const transformations: { [key: string]: string } = {
  full: 'c_limit,h_2048,w_2048',
  large: 'c_limit,h_1024,w_1024',
  small: 'c_fill,h_256,w_256',
}

export function generateShareImageUrl({
  mediaBaseUrl,
  cloudinaryId,
  version,
}: {
  mediaBaseUrl: string
  cloudinaryId: string
  version: string
}): string {
  const transformation = transformations[version] || transformations.large
  return `${mediaBaseUrl}/${transformation}/${cloudinaryId}.jpeg`
}
