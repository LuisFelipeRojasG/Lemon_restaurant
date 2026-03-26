import api from './client'

export interface Reservation {
  id: number
  table: number
  table_number: number
  customer_name: string
  customer_email: string
  customer_phone: string
  date: string
  party_size: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
  notes: string
}

export interface ReservationFilters {
  status?: string
  date_from?: string
}

export const getReservations = async (filters?: ReservationFilters): Promise<Reservation[]> => {
  const params = new URLSearchParams()
  if (filters?.status) params.append('status', filters.status)
  if (filters?.date_from) params.append('date_from', filters.date_from)
  
  const response = await api.get<Reservation[]>('/reservation/', { params })
  return response.data
}

export const getReservation = async (id: number): Promise<Reservation> => {
  const response = await api.get<Reservation>(`/reservation/${id}/`)
  return response.data
}

export const createReservation = async (data: Partial<Reservation>): Promise<Reservation> => {
  const response = await api.post<Reservation>('/reservation/', data)
  return response.data
}

export const updateReservation = async (id: number, data: Partial<Reservation>): Promise<Reservation> => {
  const response = await api.patch<Reservation>(`/reservation/${id}/`, data)
  return response.data
}

export const confirmReservation = async (id: number): Promise<Reservation> => {
  const response = await api.post<Reservation>(`/reservation/${id}/confirm/`)
  return response.data
}

export const cancelReservation = async (id: number): Promise<Reservation> => {
  const response = await api.post<Reservation>(`/reservation/${id}/cancel/`)
  return response.data
}

export const getAvailableTables = async (date: string, time: string, partySize: number): Promise<{ id: number; number: number; capacity: number }[]> => {
  const response = await api.get('/reservation/available_tables/', {
    params: { date, time, party_size: partySize },
  })
  return response.data
}