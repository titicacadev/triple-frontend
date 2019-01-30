import { injectGlobal } from 'styled-components'

injectGlobal`
  .scroll-disabled {
    overflow: hidden !important;
    width: 100%; 
    height: 100%; 
    position: fixed;
  }
`
