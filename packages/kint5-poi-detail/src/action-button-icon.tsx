import {
  BubbleIcon,
  CalenderIcon,
  Container,
  DirectionsSignIcon,
  EmptyHeartIcon,
  FilledHeartIcon,
} from '@titicaca/kint5-core-elements'

import { PoiActionShareIcon } from './action-share-icon'

type IconType =
  | 'scraped'
  | 'notScraped'
  | 'schedule'
  | 'review'
  | 'share'
  | 'getDirections'

const SIZE_PX = 24

export function ActionButtonIcon({ type }: { type: IconType }) {
  return (
    <Container
      css={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {(() => {
        switch (type) {
          case 'notScraped':
            return <EmptyHeartIcon width={SIZE_PX} height={SIZE_PX} />
          case 'scraped':
            return <FilledHeartIcon width={SIZE_PX} height={SIZE_PX} />
          case 'schedule':
            return <CalenderIcon width={SIZE_PX} height={SIZE_PX} />
          case 'review':
            return <BubbleIcon width={SIZE_PX} height={SIZE_PX} />
          case 'share':
            return <PoiActionShareIcon width={SIZE_PX} height={SIZE_PX} />
          case 'getDirections':
            return <DirectionsSignIcon width={SIZE_PX} height={SIZE_PX} />
        }
      })()}
    </Container>
  )
}
