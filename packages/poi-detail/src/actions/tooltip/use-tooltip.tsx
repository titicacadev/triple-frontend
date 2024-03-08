import { useLocalStorage } from '@titicaca/react-hooks'
import { useEffect, useState } from 'react'

export default function useTooltip(tooltipName: string) {
  const [isTooltipExposed, setIsTooltipExposed] = useLocalStorage(tooltipName)
  const [isTooltipExposedCopy, setIsTooltipExposedCopy] = useState<
    string | undefined
  >(undefined)

  useEffect(() => {
    if (isTooltipExposed !== null) {
      setIsTooltipExposedCopy(isTooltipExposed)
      setIsTooltipExposed('true')
    }
  }, [])

  function updateCurrentIsTooltipExposed(value: string) {
    setIsTooltipExposedCopy(value)
  }

  return {
    tooltipShownBefore: isTooltipExposedCopy === 'true',
    updateCurrentIsTooltipExposed,
  }
}
