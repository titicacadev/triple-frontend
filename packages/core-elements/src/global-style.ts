import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --gray: rgba(58, 58, 58, 1);
    --gray20: rgba(58, 58, 58, 0.02);
    --gray50: rgba(58, 58, 58, 0.05);
    --gray100: rgba(58, 58, 58, 0.1);
    --gray200: rgba(58, 58, 58, 0.2);
    --gray300: rgba(58, 58, 58, 0.3);
    --gray400: rgba(58, 58, 58, 0.4);
    --gray500: rgba(58, 58, 58, 0.5);
    --gray600: rgba(58, 58, 58, 0.6);
    --gray700: rgba(58, 58, 58, 0.7);
    --gray800: rgba(58, 58, 58, 0.8);
    --gray900: rgba(58, 58, 58, 0.9);
    --brightGray: rgba(239, 239, 239, 1);
    --blue: rgba(54, 143, 255, 1);
    --blue60: rgba(54, 143, 255, 0.06);
    --blue100: rgba(54, 143, 255, 0.1);
    --blue980: rgba(54, 143, 255, 0.98);
    --mint: rgba(38, 206, 194, 1);
    --mint100: rgba(38, 206, 194, 0.1);
    --orange: rgba(255, 150, 35, 1);
    --red: rgba(253, 46, 105, 1);
    --red100: rgba(253, 46, 105, 0.1);
    --deepOrange: rgba(255, 91, 46, 1);
    --mediumRed: rgba(255, 33, 60, 1);
    --deepRed: rgba(190, 0, 23, 1);
    --purple: rgba(151, 95, 254, 1);
    --purple100: rgba(151, 95, 254, 0.1);
    --emerald: rgba(13, 208, 175, 1);
    --white: rgba(255, 255, 255, 1);
    --white600: rgba(255, 255, 255, 0.6);

    /** genie */
    --azul: rgba(31, 87, 250, 1);
    --azul500: rgba(31, 87, 250, 0.5);
    --teal: rgba(10, 219, 143, 1);
    --teal100: rgba(10, 219, 143, 0.1);
    --teal900: rgba(10, 219, 143, 0.9);
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  dfn,
  del,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    text-size-adjust: none;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  select {
    border-style: none;
    background: transparent;
    appearance: none;
  }
  b,
  strong {
    font-weight: bold;
  }

  a:any-link {
    text-decoration: none;
  }
`
