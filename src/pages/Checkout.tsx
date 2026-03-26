import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import type { JSX } from 'react'
import { useLemon } from '../hooks/useLemon'

interface CheckoutForm {
  customer_name: string
  customer_email: string
  customer_phone: string
  notes: string
}

export const Checkout = (): JSX.Element => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, processCheckout, isLoadingCart } = useLemon()
  const [formData, setFormData] = useState<CheckoutForm>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {}

    if (!formData.customer_name.trim()) newErrors.customer_name = 'Name is required'
    if (!formData.customer_email.trim()) newErrors.customer_email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = 'Invalid email format'
    }
    if (!formData.customer_phone.trim()) newErrors.customer_phone = 'Phone is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) return

    setSubmitting(true)
    try {
      await processCheckout({
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        notes: formData.notes,
      })
      navigate('/order-confirmation')
    } catch (err) {
      console.error(err)
      setApiError('Failed to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  if (isLoadingCart) {
    return (
      <div className="pt-20 pb-10 min-h-screen flex items-center justify-center">
        <div className="text-greenlim text-xl">Loading...</div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 pb-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
          <Link to="/menu" className="text-greenlim hover:underline">Go to Menu</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-10">
      <section className="bg-greenlim py-16 text-center">
        <h1 className="text-yellowlim font-markazy font-medium text-5xl">Checkout</h1>
        <p className="text-whitelim font-karla font-light text-xl mt-4">
          Complete your order
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-Markazy font-medium text-blacklim mb-6">Your Order</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                  <div>
                    <span className="font-karla">{item.menu_item_name}</span>
                    <span className="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-medium">${item.subtotal}</span>
                </div>
              ))}
              <div className="flex justify-between py-4 mt-4 border-t-2 border-greenlim">
                <span className="text-xl font-karla font-medium">Total:</span>
                <span className="text-2xl font-Markazy font-medium text-greenlim">${cartTotal}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-Markazy font-medium text-blacklim mb-6">Customer Information</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {apiError}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="customer_name" className="text-blacklim font-karla font-medium text-lg">
                  Name *
                </label>
                <input
                  id="customer_name" type="text" value={formData.customer_name}
                  onChange={(e) => handleChange('customer_name', e.target.value)}
                  className="p-3 border border-greenlim rounded-lg font-karla" placeholder="Your full name"
                />
                {errors.customer_name && <span className="text-red-500 text-sm">{errors.customer_name}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="customer_email" className="text-blacklim font-karla font-medium text-lg">
                  Email *
                </label>
                <input
                  id="customer_email" type="email" value={formData.customer_email}
                  onChange={(e) => handleChange('customer_email', e.target.value)}
                  className="p-3 border border-greenlim rounded-lg font-karla" placeholder="your@email.com"
                />
                {errors.customer_email && <span className="text-red-500 text-sm">{errors.customer_email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="customer_phone" className="text-blacklim font-karla font-medium text-lg">
                  Phone *
                </label>
                <input
                  id="customer_phone" type="tel" value={formData.customer_phone}
                  onChange={(e) => handleChange('customer_phone', e.target.value)}
                  className="p-3 border border-greenlim rounded-lg font-karla" placeholder="(555) 123-4567"
                />
                {errors.customer_phone && <span className="text-red-500 text-sm">{errors.customer_phone}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-blacklim font-karla font-medium text-lg">
                  Notes (optional)
                </label>
                <textarea
                  id="notes" value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="p-3 border border-greenlim rounded-lg font-karla h-24 resize-none"
                  placeholder="Any special instructions..."
                />
              </div>

              <button
                type="submit" disabled={submitting}
                className="bg-yellowlim text-greenlim font-karla font-medium text-xl px-8 py-4 rounded-lg hover:opacity-90 transition-opacity mt-4 disabled:opacity-50"
              >
                {submitting ? 'Processing...' : `Place Order - $${cartTotal}`}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}