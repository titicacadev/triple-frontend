import { ComponentType } from 'react'

import ELEMENTS, { TripleEmailElementData, GetValue } from './elements'
import { FluidTable } from './common'

interface ElementSet {
  [key: string]: ComponentType<{
    value: GetValue<TripleEmailElementData['type']>
  }>
}

export function TripleEmailDocument({
  elements,
  customElements = {},
  ...props
}: {
  elements: TripleEmailElementData[]
  customElements?: ElementSet
  webUrlBase?: string
}) {
  return (
    <FluidTable>
      <tbody>
        {elements.map(({ type, value }, index) => {
          const RegularElement = ELEMENTS[type] as ComponentType<{
            value: GetValue<typeof type>
          }>
          const CustomElement = customElements[type]

          const Element = CustomElement || RegularElement

          if (Element === undefined) {
            return null
          }

          return (
            <tr key={index}>
              <td>
                <Element value={value} {...props} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </FluidTable>
  )
}
