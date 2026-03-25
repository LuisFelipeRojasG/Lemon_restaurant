import type { JSX } from "react"
import { useNavigate } from "react-router"
import chefs from '../assets/images/chefs.webp'
import restaurant from '../assets/images/restaurant.webp'

export const AboutHome = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <section className="w-screen flex flex-col items-center xl:flex-row xl:justify-around 2xl:px-60 pb-10 bg-greenlim">
      <div className="w-auto px-10 py-20 gap-6 flex flex-col">
        <h1 className="text-yellowlim font-markazy font-medium text-5xl">
          Little Lemon
        </h1>
        <p className="xl:w-100 text-whitelim font-karla font-light text-xl lg:mx-20">
          Little Lemon is owned by two Italian brothers, Mario and Adrian, who
          moved to the United States to pursue their shared dream of owning a
          restaurant.
        </p>
        <p className="xl:w-100 text-whitelim font-karla font-light text-xl lg:mx-20">
          Their Mediterranean heritage is reflected in their menu, which
          features traditional dishes with a modern twist. Little Lemon has
          quickly become a favorite among Chicago locals and visitors alike.
        </p>
        <button 
          onClick={() => navigate('/about')}
          className="bg-yellowlim text-greenlim font-karla font-medium text-xl w-48 h-12 rounded-lg lg:mx-20 hover:opacity-90 transition-opacity"
        >
          More about us
        </button>
      </div>
      <div className="flex items-center md:relative md:w-xl md:h-144">
        <img
          className="w-80 h-80 mx-4 md:w-125 md:h-125 lg:top-0 lg:right-0 lg:absolute rounded-3xl xl:w-80 xl:h-80 xl:top-10 xl:right-10"
          src={chefs}
          alt="chefs"
        />
        <img
          className="hidden lg:block w-80 h-80 absolute bottom-0 left-0 rounded-3xl"
          src={restaurant}
          alt="restaurant"
        />
      </div>
    </section>
  );
};
