import semver from 'semver'

const requiredVersions = {
  savingItineraries: '1.2.0',
  findingDirections: '1.4.0',
} as const

export function isValidAppVersion(
  appVersion: string | undefined,
  functionality: keyof typeof requiredVersions,
): boolean {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'true') {
    return true
  }

  const version = semver.coerce(appVersion)
  const requiredVersion = requiredVersions[functionality]

  return !!version && semver.gte(version, requiredVersion)
}
