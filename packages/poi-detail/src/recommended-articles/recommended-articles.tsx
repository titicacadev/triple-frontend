import React, { useState, useEffect, useCallback } from 'react'
import { Section, Responsive, Container, H1 } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { TransitionType, useTransitionModal } from '@titicaca/modals'
import {
  ArticleCardCTA,
  fetchInventoryItems,
} from '@titicaca/app-installation-cta'
import { InventoryItemMeta } from '@titicaca/type-definitions'
import { Carousel } from '@titicaca/carousel'

import { fetchRecommendedArticles } from './api-client'
import { ArticleListingData } from './types'
import ArticleEntry from './article-entry'
import MoreButton from './more-button'

export default function RecommendedArticles({
  regionId,
  zoneId,
  onArticleClick,
  appInstallationCta,
}: {
  regionId?: string
  zoneId?: string
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
  const [
    articleCardCTA,
    setArticleCardCTA,
  ] = useState<InventoryItemMeta | null>(null)

  const { show } = useTransitionModal()
  const { trackEvent } = useEventTrackingContext()

  useEffect(() => {
    async function fetchAndSetRecommendedArticles() {
      setRecommendedArticles(
        await fetchRecommendedArticles({ regionId, zoneId }),
      )
    }
    async function fetchAndSetArticleCardCTA() {
      const items = await fetchInventoryItems({
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
  }, [
    appInstallationCta,
    regionId,
    zoneId,
    setRecommendedArticles,
    setArticleCardCTA,
  ])

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
        <H1 textAlign="center">놓치기 아까운 이 지역 꿀 정보 </H1>

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

        <Container padding={{ left: 110, right: 110 }}>
          <MoreButton basic compact onClick={handleShowMoreClick}>
            정보 더 보러가기
          </MoreButton>
        </Container>
      </Responsive>
      <Responsive maxWidth={767}>
        <H1 margin={{ left: 30 }}>{`놓치기 아까운\n이 지역 꿀 정보 `}</H1>

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

        <Container padding={{ left: 30, right: 30 }}>
          <MoreButton basic compact onClick={handleShowMoreClick}>
            정보 더 보러가기
          </MoreButton>
        </Container>
      </Responsive>
    </Section>
  )
}
