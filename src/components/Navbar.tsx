import type { JSX } from "react"
import { NavLink } from "react-router"
import { navLinks } from "../utils/navLinks"

export const Navbar = (): JSX.Element => {
  return (
    <div className="w-auto ml-40 hidden md:block md:col-start-7 md:col-span-5 md:px-8 lg:col-start-3">
      <ul className="w-auto flex flex-wrap justify-center gap-5">
        {
          navLinks.map(({ name, link }) => (
            <li className="text-2xl font-karla font-medium" key={name}>
              <NavLink role='menuitem' to={link}>{name}</NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  )
}