import { useContext } from 'react'
import { LemonContext } from '../context/context'
import { addToCart, removeFromCart, updateCartItem, checkout, clearCart, type AddToCartData, type CheckoutData } from '../api/cart'
import type { Cart } from '../api/cart'

export const useLemon = () => {
  const context = useContext(LemonContext)
  
  const addItemToCart = async (data: AddToCartData): Promise<Cart> => {
    const result = await addToCart(data)
    await context.refreshCart()
    return result
  }

  const removeItemFromCart = async (itemId: number): Promise<Cart> => {
    const result = await removeFromCart(itemId)
    await context.refreshCart()
    return result
  }

  const updateItemQuantity = async (itemId: number, quantity: number): Promise<Cart> => {
    const result = await updateCartItem(itemId, quantity)
    await context.refreshCart()
    return result
  }

  const processCheckout = async (data: CheckoutData) => {
    const result = await checkout(data)
    await context.refreshCart()
    return result
  }

  const emptyCart = async () => {
    await clearCart()
    await context.refreshCart()
  }

  return {
    ...context,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    processCheckout,
    emptyCart,
  }
}