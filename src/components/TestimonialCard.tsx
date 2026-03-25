import type { JSX } from 'react'
import star from '../assets/images/star.webp'

interface TestimonialCardProps {
  image: string
  name: string
  message: string
}

export const TestimonialCard = ({ image, name, message }: TestimonialCardProps): JSX.Element => {
  return (
    <article className='w-80 h-90 bg-greenlim rounded-lg flex flex-col items-center text-center p-6 m-4'>
      <div className='flex justify-center py-4'>
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
      </div>
      <img className='w-24 h-24 rounded-full mb-4' src={image} alt={name} />
      <h3 className='text-yellowlim font-Markazy font-semibold text-2xl mb-2'>{name}</h3>
      <p className='text-whitelim font-Karla font-light text-md'>{message}</p>
    </article>
  )
}
