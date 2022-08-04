import qs from 'qs'

import { generateUrl } from '../url'

interface FactoryParams {
  oneLinkParams: {
    subdomain: string
    id: string
    pid: string
  }
  appScheme: string
  webURLBase: string
}

interface GeneratorParams {
  path: string

  // one link parameter에 들어가는 값
  pid?: string
  campaign?: string
  /**
   * @deprecated
   * channel 사용을 권장합니다.
   * onelink의 af_adset을 측정하지않고, af_channel을 측정합니다.
   * 참고 : https://docs.google.com/spreadsheets/d/1W01wso5gWwr-3ODCdgZsrC7fpzq0FX954m4Y3NgfCYg/edit#gid=0
   */
  adSet?: string
  keywords?: string
  ad?: string
  channel?: string
  partner?: string
  clickLookBack?: string
  isRetargeting?: boolean
  reengagementWindow?: string
  webUrl?: string
}

export type DeepLinkGenerator = (params: GeneratorParams) => string

/**
 * 프로젝트에 고정되어있는 값을 받아 딥링크 제너레이터를 반환합니다.
 *
 * @param oneLinkParams subdomain, id, pid
 * @param appScheme
 * @param webURLBase
 */
export function makeDeepLinkGenerator({
  oneLinkParams: { subdomain, id, pid: defaultPid },
  appScheme,
  webURLBase,
}: FactoryParams): DeepLinkGenerator {
  return ({
    path,
    pid,
    campaign,
    adSet,
    keywords,
    ad,
    channel,
    partner,
    clickLookBack,
    isRetargeting = true,
    reengagementWindow,
    webUrl,
  }) => {
    const appLink = generateUrl({ scheme: appScheme, path })

    const query = qs.stringify({
      af_dp: appLink,
      af_web_dp: webUrl || webURLBase || appLink,
      pid: pid || defaultPid,

      c: campaign,
      af_adset: adSet,
      af_ad: ad,
      af_keywords: keywords,
      af_channel: channel,
      af_prt: partner,
      af_click_lookback: clickLookBack,
      is_retargeting: isRetargeting,
      af_reengagement_window: reengagementWindow,
    })

    return generateUrl({
      scheme: 'https',
      host: `${subdomain}.onelink.me`, // AF_ONELINK_SUBDOMAIN
      path: `/${id}`,
      query,
    })
  }
}
