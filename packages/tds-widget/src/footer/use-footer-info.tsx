import { useEffect, useState } from 'react'
import { useEnv } from '@titicaca/triple-web'

import { FooterInfo } from './type'

const initialFooterInfo: FooterInfo = {
  company: {
    name: '',
    ceo: { label: '대표이사', names: [] },
    businessRegistrationNumber: { label: '사업자 등록번호', value: '' },
    salesReportNumber: { label: '통신판매업 신고번호', value: '' },
    address: { label: '주소', value: '' },
    contact: { label: '항공, 숙소 및 투어·티켓 문의', phone: '', email: '' },
  },
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
