import type { JSX } from 'react'
import { specialCards } from '../utils/specialCard'
import { SpecialCard } from '../components/SpecialCard'
import chefs from '../assets/images/chefs.webp'
import restaurant from '../assets/images/restaurant.webp'
import { dataTestimonial } from '../utils/dataTestimonials'
import { TestimonialCard } from '../components/TestimonialCard'

export const Home = (): JSX.Element => {
  return (
    <div>
      <section>
        <div className='flex flex-col gap-6 p-10 bg-greenlim'>
          <h1 className='text-yellowlim font-markazy font-medium text-5xl'>Little Lemon</h1>
          <span className='text-whitelim font-markazy font-light text-3xl'>Chicago</span>
          <p className='text-whitelim font-karla font-light text-xl'>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button className='bg-yellowlim text-greenlim font-karla font-medium text-xl w-48 h-12 rounded-lg'>Book a Table</button>
        </div>
      </section>
      <section className='flex flex-col justify-center items-center pt-20'>
        <div className='flex justify-around items-center w-11/12 mb-16'>
          <h2 className='text-blacklim font-Markazy font-medium text-5xl'>Specials</h2>
          <button className='bg-yellowlim text-greenlim font-karla font-medium text-xl w-48 h-12 rounded-lg'>Online Menu</button>
        </div>
        <div>
          {
            specialCards.map((card) => (
              <SpecialCard key={card.name} image={card.image} name={card.name} message={card.message} />
            ))
          }
        </div>
      </section>
      <section className='w-screen flex flex-col items-center xl:flex-row xl:justify-around pb-10 bg-greenlim'>
        <div className='w-auto px-10 py-20 gap-6 flex flex-col'>
          <h1 className='text-yellowlim font-markazy font-medium text-5xl'>Little Lemon</h1>
          <p className='text-whitelim font-karla font-light text-xl'>
            Little Lemon is owned by two Italian brothers, Mario and Adrian, who
            moved to the United States to pursue their shared dream of owning a
            restaurant.
          </p>
          <p className='text-whitelim font-karla font-light text-xl'>
            Their Mediterranean heritage is reflected in their menu, which
            features traditional dishes with a modern twist. Little Lemon has
            quickly become a favorite among Chicago locals and visitors alike.
          </p>
          <button className='bg-yellowlim text-greenlim font-karla font-medium text-xl w-48 h-12 rounded-lg'>More about us</button>
        </div>
        <div className='flex items-center md:relative md:w-xl md:h-144'>
          <img className='w-80 h-80 mx-4 md:w-125 md:h-125 lg:top-0 lg:right-0 lg:absolute rounded-3xl' src={chefs} alt="chefs" />
          <img className='hidden lg:block w-80 h-80 absolute bottom-0 left-0' src={restaurant} alt="restaurant" />
        </div>
      </section>
      <section className=''>
        <div className='w-screen text-yellowlim font-Markazy font-semibold text-5xl pl-10 py-16'>Testimonials</div>
        <div className='w-screen flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-between lg:gap-2 lg:px-40 md:px-10 pb-10'>
          {
            dataTestimonial.map((element, index) => (
              <TestimonialCard
                image = {element.image}
                name = {element.name}
                message = {element.message}
                key={index}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}