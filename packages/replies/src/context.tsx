import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
  useRef,
  RefObject,
} from 'react'

export interface ActionSpecifiaction {
  currentMessageId?: string
  parentMessageId?: string
  content: {
    plaintext?: string
    mentioningUserUid?: string
    mentioningUserName?: string
  }
}

interface RepliesState {
  currentMessageId?: string
  parentMessageId?: string
  content: {
    plaintext?: string
    mentioningUserUid?: string
    mentioningUserName?: string
  }
  textareaRef: RefObject<HTMLTextAreaElement>
}

interface RepliesFunc {
  setReplyActionSpecification: ({
    currentMessageId,
    parentMessageId,
    content: { plaintext, mentioningUserUid, mentioningUserName },
  }: ActionSpecifiaction) => void
  initializeReplyActionSpecification: () => void
  focusing: () => void
  handleContentChange: (content: string) => void
}

const RepliesContext = createContext<(RepliesState & RepliesFunc) | undefined>(
  undefined,
)

export function RepliesProvider({ children }: PropsWithChildren<any>) {
  const [
    {
      currentMessageId,
      parentMessageId,
      content: { plaintext, mentioningUserUid, mentioningUserName },
    },
    setReplyActionSpecification,
  ] = useState<ActionSpecifiaction>({
    currentMessageId: undefined,
    parentMessageId: undefined,
    content: {
      plaintext: '',
      mentioningUserUid: undefined,
      mentioningUserName: undefined,
    },
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const initializeReplyActionSpecification = () => {
    setReplyActionSpecification({
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
    setReplyActionSpecification((prev) => ({
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
      setReplyActionSpecification,
      initializeReplyActionSpecification,
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
    throw new Error('RepliesContext의 Provider가 없습ㄴ디ㅏ.')
  }

  return context
}
