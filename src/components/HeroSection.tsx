import type { JSX } from 'react'
import lemonfood from '../assets/images/restauranfood.webp'

export const HeroSection = (): JSX.Element => {
  return (
    <section className='relative'>
      <div className='flex flex-col gap-6 p-10 md:pl-20 bg-greenlim xl:pl-40 2xl:pl-100'>
          <h1 className='text-yellowlim font-markazy font-medium text-5xl'>Little Lemon</h1>
          <span className='text-whitelim font-markazy font-light text-3xl'>Chicago</span>
          <p className='w-120 text-whitelim font-karla font-light text-xl'>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button className='bg-yellowlim text-greenlim font-karla font-medium text-xl w-48 h-12 rounded-lg'>Book a Table</button>
      </div>
      <div className='hidden md:block md:absolute md:top-16 md:right-20 xl:px-20 2xl:px-100'>
        <img className='w-72 rounded-2xl' src={lemonfood} alt="Restaurant food" />
      </div>
    </section>
  )
}