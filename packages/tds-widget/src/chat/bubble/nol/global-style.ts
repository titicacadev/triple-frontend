import { createGlobalStyle } from 'styled-components'

import { NOL_COLOR } from './constants'

function colorConstantToCssVariable() {
  return Object.keys(NOL_COLOR)
    .map((key) => `--${key}: ${NOL_COLOR[key as keyof typeof NOL_COLOR]};`)
    .join(' ')
}

export const NolGlobalStyle = createGlobalStyle`
  :root {
    ${colorConstantToCssVariable()}
  }

  html {
    text-size-adjust: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 62.5%;
    background-color: #fff;
  }

  body {
    font-weight: normal;
    font-size: 1.3rem;
    line-height: 1.3;

    div[data-floating-ui-portal] {
      div[data-transition='open'][aria-hidden="true"] {
        background-color: rgba(0, 0, 0, 0.20);
      }
    }

    * {
      letter-spacing: 0;
      word-spacing: 0;
    }
}
`
