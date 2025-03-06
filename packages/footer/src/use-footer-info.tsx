import { useEffect, useState } from 'react'
import { useEnv } from '@titicaca/react-contexts'

import { FooterInfo } from './type'

const companyInfoUrlPath = '/footer/footer.json'

export function useFooterInfo() {
  const [footerInfo, setFooterInfo] = useState<FooterInfo | null>(null)
  const { webAssetsUrl } = useEnv()

  useEffect(() => {
    if (!webAssetsUrl) {
      throw new Error('webAssetsUrl is not defined in EnvContext')
    }

    const getFooterInfo = async () => {
      try {
        const response = await fetch(webAssetsUrl + companyInfoUrlPath)
        const data = await response.json()
        setFooterInfo(data)
      } catch (error) {
        // do nothing
      }
    }

    getFooterInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return footerInfo
}
