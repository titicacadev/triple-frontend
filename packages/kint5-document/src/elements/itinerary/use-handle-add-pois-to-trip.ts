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
        ? poiId.map((poiId) => `poi:${poiId}`)
        : [`poi:${poiId}`]

      const festas = [
        process.env.NEXT_PUBLIC_ITINERARY_FESTA_ID1,
        process.env.NEXT_PUBLIC_ITINERARY_FESTA_ID2,
        process.env.NEXT_PUBLIC_ITINERARY_FESTA_ID3,
      ].map((festaId) => `festa:${festaId}`)

      navigate(
        generateUrl({
          scheme: appUrlScheme,
          path: '/action/add_trip_schedule',
          query: qs.stringify({
            items: [...pois, ...festas].join(','),
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
