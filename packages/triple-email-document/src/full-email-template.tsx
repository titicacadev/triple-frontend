import styled from 'styled-components'

import {
  RecommendedReset,
  CustomReset,
  ClientSpecificWorkaround,
} from './common'
import { EmailPreview, EmailFooter, PreviewDocument } from './components'
import { TripleEmailElementData } from './elements'
import { TripleEmailDocument } from './triple-email-document'

const RootTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

export default function FullEmailTemplate({
  preview,
  document,
  transitionLink,
}: {
  preview: PreviewDocument
  document: TripleEmailElementData[]
  transitionLink: string
}) {
  return (
    <>
      <RecommendedReset />
      <CustomReset />
      <ClientSpecificWorkaround />

      <div id="bodyTable">
        <RootTable>
          <tbody>
            <tr>
              <td>
                <EmailPreview value={preview.value} />
              </td>
            </tr>
            <tr>
              <td>
                <TripleEmailDocument elements={document} />
              </td>
            </tr>

            <tr>
              <td>
                <EmailFooter transitionLink={transitionLink} />
              </td>
            </tr>
          </tbody>
        </RootTable>
      </div>
    </>
  )
}
