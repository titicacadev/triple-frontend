import React, { useState, useEffect, useCallback } from 'react'
import { Section, Responsive, H1 } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { TransitionType, useTransitionModal } from '@titicaca/modals'
import {
  ArticleCardCTA,
  fetchInventoryCTA,
} from '@titicaca/app-installation-cta'
import { InventoryMeta } from '@titicaca/type-definitions'
import { Carousel } from '@titicaca/carousel'

import { fetchRecommendedArticles } from './api-client'
import { ArticleListingData } from './types'
import ArticleEntry from './article-entry'
import MoreButton from './more-button'

export default function RecommendedArticles({
  regionId,
  onArticleClick,
  appInstallationCta,
}: {
  regionId: string
  onArticleClick: (
    e: React.SyntheticEvent,
    clickedArticle: ArticleListingData,
  ) => void
  appInstallationCta?: {
    href: string
    inventoryId: string
    onClick?: () => void
  }
}) {
  const [recommendedArticles, setRecommendedArticles] = useState<
    ArticleListingData[]
  >([])
  const [articleCardCTA, setArticleCardCTA] = useState<InventoryMeta | null>(
    null,
  )

  const { show } = useTransitionModal()
  const { trackEvent } = useEventTrackingContext()

  useEffect(() => {
    async function fetchAndSetRecommendedArticles() {
      setRecommendedArticles(await fetchRecommendedArticles({ regionId }))
    }
    async function fetchAndSetArticleCardCTA() {
      const items = await fetchInventoryCTA({
        inventoryId: appInstallationCta?.inventoryId,
      })
      if (items && items.length > 0) {
        setArticleCardCTA(items[0])
      }
    }

    fetchAndSetRecommendedArticles()
    if (appInstallationCta?.inventoryId) {
      fetchAndSetArticleCardCTA()
    }
  }, [appInstallationCta, regionId, setRecommendedArticles, setArticleCardCTA])

  const handleIntersect = useCallback(
    (intersectingArticle: ArticleListingData) => {
      trackEvent({
        ga: ['추천가이드_노출', intersectingArticle.source.title],
      })
    },
    [trackEvent],
  )

  const handleShowMoreClick = useCallback(() => {
    show(TransitionType.Article)
  }, [show])

  if (!recommendedArticles || recommendedArticles.length === 0) {
    return null
  }

  return (
    <Section
      margin={{ top: 50, bottom: 50 }}
      divider="top"
      maxWidth={0}
      padding={{ left: 0, right: 0 }}
    >
      <Responsive minWidth={768}>
        <H1 textAlign="center">함께 보면 좋을 추천 가이드</H1>

        <Carousel
          margin={{ top: 20 }}
          containerPadding={{ left: 110, right: 110 }}
        >
          {articleCardCTA && (
            <Carousel.Item size="medium">
              <ArticleCardCTA
                cta={articleCardCTA}
                href={appInstallationCta?.href}
                onClick={appInstallationCta?.onClick}
              />
            </Carousel.Item>
          )}
          {recommendedArticles.map((article) => (
            <Carousel.Item key={article.id} size="medium">
              <ArticleEntry
                article={article}
                onClick={onArticleClick}
                onIntersect={handleIntersect}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <MoreButton margin={{ top: 20 }} center onClick={handleShowMoreClick}>
          가이드 더보기
        </MoreButton>
      </Responsive>
      <Responsive maxWidth={767}>
        <H1 margin={{ left: 30 }}>{`함께 보면 좋을\n추천 가이드`}</H1>

        <Carousel
          margin={{ top: 20 }}
          containerPadding={{ left: 30, right: 30 }}
        >
          {articleCardCTA && (
            <Carousel.Item size="medium">
              <ArticleCardCTA
                cta={articleCardCTA}
                href={appInstallationCta?.href}
                onClick={appInstallationCta?.onClick}
              />
            </Carousel.Item>
          )}
          {recommendedArticles.map((article) => (
            <Carousel.Item key={article.id} size="medium">
              <ArticleEntry
                article={article}
                onClick={onArticleClick}
                onIntersect={handleIntersect}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <MoreButton
          onClick={handleShowMoreClick}
          margin={{ top: 20, right: 20 }}
          floated="right"
        >
          가이드 더보기
        </MoreButton>
      </Responsive>
    </Section>
  )
}
