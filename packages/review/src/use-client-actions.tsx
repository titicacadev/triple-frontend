import { useMemo } from 'react'
import qs from 'qs'
import { useHistoryFunctions, useEnv } from '@titicaca/react-contexts'

import { ResourceType } from './types'
import { writeReview } from './review-api-clients'

export function useClientActions({
  appUrlScheme: appUrlSchemeFromProps,
}: {
  /**
   * @deprecated env context를 사용하면 생략 가능
   */
  appUrlScheme?: string
}) {
  const { appUrlScheme: appUrlSchemeFromContext } = useEnv()
  const { navigate } = useHistoryFunctions()

  const appUrlScheme = useMemo(() => {
    if (appUrlSchemeFromContext) {
      return appUrlSchemeFromContext
    }
    if (typeof appUrlSchemeFromProps === 'string') {
      // TODO: 개발용 logger 만들기
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'appUrlScheme prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.\nhttps://github.com/titicacadev/triple-frontend/blob/ab1648a7cdb684ee2752eb5b80eed02940106964/packages/react-contexts/src/env-context/README.md#%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%98%EB%8A%94-%EB%B2%95',
        )
      }

      return appUrlSchemeFromProps
    }

    throw new Error('appUrlScheme을 구할 수 없습니다.')
  }, [appUrlSchemeFromContext, appUrlSchemeFromProps])

  return useMemo(() => {
    return {
      writeReview(params: {
        resourceType: ResourceType
        resourceId: string
        regionId?: string
        rating?: number
        photoFirst?: boolean
      }) {
        writeReview({ appUrlScheme, ...params })
      },
      editReview({
        regionId,
        resourceId,
        resourceType,
      }: {
        regionId?: string
        resourceId: string
        resourceType: ResourceType
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_type: resourceType,
          resource_id: resourceId,
        })
        window.location.href = `${appUrlScheme}:///reviews/edit?${params}`
      },
      navigateReviewList({
        regionId,
        resourceId,
        resourceType,
        sortingOption,
      }: {
        regionId?: string
        resourceId: string
        resourceType: ResourceType
        sortingOption: string
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_id: resourceId,
          resource_type: resourceType,
          sorting_option: sortingOption,
        })

        navigate(
          `${appUrlScheme}:///inlink?path=${encodeURIComponent(
            `/reviews/list?_triple_no_navbar&${params}`,
          )}`,
        )
      },
      navigateUserDetail(uid: string) {
        window.location.href = `${appUrlScheme}:///users/${uid}`
      },
      navigateImages(
        images: {
          id: string
          title: string
          description: string
          width: unknown
          height: unknown
          sourceUrl: string
          sizes: {
            full: { url: string }
            large: { url: string }
            small_square: { url: string }
          }
        }[],
        index: number,
      ) {
        window.location.href = `${appUrlScheme}:///images?${qs.stringify({
          images: JSON.stringify(images),
          index,
        })}`
      },
      navigateReviewDetail({
        reviewId,
        regionId,
        resourceId,
      }: {
        reviewId: string
        regionId?: string
        resourceId: string
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_id: resourceId,
        })
        window.location.href = `${appUrlScheme}:///reviews/${reviewId}/detail?${params}`
      },
      navigateMileageIntro() {
        navigate(`${appUrlScheme}:///my/mileage/intro`)
      },
      reportReview(reviewId: string) {
        window.location.href = `${appUrlScheme}:///reviews/${reviewId}/report`
      },
    }
  }, [appUrlScheme, navigate])
}
