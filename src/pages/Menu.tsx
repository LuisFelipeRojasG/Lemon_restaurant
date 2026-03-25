import type { JSX } from "react"
import greekSalad from '../assets/images/greek_salad.webp'
import bruschetta from '../assets/images/bruschetta.webp'
import lemondessert from '../assets/images/lemon_dessert.webp'

interface MenuItem {
  name: string
  description: string
  price: string
  image: string
}

interface MenuCategory {
  title: string
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    title: "Starters",
    items: [
      {
        name: "Greek Salad",
        description: "Crispy lettuce, peppers, olives, Chicago style feta cheese, garlic and rosemary croutons",
        price: "$12.99",
        image: greekSalad,
      },
      {
        name: "Bruschetta",
        description: "Grilled bread smeared with garlic, seasoned with salt and olive oil",
        price: "$8.99",
        image: bruschetta,
      },
    ],
  },
  {
    title: "Main Courses",
    items: [
      {
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
        price: "$24.99",
        image: greekSalad,
      },
      {
        name: "Chicken Souvlaki",
        description: "Grilled chicken skewers with tzatziki sauce and pita bread",
        price: "$18.99",
        image: greekSalad,
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Lemon Dessert",
        description: "Traditional family recipe with authentic ingredients",
        price: "$7.99",
        image: lemondessert,
      },
      {
        name: "Baklava",
        description: "Layers of phyllo dough with nuts and honey",
        price: "$8.99",
        image: lemondessert,
      },
    ],
  },
]

export const Menu = (): JSX.Element => {
  return (
    <div className="pt-20 pb-10">
      <section className="bg-greenlim py-16 text-center">
        <h1 className="text-yellowlim font-markazy font-medium text-5xl">Our Menu</h1>
        <p className="text-whitelim font-karla font-light text-xl mt-4 max-w-2xl mx-auto">
          Discover our authentic Mediterranean dishes, prepared with fresh ingredients and traditional recipes.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        {menuData.map((category) => (
          <div key={category.title} className="mb-16">
            <h2 className="text-blacklim font-Markazy font-medium text-4xl mb-8 border-b-2 border-greenlim pb-4">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.items.map((item) => (
                <article key={item.name} className="flex gap-6 p-4 rounded-xl hover:shadow-lg transition-shadow">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-blacklim font-Markazy font-medium text-2xl">{item.name}</h3>
                      <p className="text-graylim font-karla font-light text-lg">{item.description}</p>
                    </div>
                    <span className="text-greenlim font-karla font-medium text-xl">{item.price}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
