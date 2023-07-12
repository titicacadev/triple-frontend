import { Metadata, ResolvingMetadata } from 'next'
import deepmerge from 'deepmerge'

export async function mergeMetadataWithParent(
  parent: ResolvingMetadata,
  metadata: Metadata,
): Promise<Metadata> {
  const parentMetadata = await parent
  return deepmerge(parentMetadata, metadata)
}
