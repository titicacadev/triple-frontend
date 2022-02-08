import React, { ComponentType } from 'react'

import ELEMENTS, { TripleDocumentElement, GetValue } from './elements'
import { FluidTable } from './common'

export function TripleEmailDocument({
  children,
}: {
  children: TripleDocumentElement[]
}) {
  return (
    <FluidTable>
      <tbody>
        {children.map(({ type, value }, index) => {
          const Element = ELEMENTS[type] as ComponentType<{
            value: GetValue<typeof type>
          }>
          // type 단언으로 data가 어떤 타입인지 컴파일 타임에선 알 수 없어서 생기는 불일치 해소

          if (Element === undefined) {
            return null
          }

          return (
            <tr key={index}>
              <td>
                <Element value={value} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </FluidTable>
  )
}
