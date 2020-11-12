const namingConvention = require('@titicaca/eslint-config-triple/rules/typescript/naming-convention')

const excludes = [
  ...namingConvention.commonExcludes,
  '__DISASTER_FALLBACK_HANDLER__',
  'af_dp',
  'af_web_dp',
  'f_adset',
  'af_ad',
  'af_channel',
  'af_prt',
  'small_square',
  'slot_id',
  'tna_id',
  'resource_id',
  'resource_type',
  'item_id',
  'user_id',
  'region_id',
  'review_id',
  'photo_id',
  'photo_first',
  'sorting_option',
  'sort_order',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'event_name',
  'tab_name',
  'attachment_id',
  'content_type',
  'content_id',
  'content_region_id',
  'user_location',
  'banner_id',
  'banner_position',
  'poi_id',
  '_unsafeTextStyle',
  '_web_expand',
]
const regex = `^(${excludes.join('|')})$`

module.exports = {
  rules: {
    '@typescript-eslint/naming-convention': namingConvention.getRules({
      regex,
    }),
  },
}
