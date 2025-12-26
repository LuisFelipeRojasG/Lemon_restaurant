import { createContext, useContext, useState } from 'react'

const LemonContext = createContext({})

const useLemon = () => {
  const context = useContext(LemonContext)
  return context
}

const LemonProvider = ({ children }) => {
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

export { LemonProvider, useLemon }