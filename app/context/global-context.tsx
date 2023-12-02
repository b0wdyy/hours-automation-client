import { createContext, useContext, useMemo, useReducer } from 'react'

interface GlobalStateProviderProps {
  children: React.ReactNode
}

type Action =
  | { type: 'add_dates'; value: any[] }
  | { type: 'add_token'; value: string }
type Dispatch = (action: Action) => void
interface State {
  token: string
  dates: any[]
}

export const GlobalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function globalContextReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add_dates':
      return {
        ...state,
        dates: action.value,
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
