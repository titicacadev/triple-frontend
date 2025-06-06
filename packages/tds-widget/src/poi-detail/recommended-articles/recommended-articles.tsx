import { useState, useEffect, useCallback, SyntheticEvent } from 'react'
import {
  Section,
  Responsive,
  Container,
  H1,
  formatMarginPadding,
} from '@titicaca/tds-ui'
import {
  useTranslation,
  useTrackEvent,
  useAppInstallCtaModal,
} from '@titicaca/triple-web'
import { InventoryItemMeta } from '@titicaca/type-definitions'
import { styled } from 'styled-components'

import { ArticleCardCta, fetchInventoryItems } from '../../app-installation-cta'
import { FlickingCarousel } from '../../flicking-carousel/flicking-carousel'

import { fetchRecommendedArticles } from './api-client'
import { ArticleListingData } from './types'
import { ArticleEntry } from './article-entry'
import { MoreButton } from './more-button'

const MobileCarousel = styled(FlickingCarousel)`
  margin-top: 20px;
  padding: 0 30px;
`

export function PoiDetailRecommendedArticles({
  regionId,
  zoneId,
  mobilePadding,
  deskTopPadding,
  onArticleClick,
  onMoreClick,
  appInstallationCta,
}: {
  regionId?: string
  zoneId?: string
  /**
   * mobilePadding, deskTopPadding
   *
   * 예시 1 (호텔)
   * - https://triple-dev.titicaca-corp.com/hotels/375458d2-09fb-408b-b2dd-53932ed6ce89?regionId=759174cc-0814-4400-a420-5668a0517edd&cityId=KM1861798255&_triple_no_navbar=true&from=public-list
   *
   * 예시 2 (공유 일정)
   * - https://triple-staging.titicaca-corp.com/trips/lounge/itineraries/797d148d-4769-4bf1-8f36-839ef2801979
   *
   * 위의 예시 링크들의 하단을 보면 디자인이 달라 mobile, desktop 각각 내부 padding을 커스텀할 때 사용하는 props
   */
  mobilePadding?: { left: number; right: number }
  deskTopPadding?: { left: number; right: number }
  onArticleClick: (
    e: SyntheticEvent,
    clickedArticle: ArticleListingData,
  ) => void
  onMoreClick?: () => void
  appInstallationCta?: {
    href?: string
    inventoryId: string
    onClick?: () => void
  }
}) {
  const t = useTranslation()

  const [recommendedArticles, setRecommendedArticles] = useState<
    ArticleListingData[]
  >([])
  const [articleCardCta, setArticleCardCta] =
    useState<InventoryItemMeta | null>(null)

  const { show } = useAppInstallCtaModal()
  const trackEvent = useTrackEvent()

  useEffect(() => {
    async function fetchAndSetRecommendedArticles() {
      setRecommendedArticles(
        await fetchRecommendedArticles({ regionId, zoneId }),
      )
    }
    async function fetchAndSetArticleCardCta() {
      const items = await fetchInventoryItems({
        inventoryId: appInstallationCta?.inventoryId,
      })

      if (items && items.length > 0) {
        setArticleCardCta(items[0])
      }
    }

    fetchAndSetRecommendedArticles()

    if (appInstallationCta?.inventoryId) {
      fetchAndSetArticleCardCta()
    }
  }, [
    appInstallationCta,
    regionId,
    zoneId,
    setRecommendedArticles,
    setArticleCardCta,
  ])

  const handleIntersect = useCallback(
    (intersectingArticle: ArticleListingData) => {
      trackEvent({
        ga: ['추천가이드_노출', intersectingArticle.source.title],
        fa: {
          action: '추천가이드_노출',
          item_name: intersectingArticle.source.title,
          item_id: intersectingArticle.id,
        },
      })
    },
    [trackEvent],
  )

  const handleShowMoreClick = useCallback(() => {
    onMoreClick
      ? onMoreClick()
      : show({ triggeredEventAction: '추천가이드_더보기' })
  }, [onMoreClick, show])

  if (!recommendedArticles || recommendedArticles.length === 0) {
    return null
  }

  return (
    <Section
      divider="top"
      css={{
        marginTop: 50,
        marginBottom: 50,
        padding: '0',
      }}
    >
      <Responsive minWidth={768}>
        <H1
          css={{
            margin: `0 0 0 ${deskTopPadding?.right || 110}px`,
          }}
        >
          {t('놓치기 아까운 이 지역 꿀 정보 2')}
        </H1>

        <FlickingCarousel
          margin={{ top: 20 }}
          containerPadding={deskTopPadding || { left: 110, right: 110 }}
        >
          {articleCardCta && (
            <FlickingCarousel.Item size="medium">
              <ArticleCardCta
                cta={articleCardCta}
                href={appInstallationCta?.href}
                onClick={appInstallationCta?.onClick}
              />
            </FlickingCarousel.Item>
          )}
          {recommendedArticles.map((article) => (
            <FlickingCarousel.Item key={article.id} size="medium">
              <ArticleEntry
                article={article}
                onClick={onArticleClick}
                onIntersect={handleIntersect}
              />
            </FlickingCarousel.Item>
          ))}
        </FlickingCarousel>

        <Container
          css={formatMarginPadding(
            deskTopPadding || { left: 110, right: 110 },
            'padding',
          )}
        >
          <MoreButton basic compact onClick={handleShowMoreClick}>
            {t('여행 정보 더보기')}
          </MoreButton>
        </Container>
      </Responsive>

      <Responsive maxWidth={767}>
        <H1
          css={{
            margin: `0 0 0 ${mobilePadding?.right || 30}px`,
          }}
        >
          {t('놓치기 아까운 이 지역 꿀 정보')}
        </H1>
        <MobileCarousel>
          {articleCardCta && (
            <FlickingCarousel.Item size="medium">
              <ArticleCardCta
                cta={articleCardCta}
                href={appInstallationCta?.href}
                onClick={appInstallationCta?.onClick}
              />
            </FlickingCarousel.Item>
          )}
          {recommendedArticles.map((article) => (
            <FlickingCarousel.Item key={article.id} size="medium">
              <ArticleEntry
                article={article}
                onClick={onArticleClick}
                onIntersect={handleIntersect}
              />
            </FlickingCarousel.Item>
          ))}
        </MobileCarousel>
        <Container
          css={formatMarginPadding(
            mobilePadding || { left: 30, right: 30 },
            'padding',
          )}
        >
          <MoreButton basic compact onClick={handleShowMoreClick}>
            {t('여행 정보 더보기')}
          </MoreButton>
        </Container>
      </Responsive>
    </Section>
  )
}
