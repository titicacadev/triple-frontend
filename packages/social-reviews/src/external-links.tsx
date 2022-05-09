import styled from 'styled-components'
import {
  Section,
  Container,
  List,
  Text,
  Image,
  H1,
  H3,
} from '@titicaca/core-elements'
import { MouseEvent } from 'react'

const ExternalLinkEntry = styled(List.Item)`
  cursor: pointer;
`

export interface ExternalLink {
  url: string
  title?: string
  summary?: string
  meta?: string
  imageUrl?: string
}

export type ExternalLinksProps = {
  title: string
  externalLinks: ExternalLink[]
  onItemClick?: (e: MouseEvent<HTMLLIElement>, item: ExternalLink) => void
} & Parameters<typeof Section>['0']

function ExternalLinkItem({
  externalLink,
  externalLink: { title, summary, meta, imageUrl },
  onItemClick,
}: {
  externalLink: ExternalLink
  onItemClick?: (e: MouseEvent<HTMLLIElement>, item: ExternalLink) => void
}) {
  const textMargin = summary && meta ? 5 : 8

  return (
    <ExternalLinkEntry
      minHeight={106}
      onClick={onItemClick ? (e) => onItemClick(e, externalLink) : undefined}
    >
      <Container
        floated="right"
        width={60}
        margin={{ left: 20 }}
        padding={{ top: 20, bottom: 20 }}
      >
        <Image borderRadius={4}>
          <Image.FixedRatioFrame frame="big">
            <Image.Img src={imageUrl} alt={`${title} 썸네일`} />
          </Image.FixedRatioFrame>
        </Image>
      </Container>

      <Container padding={{ top: 20 }}>
        <H3 maxLines={2}>{title}</H3>
        <Text size="small" alpha={0.7} margin={{ top: textMargin }} ellipsis>
          {summary}
        </Text>
        <Text size="tiny" alpha={0.4} margin={{ top: textMargin }} ellipsis>
          {meta}
        </Text>
      </Container>
    </ExternalLinkEntry>
  )
}

export function ExternalLinks({
  title,
  externalLinks,
  onItemClick,
  ...props
}: ExternalLinksProps) {
  if (externalLinks.length <= 0) {
    return null
  }

  return (
    <Section anchor="external-links" {...props}>
      <H1>{title}</H1>
      <List divided clearing margin={{ top: 10 }}>
        {externalLinks.map((externalLink, i) => (
          <ExternalLinkItem
            key={`external-link-${i}`}
            externalLink={externalLink}
            onItemClick={onItemClick}
          />
        ))}
      </List>
    </Section>
  )
}
