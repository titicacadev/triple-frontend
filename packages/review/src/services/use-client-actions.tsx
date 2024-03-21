import { useMemo } from 'react'
import qs from 'qs'
import { useEnv } from '@titicaca/react-contexts'
import { useNavigate } from '@titicaca/router'
import { ImageMeta } from '@titicaca/type-definitions'

import { writeReview } from '../utils'

export function useClientActions() {
  const { appUrlScheme } = useEnv()
  const navigate = useNavigate()

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
  }, [appUrlScheme, navigate])
}
