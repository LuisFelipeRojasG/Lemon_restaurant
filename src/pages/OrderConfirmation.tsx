import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { JSX } from 'react'
import { getOrders, type Order } from '../api/orders'

export const OrderConfirmation = (): JSX.Element => {
  const [latestOrder, setLatestOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const orders = await getOrders('pending')
        if (orders.length > 0) {
          setLatestOrder(orders[0])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLatestOrder()
  }, [])

  if (loading) {
    return (
      <div className="pt-20 pb-10 min-h-screen flex items-center justify-center">
        <div className="text-greenlim text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-10 min-h-screen flex items-center justify-center">
      <div className="bg-greenlim p-12 rounded-2xl text-center max-w-lg mx-4">
        <h2 className="text-yellowlim font-Markazy font-medium text-4xl mb-4">
          Order Confirmed!
        </h2>
        <p className="text-whitelim font-karla font-light text-xl mb-4">
          Thank you for your order!
        </p>
        {latestOrder && (
          <p className="text-whitelim font-karla font-light text-lg mb-4">
            Order #{latestOrder.id} - Total: ${latestOrder.total}
          </p>
        )}
        <p className="text-whitelim font-karla font-light text-lg mb-6">
          A confirmation email has been sent. We'll notify you when your order is ready!
        </p>
        <Link
          to="/menu"
          className="inline-block bg-yellowlim text-greenlim font-karla font-medium text-xl px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}