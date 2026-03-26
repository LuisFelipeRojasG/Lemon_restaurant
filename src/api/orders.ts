import api from './client'

export interface OrderItem {
  id: number
  menu_item: number
  menu_item_name: string
  menu_item_price: string
  quantity: number
  subtotal: string
}

export interface Order {
  id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  total: string
  status: 'pending' | 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  notes: string
  items: OrderItem[]
}

export interface CreateOrderData {
  customer_name: string
  customer_email: string
  customer_phone?: string
  notes?: string
  items: { menu_item: number; quantity: number }[]
}

export const getOrders = async (status?: string): Promise<Order[]> => {
  const params = status ? { status } : {}
  const response = await api.get<Order[]>('/order/', { params })
  return response.data
}

export const getOrder = async (id: number): Promise<Order> => {
  const response = await api.get<Order>(`/order/${id}/`)
  return response.data
}

export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await api.post<Order>('/order/create_order/', data)
  return response.data
}

export const payOrder = async (id: number): Promise<Order> => {
  const response = await api.post<Order>(`/order/${id}/pay/`)
  return response.data
}

export const cancelOrder = async (id: number): Promise<Order> => {
  const response = await api.post<Order>(`/order/${id}/cancel/`)
  return response.data
}