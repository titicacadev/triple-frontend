import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  Section,
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
  const { t } = useTranslation('common-web')

  return (
    <ExternalLinkEntry
      minHeight={106}
      onClick={onItemClick ? (e) => onItemClick(e, externalLink) : undefined}
    >
      <FlexBox
        flex
        gap="20px"
        css={{
          padding: '20px 0 20px 0',
        }}
      >
        <FlexBox.Item
          flexGrow={1}
          css={{
            minWidth: 0,
          }}
        >
          <H3 maxLines={2}>{title}</H3>
          {summary && (
            <Text size="small" alpha={0.7} margin={{ top: 6 }} ellipsis>
              {summary}
            </Text>
          )}
          {meta && (
            <Text size="tiny" alpha={0.4} margin={{ top: 6 }} ellipsis>
              {meta}
            </Text>
          )}
        </FlexBox.Item>

        {imageUrl && (
          <FlexBox.Item
            flexShrink={0}
            css={{
              width: 60,
            }}
          >
            <Image borderRadius={4}>
              <Image.FixedRatioFrame frame="big">
                <Image.Img
                  src={imageUrl}
                  alt={t('title-sseomneil', { title })}
                />
              </Image.FixedRatioFrame>
            </Image>
          </FlexBox.Item>
        )}
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
