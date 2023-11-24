import { PropsWithChildren, createContext, useContext } from 'react'

interface ReviewLanguageContextValue {
  lang: string
}

const ReviewLanguageContext = createContext<ReviewLanguageContextValue | null>(
  null,
)

export function ReviewLanguageProvider({
  children,
  lang,
}: PropsWithChildren<ReviewLanguageContextValue>) {
  return (
    <ReviewLanguageContext.Provider value={{ lang }}>
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
