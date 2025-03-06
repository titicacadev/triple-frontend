import { useEffect, useState } from 'react'
import { useEnv } from '@titicaca/triple-web'

import { FooterInfo } from './type'

const initialFooterInfo: FooterInfo = {
  companyTexts: [[]],
  disclaimer: '',
  links: [],
  extraLinks: [],
  awards: [],
}

const companyInfoUrlPath = '/footer/footer.json'

export function useFooterInfo() {
  const [footerInfo, setFooterInfo] = useState<FooterInfo>(initialFooterInfo)
  const { webAssetsUrl } = useEnv()

  useEffect(() => {
    if (!webAssetsUrl) {
      throw new Error('webAssetsUrl is not defined')
    }

    const getFooterInfo = async () => {
      try {
        const response = await fetch(webAssetsUrl + companyInfoUrlPath)
        const data = await response.json()
        setFooterInfo(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // do nothing
      }
    }

    getFooterInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return footerInfo
}
