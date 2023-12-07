import { isEqual } from 'date-fns'
import { createContext, useContext, useMemo, useReducer } from 'react'

import { isDateInArray } from '~/utils/date'

interface GlobalStateProviderProps {
  children: React.ReactNode
}

type Action =
  | { type: 'add_date'; value: Date }
  | { type: 'add_token'; value: string }
type Dispatch = (action: Action) => void
interface State {
  token: string
  dates: Date[]
}

export const GlobalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function globalContextReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add_date':
      if (isDateInArray(action.value, state.dates)) {
        return {
          ...state,
          dates: state.dates.filter((date) => !isEqual(date, action.value)),
        }
      }
      return {
        ...state,
        dates: [...state.dates, action.value],
      }

    case 'add_token':
      return {
        ...state,
        token: action.value,
      }
  }
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [state, dispatch] = useReducer(globalContextReducer, {
    dates: [],
    token: '',
  })
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  )
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export function useGlobalState() {
  const context = useContext(GlobalContext)

  if (context === undefined) {
    throw new Error('Must be used within a GlobalStateProvider')
  }

  return context
}
