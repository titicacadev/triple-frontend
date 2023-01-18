import { RollingSpinner } from './rolling-spinner'
import { Spinner } from './spinner'

export default {
  title: 'core-elements / Spinner',
}

export function BaseSpinner() {
  return <Spinner full={false} />
}

BaseSpinner.storyName = '기본 스피너'

export function BaseRollingSpinner() {
  const logos = [
    'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/7C.png',
    'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/TW.png',
    'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/AC.png',
  ]
  return <RollingSpinner imageUrls={logos} duration={50} size={36} />
}

BaseRollingSpinner.storyName = '롤링 스피너'
