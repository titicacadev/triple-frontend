import qs from 'qs'
import { useCallback } from 'react'
import { TransitionType } from '@titicaca/kint5-modals'
import { generateUrl } from '@titicaca/view-utilities'
import { useEnv } from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { useNavigate } from '@titicaca/kint5-router'

export function useHandleAddPoiToTrip({
  regionId,
}: {
  regionId?: string | null
}) {
  const { appUrlScheme } = useEnv()
  const navigate = useNavigate()

  const handleFn = useCallback(
    (poiId: string | string[]) => {
      const pois = Array.isArray(poiId)
        ? poiId.map((poiId) => `poi:${poiId}`)
        : [`poi:${poiId}`]

      navigate(
        generateUrl({
          scheme: appUrlScheme,
          path: '/action/add_trip_schedule',
          query: qs.stringify({
            items: pois.join(','),
            ...(regionId && { region_id: regionId }),
          }),
        }),
      )
      return true
    },
    [navigate, appUrlScheme, regionId],
  )

  return useAppCallback(
    TransitionType.AddPoisToTripSelect,
    useSessionCallback(handleFn),
  )
}
