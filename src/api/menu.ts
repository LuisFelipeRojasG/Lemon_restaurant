import api from './client'

export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  category: number
  category_name: string
  is_available: boolean
  image: string | null
}

export interface MenuItemFilters {
  available?: boolean
  category?: number
}

export const getMenuItems = async (filters?: MenuItemFilters): Promise<MenuItem[]> => {
  const params = new URLSearchParams()
  if (filters?.available) params.append('available', 'true')
  if (filters?.category) params.append('category', filters.category.toString())
  
  const response = await api.get<MenuItem[]>('/menu-item/', { params })
  return response.data
}

export const getMenuItem = async (id: number): Promise<MenuItem> => {
  const response = await api.get<MenuItem>(`/menu-item/${id}/`)
  return response.data
}