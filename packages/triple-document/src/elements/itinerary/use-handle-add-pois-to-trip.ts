import qs from 'qs'
import { useCallback } from 'react'
import { TransitionType } from '@titicaca/modals'
import { generateUrl } from '@titicaca/view-utilities'
import { useEnv } from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { useNavigate } from '@titicaca/router'

/**
 * TODO: hotels-web, content-web 일정추가 액션 중복코드
 */

interface Geotag {
  type: 'triple-region' | 'triple-zone'
  id: string
}

export default function useHandleAddPoiToTrip({ geotag }: { geotag: Geotag }) {
  const { appUrlScheme } = useEnv()
  const navigate = useNavigate()

  const handleFn = useCallback(
    (poiId: string | string[]) => {
      const query = generateAddTripPlanQuery({ poiId, geotag })

      navigate(
        generateUrl({
          scheme: appUrlScheme,
          path: '/action/add_trip_plan',
          query: qs.stringify(query),
        }),
      )
      return true
    },
    [navigate, geotag, appUrlScheme],
  )

  return useAppCallback(
    TransitionType.AddPoisToTripSelect,
    useSessionCallback(handleFn),
  )
}

export function generateAddTripPlanQuery({
  poiId,
  geotag,
}: {
  poiId: string | string[]
  geotag: Geotag
}) {
  const pois = Array.isArray(poiId) ? poiId.join(',') : poiId

  const geotagQuery =
    geotag.type === 'triple-region'
      ? { region_id: geotag.id }
      : { zone_id: geotag.id }

  return {
    ...geotagQuery,
    pois,
  }
}
