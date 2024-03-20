import { ReactNode } from 'react'
import { CSSObject } from 'styled-components'
import { FlexBox } from '@titicaca/kint5-core-elements'

import { Modal } from '../modal'

export interface ConfirmProps {
  children?: ReactNode
  title?: string
  open?: boolean
  cancelText?: string
  confirmText?: string
  onClose?: () => void
  onCancel?: () => boolean | unknown
  onConfirm?: () => boolean | unknown
}

const CONFIRM_BUTTON_STYLE: CSSObject = {
  flex: '1 0 0',
  height: 'inherit',
  padding: '11px 0',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.5,
  letterSpacing: '-0.4px',
}

export const Confirm = ({
  children,
  title,
  open,
  cancelText = '취소',
  confirmText = '확인',
  onClose,
  onCancel,
  onConfirm,
  ...props
}: ConfirmProps) => {
  const handleCancel = () => {
    onCancel ? !onCancel() && onClose?.() : onClose?.()
  }

  const handleConfirm = () => {
    onConfirm ? !onConfirm() && onClose?.() : onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body
        css={{
          backgroundColor: 'var(--color-kint5-gray20)',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: '26px 16px',
        }}
        {...props}
      >
        {title && (
          <Modal.Title
            css={{
              marginBottom: 2,
              fontSize: 17,
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            {title}
          </Modal.Title>
        )}
        {children && <Modal.Description>{children}</Modal.Description>}
      </Modal.Body>
      <FlexBox
        flex
        css={{
          alignItems: 'center',
          backgroundColor: 'var(--color-kint5-gray20)',
          borderTop: '0.5px solid var(--color-kint5-gray40)',
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
        }}
      >
        <Modal.Action
          onClick={handleCancel}
          css={{
            ...CONFIRM_BUTTON_STYLE,
            color: '#1769FF',
          }}
        >
          {cancelText}
        </Modal.Action>
        <Modal.Action
          onClick={handleConfirm}
          css={{
            ...CONFIRM_BUTTON_STYLE,
            color: '#FF322E',
            borderLeft: '0.5px solid var(--color-kint5-gray40)',
          }}
        >
          {confirmText}
        </Modal.Action>
      </FlexBox>
    </Modal>
  )
}
