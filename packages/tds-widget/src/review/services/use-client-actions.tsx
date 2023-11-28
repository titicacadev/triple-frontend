import { useMemo } from 'react'
import qs from 'qs'
import { useEnv } from '@titicaca/triple-web'
import { useNavigate } from '@titicaca/router'
import { ImageMeta } from '@titicaca/type-definitions'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import { writeReview } from '../utils'
import type { SortingType, SortingOption } from '../components/sorting-context'

export function useClientActions() {
  const { appUrlScheme } = useEnv()
  const navigate = useNavigate()
  const { getWindowId } = useTripleClientActions()

  return useMemo(() => {
    return {
      writeReview(params: {
        resourceType: string
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
        resourceType: string
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
        hasMedia,
        recentTrip,
        sortingType,
        sortingOption,
      }: {
        regionId?: string
        resourceId: string
        resourceType: string
        hasMedia: boolean
        recentTrip: boolean
        sortingType?: SortingType
        sortingOption: SortingOption
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_id: resourceId,
          resource_type: resourceType,
          recent_trip: recentTrip,
          sorting_type: sortingType,
          sorting_option: sortingOption,
          has_media: hasMedia,
          opener_id: getWindowId && getWindowId(),
        })

        navigate(
          `${appUrlScheme}:///inlink?path=${encodeURIComponent(
            `/reviews/list?_triple_no_navbar&${params}`,
          )}`,
        )
      },
      navigateUserDetail(uid: string) {
        navigate(`${appUrlScheme}:///users/${uid}`)
      },
      navigateImages(images: ImageMeta[], index: number) {
        navigate(
          `${appUrlScheme}:///images?${qs.stringify({
            images: JSON.stringify(images),
            index,
          })}`,
        )
      },
      navigateReviewDetail({
        reviewId,
        regionId,
        resourceId,
        anchor,
      }: {
        reviewId: string
        regionId?: string
        resourceId: string
        anchor?: string
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_id: resourceId,
        })
        navigate(
          `${appUrlScheme}:///reviews/${reviewId}/detail?${params}${
            anchor ? `#${anchor}` : ''
          }`,
        )
      },
      navigateMileageIntro() {
        navigate(`${appUrlScheme}:///my/mileage/intro`)
      },
      reportReview(reviewId: string) {
        window.location.href = `${appUrlScheme}:///reviews/${reviewId}/report`
      },
    }
  }, [appUrlScheme, navigate, getWindowId])
}
