import type { Meta } from '@storybook/react'

import { LoginCtaModalProvider, useLoginCtaModal } from './login-cta-modal'

export default {
  title: 'kint5-modals / LoginCtaModal',
} as Meta

function LoginCtaModalStory() {
  const { show } = useLoginCtaModal()
  return (
    <div>
      <LoginCtaModalProvider />
      <button
        css={{ border: '1px solid black', padding: '4px 6px' }}
        onClick={() => show()}
      >
        show modal
      </button>
    </div>
  )
}

export const Basic = {
  render: LoginCtaModalStory,

  args: {
    deepLink: '',
  },
}
