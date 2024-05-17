import { useCallback } from 'react'
import { stringify } from 'qs'
import { CaretRightIcon, Text } from '@titicaca/kint5-core-elements'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { useAppCallback } from '@titicaca/ui-flow'
import { TransitionType } from '@titicaca/kint5-modals'
import { useEnv } from '@titicaca/react-contexts'
import { useTranslation } from '@titicaca/next-i18next'

import { isValidAppVersion } from './app-version-check'
import { DirectionFinderIcon } from './direction-finder-icon'
import { Course } from './use-computed-itineraries'

interface FindDirectionsButtonProps {
  currentCourse: Course
  nextCourse: Course | undefined
  hasTransportationInfo: boolean
}

export function FindDirectionsButton({
  currentCourse,
  nextCourse,
  hasTransportationInfo,
}: FindDirectionsButtonProps) {
  const { t } = useTranslation('common-web')
  const app = useTripleClientMetadata()
  const { appUrlScheme } = useEnv()

  const onFindDirectionsClick = useAppCallback(
    TransitionType.General,
    useCallback(() => {
      if (
        !currentCourse.geolocation ||
        !nextCourse ||
        !nextCourse.geolocation
      ) {
        return
      }

      const queryStrings = stringify({
        start_name: currentCourse.name,
        start_latitude: currentCourse.geolocation.coordinates[1],
        start_longitude: currentCourse.geolocation.coordinates[0],
        start_content_id: currentCourse.id,
        start_content_type: currentCourse.type === 'festa' ? 'festa' : 'poi',
        end_name: nextCourse.name,
        end_latitude: nextCourse.geolocation.coordinates[1],
        end_longitude: nextCourse.geolocation.coordinates[0],
        end_content_id: nextCourse.id,
        end_content_type: nextCourse.type === 'festa' ? 'festa' : 'poi',
      })

      window.location.href = `${appUrlScheme}:///action/directions?${queryStrings}`
    }, [appUrlScheme, currentCourse, nextCourse]),
  )

  if (app && !isValidAppVersion(app.appVersion, 'findingDirections')) {
    return null
  }

  if (!currentCourse.geolocation || !nextCourse || !nextCourse.geolocation) {
    return null
  }

  // !!!!!!!!!!!!! 임시: 1.4.0 배포때까지 길찾기 버튼 노출 X !!!!!!!!!!!!!
  return <div css={{ width: 1, height: 2, margin: '17px 0' }} />
  // !!!!!!!!!!!!! 임시: 1.4.0 배포때까지 길찾기 버튼 노출 X !!!!!!!!!!!!!

  return (
    <button
      onClick={onFindDirectionsClick}
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        margin: '18px 0',
      }}
    >
      {hasTransportationInfo ? (
        <Text
          css={{
            fontSize: 13,
            color: 'var(--color-kint5-gray60)',
          }}
        >
          {' '}
          ·
        </Text>
      ) : null}
      <DirectionFinderIcon />
      <Text
        css={{
          color: 'var(--color-kint5-brand1)',
          fontSize: 13,
        }}
      >
        {t('길안내')}
      </Text>
      <CaretRightIcon color="#7743EE" width={12} height={12} />
    </button>
  )
}
