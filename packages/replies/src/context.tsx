import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface ActionReplyData {
  currentMessageId?: string
  parentMessageId?: string
  content: {
    plaintext?: string
    mentioningUserUid?: string
    mentioningUserName?: string
  }
}

type RepliesState = ActionReplyData

interface RepliesFunc {
  setActionReplyData: ({
    currentMessageId,
    parentMessageId,
    content: { plaintext, mentioningUserUid, mentioningUserName },
  }: ActionReplyData) => void
  initializeActionReplyData: () => void
  handleContentChange: (content: string) => void
}

const RepliesContext = createContext<
  (ActionReplyData & RepliesFunc) | undefined
>(undefined)

export function RepliesProvider({ children }: PropsWithChildren<{}>) {
  const [
    {
      currentMessageId,
      parentMessageId,
      content: { plaintext, mentioningUserUid, mentioningUserName },
    },
    setActionReplyData,
  ] = useState<ActionReplyData>({
    currentMessageId: undefined,
    parentMessageId: undefined,
    content: {
      plaintext: '',
      mentioningUserUid: undefined,
      mentioningUserName: undefined,
    },
  })

  const initializeActionReplyData = () => {
    setActionReplyData({
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
    setActionReplyData((prev) => ({
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
      setActionReplyData,
      initializeActionReplyData,
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
