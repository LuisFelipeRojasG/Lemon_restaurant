import { describe, it, expect, vi, beforeEach } from "vitest"
import { createReservation, getReservations, cancelReservation } from "./reservations"
import type { Reservation } from "./reservations"

vi.mock("./client", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
  },
}))

const mockApi = await import("./client")

const mockReservation: Reservation = {
  id: 1,
  table: 1,
  table_number: 1,
  customer_name: "John Doe",
  customer_email: "john@example.com",
  customer_phone: "555-1234",
  date: "2026-07-30T19:00:00",
  party_size: 4,
  status: "pending",
  created_at: "2026-07-29T12:00:00Z",
  notes: "",
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe("createReservation", () => {
  it("sends a POST request to /reservation/ with reservation data", async () => {
    const postSpy = vi.mocked(mockApi.default.post).mockResolvedValue({ data: mockReservation })

    const input = {
      table: 1,
      customer_name: "John Doe",
      customer_email: "john@example.com",
      customer_phone: "555-1234",
      date: "2026-07-30T19:00:00",
      party_size: 4,
      notes: "",
    }

    const result = await createReservation(input)

    expect(postSpy).toHaveBeenCalledTimes(1)
    expect(postSpy).toHaveBeenCalledWith("/reservation/", input)
    expect(result).toEqual(mockReservation)
  })

  it("throws when the API call fails", async () => {
    const postSpy = vi.mocked(mockApi.default.post).mockRejectedValue(new Error("Network error"))

    const input = {
      table: 1,
      customer_name: "John Doe",
      customer_email: "john@example.com",
      customer_phone: "555-1234",
      date: "2026-07-30T19:00:00",
      party_size: 4,
      notes: "",
    }

    await expect(createReservation(input)).rejects.toThrow("Network error")
    expect(postSpy).toHaveBeenCalledTimes(1)
  })
})

describe("getReservations", () => {
  it("sends a GET request with date filters", async () => {
    const getSpy = vi.mocked(mockApi.default.get).mockResolvedValue({ data: [mockReservation] })

    const result = await getReservations({ date_from: "2026-07-30", date_to: "2026-07-30" })

    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith("/reservation/", {
      params: new URLSearchParams({ date_from: "2026-07-30", date_to: "2026-07-30" }),
    })
    expect(result).toEqual([mockReservation])
  })

  it("sends a GET request with status filter", async () => {
    const getSpy = vi.mocked(mockApi.default.get).mockResolvedValue({ data: [mockReservation] })

    const result = await getReservations({ status: "cancelled" })

    expect(getSpy).toHaveBeenCalledWith("/reservation/", {
      params: new URLSearchParams({ status: "cancelled" }),
    })
    expect(result).toEqual([mockReservation])
  })

  it("sends a GET request without filters", async () => {
    const getSpy = vi.mocked(mockApi.default.get).mockResolvedValue({ data: [mockReservation, { ...mockReservation, id: 2 }] })

    const result = await getReservations()

    expect(getSpy).toHaveBeenCalledWith("/reservation/", {
      params: new URLSearchParams(),
    })
    expect(result).toHaveLength(2)
  })
})

describe("cancelReservation", () => {
  it("sends a POST request to /reservation/{id}/cancel/", async () => {
    const postSpy = vi.mocked(mockApi.default.post).mockResolvedValue({ data: { ...mockReservation, status: "cancelled" } })

    const result = await cancelReservation(1)

    expect(postSpy).toHaveBeenCalledWith("/reservation/1/cancel/")
    expect(result.status).toBe("cancelled")
  })
})
