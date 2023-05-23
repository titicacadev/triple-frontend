import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Modal } from './modal'

export default {
  title: 'modals / Modal',
  component: Modal,
  parameters: {
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof Modal>

export const Default: ComponentStory<typeof Modal> = (args) => {
  return (
    <Modal {...args}>
      <Modal.Body>
        <Modal.Title>안녕</Modal.Title>
        <Modal.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Modal.Description>
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
