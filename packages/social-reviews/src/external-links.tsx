import styled from 'styled-components'
import {
  Section,
  Container,
  List,
  Text,
  Image,
  H1,
  H3,
  FlexBox,
} from '@titicaca/core-elements'
import { MouseEvent } from 'react'

const ExternalLinkEntry = styled(List.Item)`
  cursor: pointer;
`

export interface ExternalLink<Data> {
  data: Data
  title?: string
  summary?: string
  meta?: string
  imageUrl?: string
}

export type ExternalLinksProps<Data> = {
  title: string
  externalLinks: ExternalLink<Data>[]
  onItemClick?: (e: MouseEvent<HTMLLIElement>, item: ExternalLink<Data>) => void
} & Parameters<typeof Section>['0']

function ExternalLinkItem<Data>({
  externalLink,
  externalLink: { title, summary, meta, imageUrl },
  onItemClick,
}: {
  externalLink: ExternalLink<Data>
  onItemClick?: (e: MouseEvent<HTMLLIElement>, item: ExternalLink<Data>) => void
}) {
  return (
    <ExternalLinkEntry
      minHeight={106}
      onClick={onItemClick ? (e) => onItemClick(e, externalLink) : undefined}
    >
      <FlexBox
        padding={{ top: 20, bottom: 20 }}
        flex
        justifyContent="space-between"
      >
        <Container>
          <H3 maxLines={2}>{title}</H3>
          {summary && (
            <Text size="small" alpha={0.7} margin={{ top: 8 }} ellipsis>
              {summary}
            </Text>
          )}
          {meta && (
            <Text size="tiny" alpha={0.4} margin={{ top: 8 }} ellipsis>
              {meta}
            </Text>
          )}
        </Container>

        <Container width={60} margin={{ left: 20 }}>
          <Image borderRadius={4}>
            <Image.FixedRatioFrame frame="big">
              <Image.Img src={imageUrl} alt={`${title} 썸네일`} />
            </Image.FixedRatioFrame>
          </Image>
        </Container>
      </FlexBox>
    </ExternalLinkEntry>
  )
}

export function ExternalLinks<Data>({
  title,
  externalLinks,
  onItemClick,
  ...props
}: ExternalLinksProps<Data>) {
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
