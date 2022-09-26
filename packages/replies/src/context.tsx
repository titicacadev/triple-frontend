import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface EditingMessage {
  currentMessageId?: string
  parentMessageId?: string
  content: {
    plaintext?: string
    mentioningUserUid?: string
    mentioningUserName?: string
  }
}

interface ReplyBaseActions {
  setEditingMessage: ({
    currentMessageId,
    parentMessageId,
    content: { plaintext, mentioningUserUid, mentioningUserName },
  }: EditingMessage) => void
  initializeEditingMessage: () => void
  handleContentChange: (content: string) => void
}

const RepliesContext = createContext<
  (EditingMessage & ReplyBaseActions) | undefined
>(undefined)

export function RepliesProvider({ children }: PropsWithChildren<unknown>) {
  const [
    {
      currentMessageId,
      parentMessageId,
      content: { plaintext, mentioningUserUid, mentioningUserName },
    },
    setEditingMessage,
  ] = useState<EditingMessage>({
    currentMessageId: undefined,
    parentMessageId: undefined,
    content: {
      plaintext: '',
      mentioningUserUid: undefined,
      mentioningUserName: undefined,
    },
  })

  const initializeEditingMessage = () => {
    setEditingMessage({
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
    setEditingMessage((prev) => ({
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
      setEditingMessage,
      initializeEditingMessage,
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
