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
  channel?: string
  campaign?: string
  keywords?: string
  ad?: string
  partner?: string
  clickLookBack?: string
  isRetargeting?: boolean
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
    channel,
    campaign,
    keywords,
    ad,
    partner,
    clickLookBack,
    isRetargeting,
  }) => {
    const appLink = generateUrl({ scheme: appScheme, path })

    const query = qs.stringify({
      af_dp: appLink,
      af_web_dp: webURLBase || appLink,
      pid: pid || defaultPid,

      c: campaign,
      af_ad: ad,
      af_keywords: keywords,
      af_channel: channel,
      af_prt: partner,
      af_click_lookback: clickLookBack,
      is_retargeting: isRetargeting,
    })

    return generateUrl({
      scheme: 'https',
      host: `${subdomain}.onelink.me`, // AF_ONELINK_SUBDOMAIN
      path: `/${id}`,
      query,
    })
  }
}
