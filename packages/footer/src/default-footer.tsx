import { PropsWithChildren, useState } from 'react'
import styled from 'styled-components'
import { Text, Container } from '@titicaca/core-elements'

import { LinkGroup } from './link-group'
import { CompanyInfo } from './company-info'

export const FooterFrame = styled.footer`
  background-color: rgba(250, 250, 250, 1);
`

export interface DefaultFooterProps {
  hideAppDownloadButton?: boolean
}

function DefaultFooter({
  hideAppDownloadButton = false,
  children,
  ...props
}: PropsWithChildren<DefaultFooterProps>) {
  const [businessExpanded, setBusinessExpanded] = useState<boolean>(false)

  return (
    <FooterFrame {...props}>
      <Container
        centered
        css={{
          minWidth: 280,
          maxWidth: 768,
          padding: '30px 30px 40px',
        }}
      >
        <CompanyInfo
          hideAppDownloadButton={hideAppDownloadButton}
          businessExpanded={businessExpanded}
          setBusinessExpanded={setBusinessExpanded}
        />
        <Text
          size={11}
          lineHeight="17px"
          color="gray500"
          margin={{ top: businessExpanded ? 10 : 25, bottom: 20 }}
        >
          &#12828;놀유니버스는 통신판매중개로서 통신판매의 당사자가 아니며 상품
          거래정보 및 거래 등에 대해 책임을 지지 않습니다.
        </Text>

        <LinkGroup />

        {children}
      </Container>
    </FooterFrame>
  )
}

export default DefaultFooter
