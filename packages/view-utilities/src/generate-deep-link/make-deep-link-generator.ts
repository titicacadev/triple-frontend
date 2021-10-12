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
  adSet?: string
  ad?: string
  channel?: string
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
  oneLinkParams: { subdomain, id, pid: defaultPID },
  appScheme,
  webURLBase,
}: FactoryParams): DeepLinkGenerator {
  return ({
    path,
    pid,
    campaign,
    adSet,
    ad,
    channel,
    partner,
    clickLookBack,
    isRetargeting,
  }) => {
    const appLink = generateUrl({ scheme: appScheme, path })

    const query = qs.stringify({
      af_dp: appLink,
      af_web_dp: webURLBase || appLink,
      pid: pid || defaultPID,

      c: campaign,
      af_adset: adSet,
      af_ad: ad,
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
