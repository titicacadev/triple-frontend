import React from 'react'
import { Text } from '@titicaca/core-elements'

export default function ResourceListElementStats({
  children,
  ...textProps
}: Parameters<typeof Text>[0]) {
  if (React.Children.count(children) === 0) {
    return null
  }

  return (
    <Text {...textProps}>
      {React.Children.toArray(children).reduce((result, current, index) => {
        if (index === 0) {
          return current
        }
        return (
          <>
            {result}
            <span>{' · '}</span>
            {current}
          </>
        )
      }, <></>)}
    </Text>
  )
}
