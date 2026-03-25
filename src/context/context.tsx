import { createContext, useState, type ReactNode, type JSX } from 'react'

interface LemonContextType {
  isLemonMode: boolean
  toggleLemonMode: () => void
}

const LemonContext = createContext<LemonContextType>({
  isLemonMode: false,
  toggleLemonMode: () => {},
})

interface LemonProviderProps {
  children: ReactNode
}

const LemonProvider = ({ children }: LemonProviderProps): JSX.Element => {
  const [isLemonMode, setIsLemonMode] = useState(false)

  const toggleLemonMode = () => {
    setIsLemonMode((prevMode) => !prevMode)
  }

  return (
    <LemonContext.Provider value={{ isLemonMode, toggleLemonMode }}>
      {children}
    </LemonContext.Provider>
  )
}

export { LemonProvider, LemonContext }
