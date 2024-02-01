import { PropsWithChildren, createContext, useContext } from 'react'

interface ReviewLanguageContextValue {
  reviewLang: string
  userLang: string
}

const ReviewLanguageContext = createContext<ReviewLanguageContextValue | null>(
  null,
)

export function ReviewLanguageProvider({
  children,
  reviewLang,
  userLang,
}: PropsWithChildren<ReviewLanguageContextValue>) {
  return (
    <ReviewLanguageContext.Provider value={{ reviewLang, userLang }}>
      {children}
    </ReviewLanguageContext.Provider>
  )
}

export function useReviewLanguage() {
  const context = useContext(ReviewLanguageContext)

  if (context === null) {
    throw new Error(
      'useReviewLanguage must be used within ReviewLanguageProvider.',
    )
  }

  return context
}
