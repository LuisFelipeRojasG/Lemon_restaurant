import { useState } from 'react'
import type { JSX } from 'react'
import { Link } from 'react-router'
import { useLemon } from '../hooks/useLemon'
import { FiShoppingCart, FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

export const CartWidget = (): JSX.Element => {
  const { cartItems, cartTotal, cartCount, updateItemQuantity, removeItemFromCart, isLoadingCart } = useLemon()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoadingCart) {
    return (
      <button className="relative p-2 text-greenlim">
        <FiShoppingCart size={24} />
      </button>
    )
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="relative p-2 text-greenlim hover:text-yellowlim transition-colors"
      >
        <FiShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellowlim text-greenlim text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-whitelim h-full shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-2xl font-Markazy font-medium text-greenlim">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded">
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <FiShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                  <Link 
                    to="/menu" 
                    onClick={() => setIsOpen(false)}
                    className="text-greenlim hover:underline mt-2 inline-block"
                  >
                    Browse our menu
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-karla font-medium">{item.menu_item_name}</h3>
                        <p className="text-gray-500 text-sm">${item.menu_item_price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <span className="font-medium text-greenlim">${item.subtotal}</span>
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-karla font-medium">Total:</span>
                  <span className="text-2xl font-Markazy font-medium text-greenlim">${cartTotal}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-yellowlim text-greenlim font-karla font-medium text-center py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}