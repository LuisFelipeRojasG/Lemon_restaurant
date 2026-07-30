import { useState, useEffect, type FormEvent } from "react"
import type { JSX } from "react"
import { getReservations, createReservation } from "../api/reservations"
import { getTables } from "../api/tables"

interface BookingForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  occasion: string
  comments: string
}

const TIME_MAP: Record<string, string> = {
  "11:00 AM": "11:00", "11:30 AM": "11:30", "12:00 PM": "12:00", "12:30 PM": "12:30",
  "1:00 PM": "13:00", "1:30 PM": "13:30", "2:00 PM": "14:00",
  "5:00 PM": "17:00", "5:30 PM": "17:30", "6:00 PM": "18:00", "6:30 PM": "18:30",
  "7:00 PM": "19:00", "7:30 PM": "19:30", "8:00 PM": "20:00", "8:30 PM": "20:30",
  "9:00 PM": "21:00",
}

export const Booking = (): JSX.Element => {
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    comments: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({})
  const [tablesLeft, setTablesLeft] = useState(10)
  const [loadingAvailability, setLoadingAvailability] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState("")

  useEffect(() => {
    if (formData.date) {
      fetchDayAvailability()
    }
  }, [formData.date])

  const fetchDayAvailability = async () => {
    if (!formData.date) return

    setLoadingAvailability(true)
    try {
      const reservations = await getReservations({ date_from: formData.date, date_to: formData.date })
      const activeCount = reservations.filter((r) => r.status !== "cancelled").length
      setTablesLeft(Math.max(0, 10 - activeCount))
    } catch {
      setTablesLeft(0)
    } finally {
      setLoadingAvailability(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"
    if (formData.guests < 1 || formData.guests > 20) newErrors.guests = "Guests must be between 1 and 20"
    if (tablesLeft === 0) newErrors.date = "No tables available for this date"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const findSuitableTable = async (partySize: number): Promise<number> => {
    const tables = await getTables()
    const sorted = [...tables].sort((a, b) => a.capacity - b.capacity)
    const table = sorted.find((t) => t.capacity >= partySize)
    if (!table) throw new Error("No table can accommodate this party size")
    return table.id
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError("")
    
    if (!validateForm()) return

    setSubmitting(true)
    try {
      const apiTime = TIME_MAP[formData.time] || formData.time
      const dateTime = `${formData.date}T${apiTime}:00`
      const tableId = await findSuitableTable(formData.guests)

      await createReservation({
        table: tableId,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        date: dateTime,
        party_size: formData.guests,
        notes: `${formData.occasion ? `Occasion: ${formData.occasion}. ` : ''}${formData.comments}`,
      })

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setApiError("Failed to create reservation. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field: keyof BookingForm, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const getTodayDate = (): string => {
    return new Date().toISOString().split("T")[0]
  }

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "5:00 PM",
    "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
  ]

  const occasions = [
    "Birthday", "Anniversary", "Date Night", "Business Meal", "Family Gathering", "Celebration", "Other",
  ]

  if (submitted) {
    return (
      <div className="pt-20 pb-10 min-h-screen flex items-center justify-center">
        <div className="bg-greenlim p-12 rounded-2xl text-center max-w-lg">
          <h2 className="text-yellowlim font-Markazy font-medium text-4xl mb-4">
            Reservation Confirmed!
          </h2>
          <p className="text-whitelim font-karla font-light text-xl mb-6">
            Thank you, {formData.name}! Your table for {formData.guests} guests
            has been reserved for {formData.date} at {formData.time}.
          </p>
          <p className="text-whitelim font-karla font-light text-lg">
            A confirmation email has been sent to {formData.email}.
          </p>
          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: 2, occasion: "", comments: "" })
            }}
            className="mt-8 bg-yellowlim text-greenlim font-karla font-medium text-xl px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-10">
      <section className="bg-greenlim py-16 text-center">
        <h1 className="text-yellowlim font-markazy font-medium text-5xl">Book a Table</h1>
        <p className="text-whitelim font-karla font-light text-xl mt-4">
          Reserve your spot for an unforgettable dining experience
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {apiError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-blacklim font-karla font-medium text-lg">Name *</label>
              <input
                id="name" type="text" value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla" placeholder="Your full name"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-blacklim font-karla font-medium text-lg">Email *</label>
              <input
                id="email" type="email" value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla" placeholder="your@email.com"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-blacklim font-karla font-medium text-lg">Phone *</label>
              <input
                id="phone" type="tel" value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla" placeholder="(555) 123-4567"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="guests" className="text-blacklim font-karla font-medium text-lg">Number of Guests *</label>
              <select
                id="guests" value={formData.guests}
                onChange={(e) => handleChange("guests", Number(e.target.value))}
                className="p-3 border border-greenlim rounded-lg font-karla"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num} {num === 1 ? "guest" : "guests"}</option>
                ))}
              </select>
              {errors.guests && <span className="text-red-500 text-sm">{errors.guests}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-blacklim font-karla font-medium text-lg">Date *</label>
              <input
                id="date" type="date" value={formData.date}
                min={getTodayDate()}
                onChange={(e) => handleChange("date", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="text-blacklim font-karla font-medium text-lg">Time *</label>
              <select
                id="time" value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
            </div>
          </div>

          {formData.date && (
            <div className="flex flex-col gap-2">
              <label className="text-blacklim font-karla font-medium text-lg">
                Table Availability
              </label>
              {loadingAvailability ? (
                <div className="p-3 text-gray-500">Checking availability...</div>
              ) : tablesLeft > 0 ? (
                <div className="p-3 bg-green-50 border border-greenlim rounded-lg text-greenlim font-karla font-medium">
                  {tablesLeft} of 10 tables available for this date
                </div>
              ) : (
                <div className="p-3 bg-red-50 border border-red-400 rounded-lg text-red-600 font-karla font-medium">
                  No tables available for this date. Please choose another date.
                </div>
              )}
              {errors.date && errors.date === "No tables available for this date" && (
                <span className="text-red-500 text-sm">{errors.date}</span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="occasion" className="text-blacklim font-karla font-medium text-lg">Occasion</label>
            <select
              id="occasion" value={formData.occasion}
              onChange={(e) => handleChange("occasion", e.target.value)}
              className="p-3 border border-greenlim rounded-lg font-karla"
            >
              <option value="">Select an occasion (optional)</option>
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>{occasion}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="comments" className="text-blacklim font-karla font-medium text-lg">Special Requests</label>
            <textarea
              id="comments" value={formData.comments}
              onChange={(e) => handleChange("comments", e.target.value)}
              className="p-3 border border-greenlim rounded-lg font-karla h-32 resize-none"
              placeholder="Any dietary restrictions, seating preferences, or special requests..."
            />
          </div>

          <button
            type="submit" disabled={submitting || loadingAvailability || tablesLeft === 0}
            className="bg-yellowlim text-greenlim font-karla font-medium text-xl px-8 py-4 rounded-lg hover:opacity-90 transition-opacity mt-4 disabled:opacity-50"
          >
            {submitting ? "Processing..." : "Confirm Reservation"}
          </button>
        </form>
      </section>
    </div>
  )
}