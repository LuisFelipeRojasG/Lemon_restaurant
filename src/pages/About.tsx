import type { JSX } from 'react'
import chefs from '../assets/images/chefs.webp'
import restaurant from '../assets/images/restaurant.webp'

export const About = (): JSX.Element => {
  return (
    <div className="pt-20">
      <section className="bg-greenlim py-16 text-center">
        <h1 className="text-yellowlim font-markazy font-medium text-5xl">About Little Lemon</h1>
        <p className="text-whitelim font-karla font-light text-xl mt-4">
          Our story began with a dream and a family recipe
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-blacklim font-Markazy font-medium text-4xl">
              Our Story
            </h2>
            <p className="text-blacklim font-karla font-light text-xl leading-relaxed">
              Little Lemon is owned by two Italian brothers, Mario and Adrian, who
              moved to the United States to pursue their shared dream of owning a
              restaurant.
            </p>
            <p className="text-blacklim font-karla font-light text-xl leading-relaxed">
              Their Mediterranean heritage is reflected in their menu, which
              features traditional dishes with a modern twist. The brothers
              brought their grandmother's recipes to Chicago, adding their own
              creative interpretations while staying true to the authentic flavors.
            </p>
            <p className="text-blacklim font-karla font-light text-xl leading-relaxed">
              Little Lemon has quickly become a favorite among Chicago locals and 
              visitors alike. The restaurant's warm atmosphere, friendly staff,
              and exceptional food have earned it a reputation as one of the best
              Mediterranean restaurants in the city.
            </p>
          </div>
          
          <div className="relative">
            <img
              className="w-full h-auto rounded-3xl shadow-lg"
              src={chefs}
              alt="Mario and Adrian, the owners of Little Lemon, in the kitchen"
            />
            <img
              className="hidden lg:block w-48 h-48 absolute -bottom-8 -left-8 rounded-2xl shadow-xl"
              src={restaurant}
              alt="Little Lemon restaurant interior"
            />
          </div>
        </div>

        <div className="mt-16 bg-graylim p-8 rounded-2xl">
          <h2 className="text-blacklim font-Markazy font-medium text-4xl mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-greenlim font-Markazy font-medium text-2xl mb-4">
                Authentic
              </h3>
              <p className="text-blacklim font-karla font-light">
                Traditional recipes passed down through generations
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-greenlim font-Markazy font-medium text-2xl mb-4">
                Fresh
              </h3>
              <p className="text-blacklim font-karla font-light">
                Locally sourced ingredients whenever possible
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-greenlim font-Markazy font-medium text-2xl mb-4">
                Welcoming
              </h3>
              <p className="text-blacklim font-karla font-light">
                A warm atmosphere where everyone feels at home
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-blacklim font-Markazy font-medium text-4xl mb-8">
            Visit Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <address className="not-italic">
              <h3 className="text-greenlim font-Markazy font-medium text-2xl mb-4">
                Location
              </h3>
              <p className="text-blacklim font-karla font-light text-xl">
                Little Lemon Restaurant<br />
                123 Mediterranean Way<br />
                Chicago, Illinois 60601
              </p>
            </address>
            <div>
              <h3 className="text-greenlim font-Markazy font-medium text-2xl mb-4">
                Hours
              </h3>
              <p className="text-blacklim font-karla font-light text-xl">
                Monday - Thursday: 11:00 AM - 10:00 PM<br />
                Friday - Saturday: 11:00 AM - 11:00 PM<br />
                Sunday: 10:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
