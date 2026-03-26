import api from './client'

export interface Category {
  id: number
  name: string
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/category/')
  return response.data
}