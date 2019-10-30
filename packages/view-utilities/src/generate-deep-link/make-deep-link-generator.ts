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
}

type DeepLinkGenerator = (params: GeneratorParams) => string

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
  return ({ path, pid, campaign, adSet, ad, channel, partner }) => {
    const appLink = generateUrl({ scheme: appScheme, path })

    /* eslint-disable @typescript-eslint/camelcase */
    const query = qs.stringify({
      af_dp: appLink,
      af_web_dp: webURLBase || appLink,
      pid: pid || defaultPID,

      c: campaign,
      f_adset: adSet,
      af_ad: ad,
      af_channel: channel,
      af_prt: partner,
    })
    /* eslint-enable @typescript-eslint/camelcase */

    return generateUrl({
      scheme: 'https',
      host: `${subdomain}.onelink.me`, // AF_ONELINK_SUBDOMAIN
      path: `/${id}`,
      query,
    })
  }
}
