import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'

import { FluidTable } from '../common'

interface EmailIntro {
  image?: string
  greeting?: string
  introText?: string
}

const Break = styled.div`
  margin: 50px 30px;
  height: 1px;
  background-color: rgb(239, 239, 239);
`

export default function EmailIntro({ image, greeting, introText }: EmailIntro) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <td>
            <FluidTable margin={{ bottom: 100 }}>
              <tbody>
                <tr>
                  <td>
                    <img src={image} alt="newsletter-featured-poster" />
                  </td>
                </tr>
              </tbody>
            </FluidTable>
          </td>
        </tr>

        <tr>
          <td>
            <FluidTable margin={{ bottom: 20 }}>
              <tbody>
                <tr>
                  <td>
                    <Text size={21} bold lineHeight="25px" color="gray">
                      {greeting}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </FluidTable>
          </td>
        </tr>

        <tr>
          <td>
            <FluidTable>
              <tbody>
                <tr>
                  <td>
                    <Text size={16} lineHeight="24px" color="gray900">
                      {introText}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </FluidTable>
          </td>
        </tr>

        <tr>
          <td>
            <Break />
          </td>
        </tr>
      </tbody>
    </FluidTable>
  )
}
