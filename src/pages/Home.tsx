import type { JSX } from 'react'
import { specialCards } from '../utils/specialCard'
import { SpecialCard } from '../components/SpecialCard'

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
      <section className='flex flex-col justify-center items-center py-20'>
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
      <section></section>
      <section></section>
    </div>
  );
}