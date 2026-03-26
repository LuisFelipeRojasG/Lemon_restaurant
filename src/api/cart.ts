import api from './client'

export interface CartItem {
  id: number
  menu_item: number
  menu_item_name: string
  menu_item_price: string
  quantity: number
  subtotal: string
}

export interface Cart {
  id: number
  session_key: string | null
  created_at: string
  updated_at: string
  items: CartItem[]
  total: string
  item_count: number
}

export interface AddToCartData {
  menu_item: number
  quantity?: number
}

export interface CheckoutData {
  customer_name: string
  customer_email: string
  customer_phone?: string
  notes?: string
}

export const getCart = async (): Promise<Cart> => {
  const response = await api.get<Cart>('/cart/')
  return response.data
}

export const addToCart = async (data: AddToCartData): Promise<Cart> => {
  const response = await api.post<Cart>('/cart/add_item/', data)
  return response.data
}

export const removeFromCart = async (itemId: number): Promise<Cart> => {
  const response = await api.post<Cart>('/cart/remove_item/', { item_id: itemId })
  return response.data
}

export const updateCartItem = async (itemId: number, quantity: number): Promise<Cart> => {
  const response = await api.post<Cart>('/cart/update_item/', { item_id: itemId, quantity })
  return response.data
}

export const checkout = async (data: CheckoutData) => {
  const response = await api.post('/cart/checkout/', data)
  return response.data
}

export const clearCart = async (): Promise<void> => {
  await api.delete('/cart/clear/')
}