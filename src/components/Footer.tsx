import type { JSX } from "react";
import { NavLink } from "react-router";
import { navLinks } from "../utils/navLinks";
import restaurant from "../assets/images/restaurant_inside.webp";

export const Footer = (): JSX.Element => {
  return (
    <div className="bg-greenlim text-whitelim px-8 pt-12 flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:justify-between xl:px-30 2xl:px-150">
        <div className="flex flex-col items-center">
          <img className="rounded-2xl w-lg xl:w-2xs " src={restaurant} alt="Restaurant interior" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between mx-6 lg:mx-40 xl:mx-0">
          <article>
            <h2 className="text-2xl mb-4">Little Lemon</h2>
            <ul role="menu">
                {
                  navLinks.map(({ name, link }) => (
                    <li role='menuitem' key={name}>
                      <NavLink role='menuitem' to={link}>{name}</NavLink>
                    </li>
                  ))
                }
            </ul>
          </article>
          <article>
            <h2 className="text-2xl mb-4">Contact</h2>
            <ul role='menu'>
              <li role='menuitem'><p>Little Lemon, Chicago - Illinois</p></li>
              <li role='menuitem'><p>+1 773 123 8756</p></li>
              <li role='menuitem'><p>contact@littlelemon.com</p></li>
            </ul>
          </article>
          <article>
            <h2 className="text-2xl mb-4">Social Media</h2>
            <ul role='menu'>
              <li role='menuitem'><p>Instagram</p></li>
              <li role='menuitem'><p>Facebook</p></li>
              <li role='menuitem'><p>x</p></li>
            </ul>
          </article>
        </div>
      </div>
      <article className="flex flex-col text-center">
        <span className="text-whitelim font-Karla font-light text-xl py-4">
          2026 Little Lemon.
        </span>
        <span className="text-whitelim font-Karla font-light text-xl py-4">
          Developed with React, Django and Tailwind by Luis Felipe Rojas
        </span>
      </article>
    </div>
  );
};
