import { useTranslation } from 'react-i18next'
import { FlexBox, Text, Icon } from '@titicaca/tds-ui'
import { useHashRouter } from '@titicaca/triple-web'

import { useRepliesContext } from './context'

const HASH_EDIT_CLOSE_MODAL = 'reply.edit-close-modal'

export default function GuideText() {
  const { t } = useTranslation('triple-frontend')

  const {
    currentMessageId,
    parentMessageId,
    content: { mentioningUserName },
    initializeEditingMessage,
  } = useRepliesContext()

  const { addUriHash } = useHashRouter()

  const handleClose =
    currentMessageId && parentMessageId
      ? () => addUriHash(HASH_EDIT_CLOSE_MODAL)
      : () => initializeEditingMessage()

  return (
    <>
      {parentMessageId ? (
        <FlexBox
          flex
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="gray50"
          css={{
            padding: '10px 20px',
          }}
        >
          <Text size={12} lineHeight="19px" bold color="gray700">
            {!currentMessageId
              ? t('{{mentioningUserName}}님께 답글 작성 중', {
                  mentioningUserName,
                })
              : currentMessageId === parentMessageId
              ? t('댓글 수정 중')
              : t('{{mentioningUserName}}님에게 작성한 답글 수정 중', {
                  mentioningUserName,
                })}
          </Text>

          <Icon
            onClick={handleClose}
            src="https://assets.triple.guide/images/btn-com-close@3x.png"
          />
        </FlexBox>
      ) : null}
    </>
  )
}
