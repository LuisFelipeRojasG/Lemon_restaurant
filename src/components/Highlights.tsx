import type { JSX } from "react";
import { specialCards } from "../utils/specialCard";
import { SpecialCard } from "../components/SpecialCard";

export const Highlights = (): JSX.Element => {
  return (
    <section className="flex flex-col justify-center items-center pt-20 md:mt-40">
      <div className="flex justify-around items-center w-11/12 mb-16">
        <h2 className="text-blacklim font-Markazy font-medium text-5xl">
          Specials
        </h2>
        <button className="bg-yellowlim text-greenlim font-karla font-medium text-xl w-48 h-12 rounded-lg">
          Online Menu
        </button>
      </div>
      <div className="w-screen flex flex-wrap justify-center gap-6">
        {specialCards.map((card) => (
          <SpecialCard
            key={card.name}
            image={card.image}
            name={card.name}
            message={card.message}
          />
        ))}
      </div>
    </section>
  );
};
