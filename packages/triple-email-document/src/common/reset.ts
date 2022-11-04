import { createGlobalStyle } from 'styled-components'

/**
 *  Mailchimp에서 권장하는 reset 스타일
 */
export const RecommendedReset = createGlobalStyle`
  /* stylelint-disable selector-class-pattern */
  body {
    margin: 0;
    padding: 0;
  }

  img {
    border: 0 none;
    height: auto;
    line-height: 100%;
    outline: none;
    text-decoration: none;
  }

  a img {
    border: 0 none;
  }

  .imageFix {
    display: block;
  }

  table,
  td {
    border-collapse: collapse;
  }

  /* for gmail */
  /* stylelint-disable-next-line selector-id-pattern */
  #bodyTable {
    height: 100% !important;
    margin: 0;
    padding: 0;
    width: 100% !important;
  }
`

export const CustomReset = createGlobalStyle`
  body {
   font-family: Arial, sans-serif;
  }

  table td {
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`

export const ClientSpecificWorkaround = createGlobalStyle`
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }

  #outlook a {
    padding: 0;
  }

  table {
    /* stylelint-disable-next-line property-no-unknown */
    mso-table-lspace: 0;
    /* stylelint-disable-next-line property-no-unknown */
    mso-table-rspace: 0;
  }

  img {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-interpolation-mode: bicubic;
  }

  body {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-text-size-adjust: 100%;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-text-size-adjust: 100%;
  }
`
