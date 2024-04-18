import { createContext, useContext } from 'react'

import { AddItinerariesToTipHandler } from '../types'

const AddItinerariesToTripHandler = createContext<
  AddItinerariesToTipHandler | undefined
>(undefined)

export const AddItinerariesToTripHandlerProvider =
  AddItinerariesToTripHandler.Provider

export function useAddItinerariesToTripHandler() {
  return useContext(AddItinerariesToTripHandler)
}
