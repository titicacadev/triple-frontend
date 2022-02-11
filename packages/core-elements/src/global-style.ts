import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-gray: rgba(58, 58, 58, 1);
    --color-gray20: rgba(58, 58, 58, 0.02);
    --color-gray50: rgba(58, 58, 58, 0.05);
    --color-gray100: rgba(58, 58, 58, 0.1);
    --color-gray200: rgba(58, 58, 58, 0.2);
    --color-gray300: rgba(58, 58, 58, 0.3);
    --color-gray400: rgba(58, 58, 58, 0.4);
    --color-gray500: rgba(58, 58, 58, 0.5);
    --color-gray600: rgba(58, 58, 58, 0.6);
    --color-gray700: rgba(58, 58, 58, 0.7);
    --color-gray800: rgba(58, 58, 58, 0.8);
    --color-gray900: rgba(58, 58, 58, 0.9);
    --color-brightGray: rgba(239, 239, 239, 1);
    --color-blue: rgba(54, 143, 255, 1);
    --color-blue60: rgba(54, 143, 255, 0.06);
    --color-blue100: rgba(54, 143, 255, 0.1);
    --color-blue500: rgba(54, 143, 255, 0.5);
    --color-blue980: rgba(54, 143, 255, 0.98);
    --color-mint: rgba(38, 206, 194, 1);
    --color-mint100: rgba(38, 206, 194, 0.1);
    --color-orange: rgba(255, 150, 35, 1);
    --color-red: rgba(253, 46, 105, 1);
    --color-red100: rgba(253, 46, 105, 0.1);
    --color-deepOrange: rgba(255, 91, 46, 1);
    --color-mediumRed: rgba(255, 33, 60, 1);
    --color-deepRed: rgba(190, 0, 23, 1);
    --color-purple: rgba(151, 95, 254, 1);
    --color-purple100: rgba(151, 95, 254, 0.1);
    --color-emerald: rgba(13, 208, 175, 1);
    --color-white: rgba(255, 255, 255, 1);
    --color-white600: rgba(255, 255, 255, 0.6);
    --color-white900: rgba(255, 255, 255, 0.9);
    --color-skyblue: rgba(55, 168, 255, 1);
    --color-lightpurple: rgba(151, 95, 254, 1);

    /** genie */
    --color-azul: rgba(31, 87, 250, 1);
    --color-azul500: rgba(31, 87, 250, 0.5);
    --color-teal: rgba(10, 219, 143, 1);
    --color-teal100: rgba(10, 219, 143, 0.1);
    --color-teal900: rgba(10, 219, 143, 0.9);
    --color-vermilion: rgb(255, 97, 105, 1);
  }

  /*
  1. Prevent padding and border from affecting element width. (https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice)
  2. Remove default borders from all elements.
  */

  *,
  ::before,
  ::after {
    box-sizing: inherit; /* 1 */
    border-width: 0; /* 2 */
    border-style: none; /* 2 */
  }

  /*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use the user's configured 'sans' font-family by default.
  4. Prevent padding and border from affecting element width. (https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice)
  */

  html {
    line-height: 1; /* 1 */
    text-size-adjust: none; /* 2 */
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol; /* 3 */
    box-sizing: border-box; /* 4 */
  }

  
  /*
  1. Remove the margin in all browsers.
  2. Inherit line-height from 'html' so users can set them as a class directly on the 'html' element.
  */
  
  body {
    margin: 0; /* 1 */
    line-height: inherit; /* 2 */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
  }

  /*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Ensure horizontal rules are visible by default.
  */

  hr {
    height: 0; /* 1 */
    color: inherit; /* 2 */
    border-top-width: 1px; /* 3 */
  }

  /*
  Add the correct text decoration in Chrome, Edge, and Safari.
  */

  abbr:where([title]) {
    text-decoration: underline dotted;
  }

  /*
  Remove the default font size and weight for headings.
  */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /*
  Reset links to optimize for opt-in styling instead of opt-out.
  */

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /*
  Add the correct font weight in Edge and Safari.
  */

  b,
  strong {
    font-weight: bolder;
  }

  /*
  1. Use the user's configured 'mono' font family by default.
  2. Correct the odd 'em' font sizing in all browsers.
  */

  code,
  kbd,
  samp,
  pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /*
  Add the correct font size in all browsers.
  */

  small {
    font-size: 80%;
  }

  /*
  Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
  */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
  */

  table {
    text-indent: 0; /* 1 */
    border-color: inherit; /* 2 */
    border-collapse: collapse; /* 3 */
  }

  /*
  1. Change the font styles in all browsers.
  2. Remove the margin in Firefox and Safari.
  3. Remove default padding in all browsers.
  */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: inherit; /* 1 */
    color: inherit; /* 1 */
    margin: 0; /* 2 */
    padding: 0; /* 3 */
  }

  /*
  Remove the inheritance of text transform in Edge and Firefox.
  */

  button,
  select {
    text-transform: none;
  }

  /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Remove default button styles.
  */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button; /* 1 */
    background-color: transparent; /* 2 */
    background-image: none; /* 2 */
  }

  /*
  Use the modern Firefox focus style for all focusable elements.
  */

  :-moz-focusring {
    outline: auto;
  }

  /*
  Remove the additional ':invalid' styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
  */

  :-moz-ui-invalid {
    box-shadow: none;
  }

  /*
  Add the correct vertical alignment in Chrome and Firefox.
  */

  progress {
    vertical-align: baseline;
  }

  /*
  Correct the cursor style of increment and decrement buttons in Safari.
  */

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  /*
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
  */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /*
  Remove the inner padding in Chrome and Safari on macOS.
  */

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to 'inherit' in Safari.
  */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /*
  Add the correct display in Chrome and Safari.
  */

  summary {
    display: list-item;
  }

  /*
  Removes the default spacing and border for appropriate elements.
  */

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  fieldset {
    margin: 0;
    padding: 0;
  }

  legend {
    padding: 0;
  }

  ol,
  ul,
  menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /*
  Prevent resizing textareas horizontally by default.
  */

  textarea {
    resize: vertical;
  }

  /*
  1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
  */

  input::placeholder,
  textarea::placeholder {
    opacity: 1; /* 1 */
  }

  /*
  Set the default cursor for buttons.
  */

  button,
  [role="button"] {
    cursor: pointer;
  }

  /*
  Make sure disabled buttons don't get the pointer cursor.
  */
  :disabled {
    cursor: default;
  }

  /*
  1. Make replaced elements 'display: block' by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add 'vertical-align: middle' to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
    This can trigger a poorly considered lint error in some tools but is included by design.
  */

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    /* display: block; 1 */
    vertical-align: middle; /* 2 */
  }

  /*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
  */

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  /*
  Ensure the default browser behavior of the 'hidden' attribute.
  */

  [hidden] {
    display: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: var(--color-white);
    }
  }
`
