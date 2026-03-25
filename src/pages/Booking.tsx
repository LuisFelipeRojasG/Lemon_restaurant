import { useState, type FormEvent } from "react"
import type { JSX } from "react"

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

const timeSlots = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "5:00 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
]

const occasions = [
  "Birthday",
  "Anniversary",
  "Date Night",
  "Business Meal",
  "Family Gathering",
  "Celebration",
  "Other",
]

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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    if (formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = "Guests must be between 1 and 20"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Booking submitted:", formData)
      setSubmitted(true)
    }
  }

  const handleChange = (field: keyof BookingForm, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getTodayDate = (): string => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

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
              setFormData({
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                guests: 2,
                occasion: "",
                comments: "",
              })
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-blacklim font-karla font-medium text-lg">
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
                placeholder="Your full name"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-blacklim font-karla font-medium text-lg">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
                placeholder="your@email.com"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-blacklim font-karla font-medium text-lg">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
                placeholder="(555) 123-4567"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="guests" className="text-blacklim font-karla font-medium text-lg">
                Number of Guests *
              </label>
              <select
                id="guests"
                value={formData.guests}
                onChange={(e) => handleChange("guests", Number(e.target.value))}
                className="p-3 border border-greenlim rounded-lg font-karla"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              {errors.guests && <span className="text-red-500 text-sm">{errors.guests}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-blacklim font-karla font-medium text-lg">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                min={getTodayDate()}
                onChange={(e) => handleChange("date", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="text-blacklim font-karla font-medium text-lg">
                Time *
              </label>
              <select
                id="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="p-3 border border-greenlim rounded-lg font-karla"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="occasion" className="text-blacklim font-karla font-medium text-lg">
              Occasion
            </label>
            <select
              id="occasion"
              value={formData.occasion}
              onChange={(e) => handleChange("occasion", e.target.value)}
              className="p-3 border border-greenlim rounded-lg font-karla"
            >
              <option value="">Select an occasion (optional)</option>
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="comments" className="text-blacklim font-karla font-medium text-lg">
              Special Requests
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleChange("comments", e.target.value)}
              className="p-3 border border-greenlim rounded-lg font-karla h-32 resize-none"
              placeholder="Any dietary restrictions, seating preferences, or special requests..."
            />
          </div>

          <button
            type="submit"
            className="bg-yellowlim text-greenlim font-karla font-medium text-xl px-8 py-4 rounded-lg hover:opacity-90 transition-opacity mt-4"
          >
            Confirm Reservation
          </button>
        </form>
      </section>
    </div>
  )
}
