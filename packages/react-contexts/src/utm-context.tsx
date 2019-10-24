import React, { createContext, useContext, ComponentType } from 'react'

interface UTMQuery {
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
}

interface UTMContextValue {
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
}

/**
 * query 객체에서 utm context 객체를 추출합니다.
 */
/* eslint-disable @typescript-eslint/camelcase */
export function extractUTMContextFromQuery({
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
  utmSource,
  utmMedium,
  utmCampaign,
  utmTerm,
  utmContent,
}: UTMQuery): UTMContextValue {
  const source = utm_source || utmSource || ''
  const medium = utm_medium || utmMedium || ''
  const campaign = utm_campaign || utmCampaign || ''
  const term = utm_term || utmTerm
  const content = utm_content || utmContent

  if ((source || medium || campaign) && (!source || !medium || !campaign)) {
    console.warn(
      'utm 파라미터를 사용할 때 source, medium, campaign을 모두 추가하는 것을 권장합니다.',
    )
  }

  return {
    source,
    medium,
    campaign,
    term,
    content,
  }
}
/* eslint-enable @typescript-eslint/camelcase */

const Context = createContext<UTMContextValue>({
  source: '',
  medium: '',
  campaign: '',
})

export const UTMProvider = Context.Provider

/**
 * Functional 컴포넌트에 utm context를 inject할 때 사용하는 함수
 */
export function useUTMContext() {
  return useContext(Context)
}

/**
 * class 컴포넌트에서 utm context를 inject할 때 사용하는 함수
 * @param Component
 */
export function withUTMContext<P extends { utmContext: UTMContextValue }>(
  Component: ComponentType<P>,
) {
  return function UTMComponent(props: Omit<P, 'utmContext'>) {
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
