import { Text } from '@titicaca/tds-ui'

export function ResourceListElementStats({
  stats,
  ...textProps
}: {
  stats: (string | null | undefined)[]
} & Parameters<typeof Text>[0]) {
  if (stats.length === 0) {
    return null
  }

  return <Text {...textProps}>{stats.filter((stat) => stat).join(' · ')}</Text>
}
