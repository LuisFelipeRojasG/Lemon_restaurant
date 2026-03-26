import api from './client'

export interface Table {
  id: number
  number: number
  capacity: number
  is_available: boolean
}

export const getTables = async (available?: boolean): Promise<Table[]> => {
  const params = available ? { available: 'true' } : {}
  const response = await api.get<Table[]>('/table/', { params })
  return response.data
}

export const getTableSlots = async (tableId: number, date: string): Promise<{ available_slots: string[] }> => {
  const response = await api.get(`/table/${tableId}/available_slots/`, {
    params: { date },
  })
  return response.data
}