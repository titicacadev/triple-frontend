import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Modal } from './modal'

export default {
  title: 'modals / Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof Modal>

export const Default: ComponentStory<typeof Modal> = (args) => {
  return (
    <Modal {...args}>
      <Modal.Body>
        <Modal.Title>안녕</Modal.Title>
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="blue">Close</Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
Default.args = {
  open: true,
}
