import styled from 'styled-components'

import {
  RecommendedReset,
  CustomReset,
  ClientSpecificWorkaround,
} from './common'
import {
  EmailPreview,
  EmailFooter,
  PreviewDocument,
  EmailFeedback,
} from './components'
import EmailIntro from './components/intro'
import { TripleEmailElementData } from './elements'
import { TripleEmailDocument } from './triple-email-document'

const RootTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

interface SubscribedUser {
  id: string
  name: string
}

export default function FullEmailTemplate({
  image,
  greeting,
  introText,
  user,
  preview,
  document,
  transitionLink,
}: {
  image?: string
  greeting?: string
  introText?: string
  user: SubscribedUser
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
                <EmailIntro
                  image={image}
                  greeting={greeting}
                  introText={introText}
                />
              </td>
            </tr>
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
                <EmailFeedback username={user.name} />
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
