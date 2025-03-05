import { useEffect, useState } from 'react'

import { CompanyInfo } from './type'

const initialCompanyInfo: CompanyInfo = {
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

const companyInfoUrl = 'https://assets.triple.guide/footer/footer.json'

export function useCompanyInfo() {
  const [companyInfo, setCompanyInfo] =
    useState<CompanyInfo>(initialCompanyInfo)

  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const response = await fetch(companyInfoUrl)
        const data = await response.json()
        setCompanyInfo(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // do nothing
      }
    }

    getCompanyInfo()
  }, [])

  return companyInfo
}
