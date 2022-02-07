import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import Box from '../common/box'
import FluidTable from '../common/fluid-table'

export interface LinkDocument {
  type: 'link'
  value: {
    id: string
    label: string
    href: string
    display: 'button'
  }
}

const LinkStyled = styled.a`
  padding: 13px 25px 13px 25px;
  display: inline-block;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border: 0;
  color: var(--color-white);
  background-color: var(--color-blue);
  float: none;
  border-radius: 21px;
`
const LinkContainer = styled.div`
  text-align: center;
`

type HtmlTagAttributes<T> = HTMLAttributes<T>

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface AnchorHTMLAttributes<T> extends HtmlTagAttributes<T> {
    'ses:tags'?: string
  }
}
export default function LinkView({
  value: { label, href: givenHref, id: linkId },
}: {
  value: LinkDocument['value']
}) {
  return (
    <FluidTable>
      <tr>
        <Box padding={{ top: 55, left: 30, right: 30 }}>
          {/* triple document의 경우 자체 margin 5 0 0 0, container margin 50 30 0 30 */}
          <LinkContainer>
            <LinkStyled href={givenHref} ses:tags={`link:${linkId}`}>
              {label}
            </LinkStyled>
          </LinkContainer>
        </Box>
      </tr>
    </FluidTable>
  )
}
