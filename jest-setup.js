import '@testing-library/jest-dom'
import 'jest-styled-components'

import { TextDecoder, TextEncoder } from 'util'

global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder
