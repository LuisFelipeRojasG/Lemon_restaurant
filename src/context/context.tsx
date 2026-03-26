import { createContext, useState, useEffect, type ReactNode, type JSX } from 'react'
import { getCart, type Cart, type CartItem } from '../api/cart'

interface LemonContextType {
  isLemonMode: boolean
  toggleLemonMode: () => void
  cart: Cart | null
  cartItems: CartItem[]
  cartTotal: string
  cartCount: number
  isLoadingCart: boolean
  refreshCart: () => Promise<void>
}

const LemonContext = createContext<LemonContextType>({
  isLemonMode: false,
  toggleLemonMode: () => {},
  cart: null,
  cartItems: [],
  cartTotal: '0.00',
  cartCount: 0,
  isLoadingCart: false,
  refreshCart: async () => {},
})

interface LemonProviderProps {
  children: ReactNode
}

const LemonProvider = ({ children }: LemonProviderProps): JSX.Element => {
  const [isLemonMode, setIsLemonMode] = useState(false)
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoadingCart, setIsLoadingCart] = useState(true)

  const toggleLemonMode = () => {
    setIsLemonMode((prevMode) => !prevMode)
  }

  const refreshCart = async () => {
    try {
      setIsLoadingCart(true)
      const cartData = await getCart()
      setCart(cartData)
    } catch {
      setCart(null)
    } finally {
      setIsLoadingCart(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  const cartItems = cart?.items || []
  const cartTotal = cart?.total || '0.00'
  const cartCount = cart?.item_count || 0

  return (
    <LemonContext.Provider
      value={{
        isLemonMode,
        toggleLemonMode,
        cart,
        cartItems,
        cartTotal,
        cartCount,
        isLoadingCart,
        refreshCart,
      }}
    >
      {children}
    </LemonContext.Provider>
  )
}

export { LemonProvider, LemonContext }