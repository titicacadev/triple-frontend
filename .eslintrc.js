const createConfig = require('@titicaca/eslint-config-triple/create-config')

const { overrides, ...rest } = createConfig({
  type: 'frontend',
  project: ['./packages/*/tsconfig.build.json', './tsconfig.json'],
  tsconfigRootDir: __dirname,
  enableTypeCheck: false,
  allowedNames: [
    '__DISASTER_FALLBACK_HANDLER__',
    'af_dp',
    'af_web_dp',
    'af_adset',
    'af_keywords',
    'af_ad',
    'af_channel',
    'af_prt',
    'af_click_lookback',
    'af_reengagement_window',
    'is_retargeting',
    'small_square',
    'slot_id',
    'tna_id',
    'resource_id',
    'resource_type',
    'recent_trip',
    'item_id',
    'item_name',
    'user_id',
    'region_id',
    'zone_id',
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
    'experiment_name',
    'experiment_id',
    'variant_id',
    '_triple_lnb_region_id',
    '_triple_lnb_zone_id',
    '_triple_lnb_trip_id',
    '_triple_swipe_to_close',
    '_triple_no_navbar',
    '_triple_should_present',
    'send_page_view',
    'page_path',
    'coupon_(id|type)',
    'button_name',
    'rawHTML',
    'injectUTMContext',
    'UTMContext',
    'webURLBase',
    'iOS',
    '_css',
    'filter_name',
    'image_url',
    'common-web',
    'x-triple-user-lang',
    'x-triple-user-country',
  ],
})

module.exports = {
  ...rest,
  overrides: [
    ...overrides,
    {
      files: ['*.mdx'],
      extends: 'plugin:mdx/recommended',
      rules: {
        'import/no-unresolved': 'off',
      },
    },
    {
      files: [
        '*.test.ts',
        '*.test.tsx',
        '*.spec.ts',
        '*.spec.tsx',
        '*.stories.*',
      ],
      rules: {
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
      },
    },
  ],
}
