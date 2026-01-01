import type { JSX } from "react"
import { dataTestimonial } from '../utils/dataTestimonials'
import { TestimonialCard } from '../components/TestimonialCard'

export const Testimonials = (): JSX.Element => {
  return (
    <section className='flex flex-col'>
        <div className=' text-yellowlim font-Markazy font-semibold text-5xl text-left pl-10 py-16 2xl:pl-60'>Testimonials</div>
        <div className='flex flex-col items-center md:flex-row md:flex-wrap md:justify-around md:px-40 pb-10 lg:justify-between 2xl:px-80'>
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
    )
}