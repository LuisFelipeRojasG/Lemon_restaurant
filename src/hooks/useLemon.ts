import { useContext } from 'react'
import { LemonContext } from '../context/context'

export const useLemon = () => {
  const context = useContext(LemonContext)
  return context
}
