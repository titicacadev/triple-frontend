import type { FileInfo, API } from 'jscodeshift'

export default function transform(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift

  const root = j(fileInfo.source)

  // Find all import declarations
  root.find(j.ImportDeclaration).forEach((path) => {
    const sourceNode = path.node.source
    if (sourceNode.value === '@titicaca/core-elements') {
      sourceNode.value = '@titicaca/image-source'
    }
  })

  return root.toSource({ quote: 'single' })
}

export const parser = 'tsx'
