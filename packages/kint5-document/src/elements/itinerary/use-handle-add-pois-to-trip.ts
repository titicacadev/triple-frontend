import qs from 'qs'
import { useCallback } from 'react'
import { TransitionType } from '@titicaca/modals'
import { generateUrl } from '@titicaca/view-utilities'
import { useEnv } from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { useNavigate } from '@titicaca/router'

export function useHandleAddPoiToTrip() {
  const { appUrlScheme } = useEnv()
  const navigate = useNavigate()

  const handleFn = useCallback(
    (poiId: string | string[]) => {
      const pois = Array.isArray(poiId)
        ? poiId.map((poiId) => `poi:${poiId}`).join(',')
        : `poi:${poiId}`

      navigate(
        generateUrl({
          scheme: appUrlScheme,
          path: '/action/add_trip_schedule',
          query: qs.stringify({
            items: pois,
          }),
        }),
      )
      return true
    },
    [navigate, appUrlScheme],
  )

  return useAppCallback(
    TransitionType.AddPoisToTripSelect,
    useSessionCallback(handleFn),
  )
}
