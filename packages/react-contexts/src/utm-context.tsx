import { createContext, useContext, ComponentType } from 'react'
import { DeepPartial } from 'utility-types'

interface UtmQuery {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string

  // for camelized query
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string

  // utm parameter 명세가 아닌 custom query
  prt?: string
}

interface UtmContextValue {
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
  partner?: string
}

/**
 * query 객체에서 utm context 객체를 추출합니다.
 */
export function extractUtmContextFromQuery({
  utm_source: originalUtmSource,
  utm_medium: originalUtmMedium,
  utm_campaign: originalUtmCampaign,
  utm_term: originalUtmTerm,
  utm_content: originalUtmContent,
  utmSource,
  utmMedium,
  utmCampaign,
  utmTerm,
  utmContent,
  prt,
}: UtmQuery): UtmContextValue {
  const source = originalUtmSource || utmSource || ''
  const medium = originalUtmMedium || utmMedium || ''
  const campaign = originalUtmCampaign || utmCampaign || ''
  const term = originalUtmTerm || utmTerm
  const content = originalUtmContent || utmContent

  return {
    source,
    medium,
    campaign,
    term,
    content,
    partner: prt,
  }
}

const Context = createContext<UtmContextValue>({
  source: '',
  medium: '',
  campaign: '',
})

export const UtmProvider = Context.Provider

/**
 * Functional 컴포넌트에 utm context를 inject할 때 사용하는 함수
 */
export function useUtmContext() {
  return useContext(Context)
}

export interface WithUtmContextBaseProps {
  utmContext: UtmContextValue
}

/**
 * class 컴포넌트에서 utm context를 inject할 때 사용하는 함수
 * @param Component
 */
export function withUtmContext<P extends DeepPartial<WithUtmContextBaseProps>>(
  Component: ComponentType<P>,
) {
  return function WithUtmContext(
    props: Omit<P, keyof WithUtmContextBaseProps>,
  ) {
    return (
      <Context.Consumer>
        {(utmContext) => {
          const componentProps = {
            ...props,
            utmContext,
          } as P

          return <Component {...componentProps} />
        }}
      </Context.Consumer>
    )
  }
}
