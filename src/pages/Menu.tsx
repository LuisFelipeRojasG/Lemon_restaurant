import { useState, useEffect, useCallback } from 'react'
import type { JSX } from 'react'
import { getMenuItems } from '../api/menu'
import { getCategories } from '../api/categories'
import type { MenuItem } from '../api/menu'
import type { Category } from '../api/categories'
import { menuImages } from '../utils/menuImages'
import { useLemon } from '../hooks/useLemon'
import { FiPlus, FiMinus } from 'react-icons/fi'

export const Menu = (): JSX.Element => {
  const { addItemToCart } = useLemon()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [addedFeedback, setAddedFeedback] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, categoriesData] = await Promise.all([
          getMenuItems({ available: true }),
          getCategories(),
        ])
        setMenuItems(itemsData)
        setCategories(categoriesData)
      } catch (err) {
        setError('Failed to load menu. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getQuantity = useCallback(
    (itemId: number) => quantities[itemId] ?? 1,
    [quantities]
  )

  const incrementQuantity = (itemId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.min((prev[itemId] ?? 1) + 1, 10),
    }))
  }

  const decrementQuantity = (itemId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] ?? 1) - 1, 1),
    }))
  }

  const handleAddToCart = async (itemId: number) => {
    const quantity = quantities[itemId] ?? 1
    await addItemToCart({ menu_item: itemId, quantity })
    setAddedFeedback((prev) => ({ ...prev, [itemId]: true }))
    setQuantities((prev) => ({ ...prev, [itemId]: 1 }))
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [itemId]: false }))
    }, 1500)
  }

  const getItemsByCategory = (categoryId: number) => {
    return menuItems.filter((item) => item.category === categoryId)
  }

  if (loading) {
    return (
      <div className="pt-20 pb-10 flex justify-center items-center min-h-[50vh]">
        <div className="text-greenlim text-xl">Loading menu...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 pb-10 flex justify-center items-center min-h-[50vh]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-10">
      <section className="bg-greenlim py-16 text-center">
        <h1 className="text-yellowlim font-markazy font-medium text-5xl">Our Menu</h1>
        <p className="text-whitelim font-karla font-light text-xl mt-4 max-w-2xl mx-auto">
          Discover our authentic Mediterranean dishes, prepared with fresh ingredients and traditional recipes.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.id)
          if (categoryItems.length === 0) return null

          return (
            <div key={category.id} className="mb-16">
              <h2 className="text-blacklim font-Markazy font-medium text-4xl mb-8 border-b-2 border-greenlim pb-4">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-6 p-4 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={menuImages[item.name] || item.image || '/placeholder-food.webp'}
                      alt={item.name}
                      className="w-32 h-32 rounded-lg object-cover bg-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=Food'
                      }}
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-blacklim font-Markazy font-medium text-2xl">{item.name}</h3>
                        <p className="text-greenlim font-karla font-light text-lg">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-greenlim font-karla font-medium text-xl">
                          ${item.price}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-greenlim rounded-lg overflow-hidden">
                            <button
                              onClick={() => decrementQuantity(item.id)}
                              className="px-2 py-1 text-greenlim hover:bg-greenlim hover:text-whitelim transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="px-3 py-1 font-karla font-medium text-greenlim min-w-[2rem] text-center">
                              {getQuantity(item.id)}
                            </span>
                            <button
                              onClick={() => incrementQuantity(item.id)}
                              className="px-2 py-1 text-greenlim hover:bg-greenlim hover:text-whitelim transition-colors"
                              aria-label="Increase quantity"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleAddToCart(item.id)}
                            className={`px-4 py-2 rounded-lg font-karla font-medium text-sm transition-colors ${
                              addedFeedback[item.id]
                                ? 'bg-yellowlim text-greenlim'
                                : 'bg-greenlim text-whitelim hover:opacity-90'
                            }`}
                          >
                            {addedFeedback[item.id] ? 'Added ✓' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}

        {menuItems.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No menu items available at the moment.
          </div>
        )}
      </section>
    </div>
  )
}
