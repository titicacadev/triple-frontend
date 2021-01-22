import qs from 'qs'
import { useCallback } from 'react'
import { TransitionType } from '@titicaca/modals'
import { generateUrl } from '@titicaca/view-utilities'
import { useHistoryFunctions, useEnv } from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'

/**
 * TODO: hotels-web, content-web 일정추가 액션 중복코드
 */
export default function useHandleAddPoiToTrip(regionId?: string) {
  const { appUrlScheme } = useEnv()
  const { navigate } = useHistoryFunctions()

  const handleFn = useCallback(
    (poiId: string | string[]) => {
      const pois = Array.isArray(poiId) ? poiId.join(',') : poiId

      navigate(
        generateUrl({
          scheme: appUrlScheme,
          path: '/action/add_trip_plan',
          query: qs.stringify({
            region_id: regionId,
            pois,
          }),
        }),
      )
      return true
    },
    [navigate, regionId, appUrlScheme],
  )

  return useAppCallback(TransitionType.General, useSessionCallback(handleFn))
}
