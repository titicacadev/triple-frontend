import { useTranslation } from '@titicaca/next-i18next'
import { FlexBox, Text, Icon } from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'

import { useRepliesContext } from './context'

const HASH_EDIT_CLOSE_MODAL = 'reply.edit-close-modal'

export default function GuideText() {
  const { t } = useTranslation('common-web')

  const {
    currentMessageId,
    parentMessageId,
    content: { mentioningUserName },
    initializeEditingMessage,
  } = useRepliesContext()

  const { push } = useHistoryFunctions()

  const handleClose =
    currentMessageId && parentMessageId
      ? () => push(HASH_EDIT_CLOSE_MODAL)
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
              ? t(
                  [
                    'mentioningusername-nimgge-dabgeul-jagseong-jung',
                    '{{mentioningUserName}}님께 답글 작성 중',
                  ],
                  {
                    mentioningUserName,
                  },
                )
              : currentMessageId === parentMessageId
              ? t(['daesgeul-sujeong-jung', '댓글 수정 중'])
              : t(
                  [
                    'mentioningusername-nimege-jagseonghan-dabgeul-sujeong-jung',
                    '{{mentioningUserName}}님에게 작성한 답글 수정 중',
                  ],
                  { mentioningUserName },
                )}
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
