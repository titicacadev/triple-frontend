import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface WaitingActionReply {
  currentMessageId?: string
  parentMessageId?: string
  content: {
    plaintext?: string
    mentioningUserUid?: string
    mentioningUserName?: string
  }
}

interface ReplyAssistantActions {
  setWaitingActionReply: ({
    currentMessageId,
    parentMessageId,
    content: { plaintext, mentioningUserUid, mentioningUserName },
  }: WaitingActionReply) => void
  initializeWaitingActionReply: () => void
  handleContentChange: (content: string) => void
}

const RepliesContext = createContext<
  (WaitingActionReply & ReplyAssistantActions) | undefined
>(undefined)

export function RepliesProvider({ children }: PropsWithChildren<{}>) {
  const [
    {
      currentMessageId,
      parentMessageId,
      content: { plaintext, mentioningUserUid, mentioningUserName },
    },
    setWaitingActionReply,
  ] = useState<WaitingActionReply>({
    currentMessageId: undefined,
    parentMessageId: undefined,
    content: {
      plaintext: '',
      mentioningUserUid: undefined,
      mentioningUserName: undefined,
    },
  })

  const initializeWaitingActionReply = () => {
    setWaitingActionReply({
      currentMessageId: undefined,
      parentMessageId: undefined,
      content: {
        plaintext: '',
        mentioningUserUid: undefined,
        mentioningUserName: undefined,
      },
    })
  }

  const handleContentChange = (content: string) => {
    setWaitingActionReply((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        plaintext: content,
      },
    }))
  }

  const value = useMemo(
    () => ({
      currentMessageId,
      parentMessageId,
      content: {
        plaintext,
        mentioningUserUid,
        mentioningUserName,
      },
      setWaitingActionReply,
      initializeWaitingActionReply,
      handleContentChange,
    }),
    [
      currentMessageId,
      parentMessageId,
      plaintext,
      mentioningUserName,
      mentioningUserUid,
    ],
  )

  return (
    <RepliesContext.Provider value={value}>{children}</RepliesContext.Provider>
  )
}

export function useRepliesContext() {
  const context = useContext(RepliesContext)

  if (context === undefined) {
    throw new Error('RepliesContext의 Provider가 없습니다.')
  }

  return context
}
