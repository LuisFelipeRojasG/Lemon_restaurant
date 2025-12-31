import type { JSX } from 'react'
import star from '../assets/images/star.webp'

export const TestimonialCard = (props: {image: string, name: string, message: string}): JSX.Element => {
  return (
    <div className='w-80 h-90 bg-greenlim rounded-lg flex flex-col items-center text-center p-6 m-4'>
      <div className='flex justify-center py-4'>
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
          <img className='w-10 h-10' src={star} alt="star" />
      </div>
      <img className='w-24 h-24 rounded-full mb-4' src={props.image} alt={props.name} />
      <h3 className='text-yellowlim font-Markazy font-semibold text-2xl mb-2'>{props.name}</h3>
      <p className='text-whitelim font-Karla font-light text-md'>{props.message}</p>
    </div>
  )
}