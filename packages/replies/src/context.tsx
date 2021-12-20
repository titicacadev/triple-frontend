import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
  useRef,
  RefObject,
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

interface RepliesState extends ActionReplyData {
  textareaRef: RefObject<HTMLTextAreaElement>
}

interface RepliesFunc {
  setActionReplyData: ({
    currentMessageId,
    parentMessageId,
    content: { plaintext, mentioningUserUid, mentioningUserName },
  }: ActionReplyData) => void
  initializeActionReplyData: () => void
  focusing: () => void
  handleContentChange: (content: string) => void
}

const RepliesContext = createContext<(RepliesState & RepliesFunc) | undefined>(
  undefined,
)

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

  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  const focusing = () => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
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
      textareaRef,
      setActionReplyData,
      initializeActionReplyData,
      focusing,
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
